import { useContext } from 'react';
import CartDetails from './CartDetails.jsx';
import { ShopContext } from '../ShopContext/ShopContext.jsx';
import "./Cart.css";

const Cart = () => {
  const { 
    cart, 
    total, 
    itemAmount, 
    deliveryDate, 
    setDeliveryDate, 
    paymentMethod, 
    handlePaymentMethodChange, 
    pixAmount, 
    creditAmount, 
    handlePixAmountChange, 
    handleCreditAmountChange, 
    createOrder 
  } = useContext(ShopContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Verifica se a data de entrega é válida
    const today = new Date();
    const selectedDate = new Date(deliveryDate);

    if (!deliveryDate) {
      alert('Por favor, escolha uma data de entrega.');
      return;
    }

    if (selectedDate <= today) {
      alert('A data de entrega deve ser após hoje.');
      return;
    }

    if (!paymentMethod) {
      alert('Por favor, selecione um método de pagamento.');
      return;
    }

    // Chamando a função createOrder para enviar o pedido
    createOrder(deliveryDate, paymentMethod);
    console.log(`Pedido criado com sucesso! Data de entrega: ${deliveryDate}, Método de pagamento: ${paymentMethod}`);
  };

  return (
    <div className="cart_container">
      <div className="cart_left">
        <div className="cart_header">
          <h1>Carrinho de compras</h1>
        </div>
        <div className='cart_header'>
            <span>Produto</span>
            <span>Quantidade</span>
            <span>Preço</span>
            <span>Total</span>
          </div>
        <div className="cart_detail">
          {cart.length > 0 ? (
            cart.map((item) => <CartDetails item={item} key={item._id} />)
          ) : (
            <p>Seu carrinho está vazio</p>
          )}
        </div>
      </div>

      <div className="cart_right">
        <h2>Resumo do carrinho</h2>
        <div className="cart_summary">
          <div className="summary_item">
            <span>Itens</span>
            <span>{itemAmount}</span>
          </div>
          <div className="summary_item">
            <span>Total</span>
            <span>R$ {total.toFixed(2)}</span>
          </div>
          <div className="summary_item">
            <span>Entrega</span>
            <input
              className='input_data'
              type="date"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
              required
            />
            
          </div>
        </div>

        <div className="payment_form">
          <span>Método de pagamento</span>
          <select value={paymentMethod} onChange={(e) => handlePaymentMethodChange(e.target.value)} required>
            <option value="">Selecione...</option>
            <option value="credit">Cartão de Crédito</option>
            <option value="debit">Cartão de Débito</option>
            <option value="pix">PIX</option>
            <option value="both">PIX e Cartão de Crédito</option>
          </select>

          {paymentMethod === 'both' && (
            <div className="split_payment">
              <label label>Valor via PIX:</label>
              <input
                type="number"
                value={pixAmount}
                onChange={(e) => handlePixAmountChange(e.target.value)}
                max={total}
              />
              <label className='label'>Valor via Crédito:</label>
              <input
                type="number"
                value={creditAmount}
                onChange={(e) => handleCreditAmountChange(e.target.value)}
                max={total}
              />
            </div>
          )}
        </div>

        <button onClick={handleSubmit} className='payment_form_button'>
          Finalizar Pagamento
        </button>
      </div>
    </div>
  );
};

export default Cart;

