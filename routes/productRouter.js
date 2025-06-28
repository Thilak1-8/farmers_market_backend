// routes/productRoutes.js
const express = require('express');
const { addProduct } = require('../controllers/productcontroller');
const { getAllProducts } = require('../controllers/productcontroller');

const router = express.Router();

// POST /products/add - Add a new product
router.post('/add', addProduct);
router.get('/', getAllProducts);


module.exports = router;
