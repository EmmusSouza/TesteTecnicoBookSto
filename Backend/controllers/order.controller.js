const Order = require('../models/order.model');

// Função para criar um novo pedido
exports.createOrder = async (req, res) => {
  try {
    const { user, items, total, deliveryDate, paymentMethod } = req.body;

    const newOrder = new Order({
      user,
      items,
      total,
      deliveryDate,
      paymentMethod
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Erro ao criar pedido:', error);
    res.status(500).json({ message: 'Erro ao criar pedido.' });
  }
};

// Função para buscar pedidos
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user').populate('items.product');
    res.status(200).json(orders);
  } catch (error) {
    console.error('Erro ao buscar pedidos:', error);
    res.status(500).json({ message: 'Erro ao buscar pedidos.' });
  }
};