const Design = require('../models/Design')
const fs = require('fs')
const { createInstance } = require('polotno-node')
// const jwt = require('jsonwebtoken')
// const axios = require('axios')

exports.addDesign = async (req, res) => {
  try {
    const design = { userId: req.user.id, ...req.body }

    const newDesign = new Design({ ...design })
    await newDesign.save()
    const instance = await createInstance({
      key: process.env.POLOTNO_KEY
    })

    // load sample json
    const json = {
      pages: req.body.pages,
      width: req.body.width,
      height: req.body.height,
      unit: req.body.unit,
      dpi: req.body.dpi
    }
    // here you can manipulate JSON somehow manually
    // for example replace some images or change text

    // then we can convert json into image
    const imageBase64 = await instance.jsonToImageBase64(json) // by default it will be png image
    // write image into local file
    const targetPath = path.join(
      __dirname,
      `./public/designs/${newDesign._id}.png`
    )
    if (!fs.existSync(path.join(__dirname, `./public/`))) {
      fs.mkdirSync(path.join(__dirname, `./public/`))
    }
    if (!fs.existSync(path.join(__dirname, `./public/designs/`))) {
      fs.mkdirSync(path.join(__dirname, `./public/designs/`))
    }

    fs.writeFileSync(`${targetPath}`, imageBase64, 'base64')

    // close instance
    instance.close()
    return res.status(200).json({ success: true, designId: newDesign._id })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
}

exports.getDesign = async (req, res) => {
  try {
    const designId = req.params.id
    const des = await Design.findOne({ _id: designId })
    if (req.user.id === des.userId) {
      res.status(200).json({ success: true, design: des })
    } else {
      res.status(200).json({ success: false, message: 'Not valid' })
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
}

exports.updateDesign = async (req, res) => {
  try {
    const designId = req.params.id
    console.log('====================================')
    console.log('design id --->', designId)
    console.log('====================================')
    const design = await Design.findById(designId)
    console.log('====================================')
    console.log('design found --->', design.id)
    console.log('====================================')
    for (const key in req.body) {
      if (design[key]) {
        console.log('====================================')
        console.log(`updating: ${key}`)
        console.log('====================================')
        design[key] = req.body[key]
      }
    }
    await design.save()
    res.status(200).json({ success: true, message: 'Design Updated' })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
}

exports.deleteDesign = async (req, res) => {
  try {
    const designId = req.params.id
    await Design.deleteOne({ _id: designId })
    res.status(200).json({ success: true, message: 'Design deleted' })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
}

exports.getAllDesign = async (req, res) => {
  try {
    const user = req.user
    console.log('user --->>', user)
    const de = await Design.find({ userId: user.id })
    const result = de.map((item) => ({
      id: item._id,
      name: item.name,
      cover: item.pages[0].background,
      size: `${item.width}x${item.height}`
    }))
    return res.status(200).json({ success: true, designs: result })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
}
