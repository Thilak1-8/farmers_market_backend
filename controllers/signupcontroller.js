const Signup = require('../models/Signup'); // Remove .js extension for CommonJS
const bcrypt = require('bcrypt');





// Login function
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Signup.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid password' });
        }

        // Generate a token or return success message
        res.json({ success: true, message: 'Login successful', token: 'your-token-here' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Register user

const registerUser = async (req, res) => {
    const { email, password, userType } = req.body;

    try {
        // Check if user already exists
        const existingUser = await Signup.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user with the hashed password
        const newUser = new Signup({ email, password: hashedPassword, userType });
        await newUser.save();

        res.status(201).json({ success: true, message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};


// Export the function
module.exports = { registerUser, loginUser };
