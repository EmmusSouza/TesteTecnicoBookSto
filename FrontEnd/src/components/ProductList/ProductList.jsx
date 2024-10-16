import React, { useContext } from 'react';
import { ShopContext } from '../ShopContext/ShopContext';

import './ProductList.css';

const ProductList = () => {
  const { products, addToCart } = useContext(ShopContext);

  return (
    <div>
      <div className="product_list">
        <h2>Coleção de livros</h2>
        <div className="product_grid">
          {products.map((product) => {
            const { _id, imageUrl, name, price, quantity } = product;

            return (
              <div className="product_card" key={_id}>
                <img src={imageUrl} alt={name} className="product-img" />
                <div className="product_info">
                  <h4>{name}</h4>
                  <p>Valor: R$ {price}</p>
                  <p className="product_quantity">Em estoque: {quantity}</p>
                </div>
                <button 
                  onClick={() => addToCart(product, _id)} 
                  className='add-to-cart'
                  disabled={quantity <= 0} // Desativa o botão se não houver estoque
                >
                  {quantity > 0 ? 'Comprar' : 'Indisponível'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductList;