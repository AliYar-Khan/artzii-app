// controllers/UserController.js
const User = require('../models/User')
const Payment = require('../models/Payment')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const axios = require('axios')
// Create a new user
exports.createUser = async (req, res) => {
  try {
    const user = new User({
      name: req.body.name || '',
      address: req.body.address || '',
      city: req.body.city || '',
      state: req.body.state || '',
      country: req.body.country || '',
      zipCode: req.body.zipCode || '',
      phoneNumber: req.body.phoneNumber || '',
      email: req.body.email,
      password: req.body.password
    })
    const salt = await bcrypt.genSalt(Number(process.env.SALT))
    user.password = await bcrypt.hash(user.password, salt)
    await user.save()
    res.status(201).json(user)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.googleSignIn = async (req, res) => {
  if (req.query.gat) {
    try {
      axios
        .get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            Authorization: `Bearer ${req.query.gat}`
          }
        })
        .then(async (response) => {
          // const name = `${response.data.given_name} ${response.data.family_name}`
          const email = response.data.email

          const alreadyExist = await User.findOne({ email })
          if (alreadyExist) {
            const payment = await Payment.findOne({
              userId: alreadyExist.id,
              'subscription.status': { $nin: ['expired', 'cancelled'] }
            })

            console.log('====================================')
            console.log('payment --->', payment)
            console.log('====================================')
            const { subscription } = payment ?? { subscription: '' }
            console.log('====================================')
            console.log('planType ---->', subscription.planType)
            console.log('====================================')
            const tokenV = jwt.sign(
              { id: alreadyExist.id },
              process.env.JWTPRIVATEKEY,
              {
                expiresIn: '8h'
              }
            )
            return res.status(200).json({
              success: true,
              token: tokenV,
              user: {
                id: alreadyExist.id,
                name: alreadyExist.name,
                email: alreadyExist.email,
                phoneNumber: alreadyExist.phoneNumber,
                address: alreadyExist.address,
                city: alreadyExist.city,
                country: alreadyExist.country,
                state: alreadyExist.state,
                zipCode: alreadyExist.zipCode,
                subscription: subscription.planType
              }
            })
          } else {
            return res.status(404).json({
              success: false,
              message: 'User not found'
            })
          }
        })
        .catch((error) => {
          return res
            .status(404)
            .json({ success: false, message: error.message })
        })
    } catch (error) {
      return res.status(404).json({ success: false, message: error.message })
    }
  } else {
    return res.status(404).json({ success: false, message: 'Invalid Account' })
  }
}

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ error: 'Failed to get users' })
  }
}

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    const payments = await Payment.find({
      userId: user.id,
      'subscription.status': { ne: 'expired' }
    })
    const subs = payments.map((item) => {
      const { subscriptionId, sessionId, ...newSub } = item.subscription
      item.subscription = newSub
      return item
    })
    const userWithSub = {
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      address: user.address,
      city: user.city,
      country: user.country,
      state: user.state,
      zipCode: user.zipCode,
      subscriptions: subs
    }
    res.status(201).json({ success: true, user: userWithSub })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    user.name = req.body.name
    user.address = req.body.address
    user.city = req.body.city
    user.state = req.body.state
    user.country = req.body.country
    user.zipCode = req.body.zipCode
    user.phoneNumber = req.body.phoneNumber
    user.email = req.body.email
    if (req.body.password) {
      const salt = await bcrypt.genSalt(Number(process.env.SALT))
      user.password = await bcrypt.hash(req.body.password, salt)
    }
    await user.save()
    res.status(201).json({ success: true })
  } catch (error) {
    res.status(500).json({ error: 'Failed to update the user' })
  }
}

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    user.deleted = true
    await user.save()
    res.json(204).json({ success: true })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete the user' })
  }
}

exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: 'Invalid username' })
    }
    const matched = await bcrypt.compare(req.body.password, user.password)
    if (!matched) {
      return res
        .status(401)
        .json({ success: false, message: 'Invalid password' })
    } else {
      const tk = jwt.sign({ id: user.id }, process.env.JWTPRIVATEKEY, {
        expiresIn: '8h'
      })
      return res.json({
        success: true,
        token: tk,
        user: {
          name: user.name,
          email: user.email,
          phoneNumber: user.phoneNumber,
          address: user.address,
          city: user.city,
          country: user.country,
          state: user.state,
          zipCode: user.zipCode
        }
      })
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}
