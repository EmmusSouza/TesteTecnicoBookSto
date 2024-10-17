const Product = require('../models/product.model'); // Importa o modelo de produto
const Order = require('../models/order.model'); // Importa o modelo de pedido

// Função para diminuir o estoque do produto
const decreaseProductStock = async (productId, quantity) => {
  try {
    // Atualiza a quantidade do produto no estoque
    await Product.findByIdAndUpdate(
      productId,
      { $inc: { quantity: -quantity } }, // Diminui a quantidade do produto
      { new: true }
    );
  } catch (error) {
    console.error(`Erro ao atualizar estoque para o produto ${productId}:`, error);
    throw new Error(`Erro ao atualizar estoque para o produto ${productId}`);
  }
};

// Função para criar um pedido
exports.createOrder = async (req, res) => {
  try {
    const { items, total, deliveryDate, paymentMethod } = req.body;

    // Cria um novo pedido
    const newOrder = new Order({
      items,
      total,
      deliveryDate,
      paymentMethod,
    });

    await newOrder.save();

    // Atualiza o estoque de cada produto no pedido
    for (const item of items) {
      await decreaseProductStock(item.product, item.quantity);
    }

    res.status(201).json({ message: 'Pedido criado com sucesso', order: newOrder });
  } catch (error) {
    console.error('Erro ao criar pedido:', error);
    res.status(500).json({ message: 'Erro ao criar pedido.' });
  }
};
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find(); // Busca todos os pedidos no banco de dados
    res.status(200).json(orders); // Retorna os pedidos encontrados
  } catch (error) {
    console.error('Erro ao obter pedidos:', error);
    res.status(500).json({ message: 'Erro ao obter pedidos.' });
  }
};