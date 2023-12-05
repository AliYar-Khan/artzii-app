const express = require('express')
const router = express.Router()
const AIController = require('../controllers/AIController')
const auth = require('../middleware/authenticate')
const ai = require('../middleware/checkAITokens')
const subscription = require('../middleware/checkForSubscription')

router.post('/generate-story', [auth, ai], AIController.generateStory)

router.post('/generate-art', [auth, subscription], AIController.generateImage)

module.exports = router
