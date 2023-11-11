const express = require("express");
const router = express.Router();
const AIController = require("../controllers/AIController");
const auth = require("../middleware/authenticate");
const ai = require("../middleware/checkAITokens");

router.post("/generate-story", [auth, ai], AIController.generateStory);

// Get all Design
router.post("/generate-image", auth, AIController.generateImage);

module.exports = router;
