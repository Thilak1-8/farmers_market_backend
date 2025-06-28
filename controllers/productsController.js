const Product = require('../models/Product');
const Farmer = require('../models/Farmer');

exports.addProduct = async (req, res) => {
  const { name, description, price, quantity } = req.body;
  try {
    const farmer = await Farmer.findById(req.farmer.id);
    if (!farmer) return res.status(404).json({ message: 'Farmer not found' });
    if (!farmer.farmerID) return res.status(400).json({ message: 'Complete your registration first' });

    const product = new Product({
      farmerID: farmer.farmerID,
      name,
      description,
      price,
      quantity,
    });
    await product.save();

    res.json(product);
  } catch (err) {
    console.error('Add product error:', err.message);
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
};

exports.getFarmerProducts = async (req, res) => {
  try {
    const farmer = await Farmer.findById(req.farmer.id);
    if (!farmer) return res.status(404).json({ message: 'Farmer not found' });

    const products = await Product.find({ farmerID: farmer.farmerID });
    res.json(products);
  } catch (err) {
    console.error('Get products error:', err.message);
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
};

exports.updateProduct = async (req, res) => {
  const { name, description, price, quantity } = req.body;
  const productId = req.params.id;
  try {
    const farmer = await Farmer.findById(req.farmer.id);
    if (!farmer) return res.status(404).json({ message: 'Farmer not found' });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    if (product.farmerID !== farmer.farmerID) {
      return res.status(403).json({ message: 'Not authorized to edit this product' });
    }

    product.name = name;
    product.description = description;
    product.price = price;
    product.quantity = quantity;
    await product.save();

    res.json(product);
  } catch (err) {
    console.error('Update product error:', err.message);
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    const farmerIds = [...new Set(products.map((p) => p.farmerID))];
    const farmers = await Farmer.find({ farmerID: { $in: farmerIds } }).select('farmerID name farmName');

    const farmerMap = farmers.reduce((map, farmer) => {
      map[farmer.farmerID] = { name: farmer.name, farmName: farmer.farmName };
      return map;
    }, {});

    const productsWithFarmerDetails = products.map((product) => ({
      ...product._doc,
      farmer: farmerMap[product.farmerID] || { name: 'Unknown', farmName: 'Unknown' },
    }));

    res.json(productsWithFarmerDetails);
  } catch (err) {
    console.error('Get all products error:', err.message);
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
};