const express = require('express');
const router = express.Router();
const { addFarmer } = require('../controllers/farmercontroller');

// POST request to register a new farmer
router.post('/add', addFarmer);

module.exports = router;
