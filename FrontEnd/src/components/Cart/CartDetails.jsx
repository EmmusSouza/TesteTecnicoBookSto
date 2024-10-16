import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ShopContext } from '../ShopContext/ShopContext';
import { IoMdRemove, IoMdAdd } from 'react-icons/io';
import "./Cart.css";

const CartDetails = ({ item }) => {
  const {  increaseAmount, decreaseAmount } = useContext(ShopContext);
  const { _id, name, imageUrl, price, amount, quantity } = item; // Usando _id no lugar de id

  return (
    <div className="cart_item">
      <div className="product_details">
        <img src={imageUrl} alt={name} />
        <div className="product_info">
          <h3>{name}</h3>
        </div>
        <div className="quantity">
          <button onClick={() => decreaseAmount(_id)}> {/* Usando _id */}
            <IoMdRemove />
          </button>
          <span>{amount}</span>
          <button onClick={() => increaseAmount(_id)}> {/* Usando _id */}
            <IoMdAdd />
          </button>
        </div>
        <div className="price">        R$ {price}</div>
        <div className="total">
          {'R$ ' + parseFloat(price * amount).toFixed(2)}
        </div>
      </div>
    </div>
  );
}

// Adicionando validação das props com PropTypes
CartDetails.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // Alterado para _id
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    amount: PropTypes.number.isRequired,
    quantity: PropTypes.number, // Supondo que "quantity" seja opcional
  }).isRequired,
};

export default CartDetails;
