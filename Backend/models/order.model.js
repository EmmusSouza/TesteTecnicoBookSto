const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // coloquei uma referencia para no futuro colocar a validacao de cliente pelo usuario
    required: false 
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  }],
  total: {
    type: Number,
    required: true
  },
  deliveryDate: {
    type: Date,
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ['credit', 'debit', 'pix', 'both'],
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'canceled'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;

