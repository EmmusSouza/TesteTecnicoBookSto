const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Conexão com o MongoDB
const mongoURI = "mongodb+srv://BookAdmin:W61aHmNzXffVoZL6@backenddb.girxq.mongodb.net/?retryWrites=true&w=majority&appName=BackendDb";

mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB Atlas connected'))
  .catch((err) => console.log('Error connecting to MongoDB: ', err));

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas de produtos
const productRoutes = require('./routes/product.route');
app.use('/api/products', productRoutes);

// Rotas de pedidos
const orderRoutes = require('./routes/order.route');
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});