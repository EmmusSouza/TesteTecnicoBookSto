const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Aqui você ainda pode manter a referência para o futuro, caso precise
    required: false // Agora não é mais obrigatório
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

