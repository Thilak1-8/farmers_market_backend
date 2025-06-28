const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const farmerController = require('../controllers/farmerController');
const productController = require('../controllers/productsController');
const auth = require('../middleware/auth');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/profile', auth, farmerController.getProfile);
router.post('/profile', auth, farmerController.updateProfile);
router.post('/products', auth, productController.addProduct);
router.get('/products', auth, productController.getFarmerProducts);
router.put('/products/:id', auth, productController.updateProduct);
router.get('/all-products', productController.getAllProducts);
router.get('/farmers', farmerController.getAllFarmers);

module.exports = router;