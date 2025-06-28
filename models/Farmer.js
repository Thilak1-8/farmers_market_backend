const mongoose = require('mongoose');

const farmerSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: [true, 'Email is required'], 
    unique: true, 
    lowercase: true, 
    trim: true 
  },
  password: { 
    type: String, 
    required: [true, 'Password is required'], 
    minlength: [6, 'Password must be at least 6 characters'] 
  },
  name: { 
    type: String, 
    trim: true 
  },
  farmName: { 
    type: String, 
    trim: true 
  },
  farmerID: { 
    type: String, 
    unique: true, 
    sparse: true 
  },
  location: { 
    type: String, 
    trim: true 
  },
  contactInfo: { 
    type: String, 
    trim: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Farmer', farmerSchema);