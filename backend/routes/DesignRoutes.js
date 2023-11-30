// routes/userRoutes.js
const express = require('express')
const router = express.Router()
const DesignController = require('../controllers/DesignController')
const auth = require('../middleware/authenticate')

// Add a new design
router.post('/', auth, DesignController.addDesign)

// Get all Design
router.get('/', auth, DesignController.getAllDesign)

// Get a single design
router.get('/:id', auth, DesignController.getDesign)

// Update a design by ID
router.put('/:id', auth, DesignController.updateDesign)

// Delete a design by ID
router.delete('/:id', auth, DesignController.deleteDesign)

module.exports = router
