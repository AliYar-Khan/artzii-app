// routes/userRoutes.js
const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')
const auth = require('../middleware/authenticate')
// Create a new user
router.post('/', UserController.createUser)

// Get all users
router.get('/', auth, UserController.getAllUsers)

// login a user
router.post('/login', UserController.loginUser)

router.post('/googleSignIn', UserController.googleSignIn)

// Get a specific user by ID
router.get('/:id', auth, UserController.getUserById)

// Update a user by ID
router.put('/:id', auth, UserController.updateUser)

// Delete a user by ID
router.delete('/:id', auth, UserController.deleteUser)

module.exports = router
