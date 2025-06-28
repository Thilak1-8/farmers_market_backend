const express = require('express'); // Change to CommonJS import
const { registerUser,loginUser } = require('../controllers/signupcontroller'); // Remove .js extension

const router = express.Router();
router.post('/register', registerUser);
router.post('/login',loginUser);

// Export the router
module.exports = router; // Change to CommonJS export
