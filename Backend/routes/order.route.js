const express = require('express');
const router = express.Router();
const { createOrder, getOrders } = require('../controllers/order.controller');

// Rota para criar um novo pedido
router.post('/', createOrder);

// Rota para obter todos os pedidos
router.get('/', getOrders);

module.exports = router;
