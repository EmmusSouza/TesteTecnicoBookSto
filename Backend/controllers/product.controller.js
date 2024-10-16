const Product = require('../models/product.model');

// Criar novo produto
exports.createProduct = async (req, res) => {
  try {
      const { name, price, quantity, imageUrl } = req.body;  
      const newProduct = new Product({ name, price, quantity, imageUrl });
      await newProduct.save();
      res.status(201).json(newProduct);
  } catch (error) {
      res.status(500).json({ message: 'Erro ao criar o produto' });
  }
};

// Listar produtos
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao obter os produtos' });
    }
};

// Atualizar produto
exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar o produto' });
    }
};

// Deletar produto
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await Product.findByIdAndDelete(id);
        res.status(200).json({ message: 'Produto deletado' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar o produto' });
    }
};
exports.decreaseProductStock = async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findById(id);
  
      if (product && product.quantity > 0) {
        product.quantity -= 1; // Decrementa a quantidade
        await product.save(); // Salva as alterações no banco de dados
        res.status(200).json(product);
      } else {
        res.status(400).json({ message: 'Estoque insuficiente' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Erro ao atualizar o estoque do produto' });
    }
  };