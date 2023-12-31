const Design = require('../models/Design')
// const jwt = require('jsonwebtoken')
// const axios = require('axios')

exports.addDesign = async (req, res) => {
  try {
    const design = { userId: req.user.id, ...req.body }

    const newDesign = new Design({ ...design })
    await newDesign.save()
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
