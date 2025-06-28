const mongoose = require('mongoose');

const signupSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    userType: {
        type: String,
        required: true,
        enum: ['Farmers', 'Customers'],
    },
});

const Signup = mongoose.model('Signup', signupSchema);
module.exports = Signup;  // Use CommonJS export syntax
