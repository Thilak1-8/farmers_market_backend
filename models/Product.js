const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  farmerID: { 
    type: String, 
    required: true 
  },
  name: { 
    type: String, 
    required: true, 
    trim: true 
  },
  description: { 
    type: String, 
    trim: true 
  },
  price: { 
    type: Number, 
    required: true, 
    min: 0 
  },
  quantity: { 
    type: Number, 
    required: true, 
    min: 0 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Product', productSchema);