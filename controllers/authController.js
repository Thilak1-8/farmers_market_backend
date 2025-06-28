const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Farmer = require('../models/Farmer');

exports.register = async (req, res) => {
  const { email, password, name, farmName } = req.body;
  try {
    if (!email || !password || !name || !farmName) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    let farmer = await Farmer.findOne({ email });
    if (farmer) return res.status(400).json({ message: 'Farmer already exists' });

    farmer = new Farmer({ email, password, name, farmName });
    const salt = await bcrypt.genSalt(10);
    farmer.password = await bcrypt.hash(password, salt);
    await farmer.save();

    const payload = { farmer: { id: farmer.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    console.error('Register error:', err.message);
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const farmer = await Farmer.findOne({ email });
    if (!farmer) {
      console.log(`Login attempt with non-existent email: ${email}`);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, farmer.password);
    if (!isMatch) {
      console.log(`Invalid password for email: ${email}`);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const payload = { farmer: { id: farmer.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
};