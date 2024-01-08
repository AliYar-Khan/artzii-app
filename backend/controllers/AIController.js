require('dotenv').config()
const OpenAI = require('openai')
const request = require('request')
const Payment = require('../models/Payment')
const mongoose = require('mongoose')

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

exports.generateStory = async (req, res) => {
  try {
    openai.chat.completions
      .create({
        messages: [
          {
            role: 'user',
            content: req.body.topic
          }
        ],
        model: 'gpt-3.5-turbo'
      })
      .then(async (response) => {
        const session = await mongoose.startSession()
        session.startTransaction()
        const payment = await Payment.findOne({
          userId: req.user.id,
          'subscription.status': { $nin: ['expired', 'cancelled'] }
        })

        const currentDate = new Date()
        const currentYear = currentDate.getFullYear()
        const currentMonth = currentDate.getMonth() + 1
        const key = currentMonth + '/' + currentYear
        if (payment.subscription.usage) {
          if (payment.subscription.usage[`${key}`]) {
            payment.subscription.usage[`${key}`].storyTokens =
              payment.subscription.usage[`${key}`].storyTokens +
              response.usage.total_tokens
          } else {
            payment.subscription.usage[`${key}`] = {
              storyTokens: response.usage.total_tokens
            }
          }
        } else {
          payment.subscription.usage = {}
          payment.subscription.usage[`${key}`] = {
            storyTokens: response.usage.total_tokens,
            artTokens: 0
          }
        }
        payment.markModified('subscription')
        await payment.save()
        await session.commitTransaction()
        session.endSession()
        res
          .status(200)
          .json({ success: true, story: response.choices[0].message.content })
      })
      .catch((error) => {
        console.log(error)
        res.status(200).json({ success: false, error: error.message })
      })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
}

exports.generateImage = async (req, res) => {
  try {
    const options = {
      method: 'POST',
      url: 'https://stablediffusionapi.com/api/v3/text2img',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        key: process.env.STABLE_DIFFUSION_API_KEY,
        prompt: req.body.topic,
        negative_prompt: null,
        width: '1024',
        height: '1024',
        samples: '1',
        num_inference_steps: '20',
        seed: null,
        guidance_scale: 7.5,
        safety_checker: 'yes',
        multi_lingual: 'no',
        panorama: 'no',
        self_attention: 'no',
        upscale: 'no',
        embeddings_model: null,
        webhook: null,
        track_id: null
      })
    }

    request(options, function (err, response) {
      if (err) {
        res.status(200).json({ success: false, error: err })
        // throw new Error(error)
      }
      const responseParsed = JSON.parse(response.body)
      console.log('====================================')
      console.log('response --->', JSON.parse(response.body))
      console.log('====================================')
      if (responseParsed.output.length) {
        res.status(200).json({ success: true, data: JSON.parse(response.body) })
      } else if (responseParsed.eta) {
        setTimeout(() => {
          var myHeaders = new Headers()
          myHeaders.append('Content-Type', 'application/json')

          var raw = JSON.stringify({
            key: ''
          })

          var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw
          }
          fetch(responseParsed.fetch_result, requestOptions)
            .then((res) => res.json())
            .then((res) => {
              console.log('====================================')
              console.log('res after eta --->', res)
              console.log('====================================')
              res.status(200).json({ success: true, data: res })
            })
        }, responseParsed.eta)
      }
    })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
}
