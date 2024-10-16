const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

// Rota para criar produto
router.post('/', productController.createProduct);

// Rota para listar produtos
router.get('/', productController.getProducts);

// Rota para atualizar produto
router.put('/:id', productController.updateProduct);

// Rota para deletar produto
router.delete('/:id', productController.deleteProduct);

router.put('/:id/decrease', productController.decreaseProductStock);

module.exports = router;