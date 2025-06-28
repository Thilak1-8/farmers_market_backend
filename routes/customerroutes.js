// backend/routes/customerRoutes.js
const express = require('express');
const { addCustomer } = require('../controllers/customerController');

const router = express.Router();

// Route to handle adding a customer
router.post('/add', addCustomer);

module.exports = router;
