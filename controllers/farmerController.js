const Farmer = require('../models/Farmer');

exports.getProfile = async (req, res) => {
  try {
    const farmer = await Farmer.findById(req.farmer.id).select('-password');
    if (!farmer) return res.status(404).json({ message: 'Farmer not found' });
    res.json(farmer);
  } catch (err) {
    console.error('Get profile error:', err.message);
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
};

exports.updateProfile = async (req, res) => {
  const { farmerID, name, farmName, location, contactInfo } = req.body;
  try {
    const farmer = await Farmer.findById(req.farmer.id);
    if (!farmer) return res.status(404).json({ message: 'Farmer not found' });

    const existingFarmer = await Farmer.findOne({ farmerID });
    if (existingFarmer && existingFarmer.id !== req.farmer.id) {
      return res.status(400).json({ message: 'Farmer ID already in use' });
    }

    farmer.farmerID = farmerID;
    farmer.name = name;
    farmer.farmName = farmName;
    farmer.location = location;
    farmer.contactInfo = contactInfo;
    await farmer.save();

    res.json(farmer);
  } catch (err) {
    console.error('Update profile error:', err.message);
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
};

exports.getAllFarmers = async (req, res) => {
  try {
    const farmers = await Farmer.find().select('farmerID name farmName location contactInfo');
    res.json(farmers);
  } catch (err) {
    console.error('Get all farmers error:', err.message);
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
};