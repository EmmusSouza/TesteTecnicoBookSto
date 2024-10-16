import React, { createContext, useEffect, useState } from 'react';

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [itemAmount, setItemAmount] = useState(0);
  const [total, setTotal] = useState(0);
  const [deliveryDate, setDeliveryDate] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [pixAmount, setPixAmount] = useState(0);
  const [creditAmount, setCreditAmount] = useState(total);

  // Carregar produtos do backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5003/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Atualizar o total do carrinho
  useEffect(() => {
    const totalAmount = cart.reduce((acc, currentItem) => {
      const priceAsNumber = parseFloat(currentItem.price);
      return acc + priceAsNumber * currentItem.amount;
    }, 0);
    setTotal(totalAmount);
  }, [cart]);

  // Função para adicionar item ao carrinho
  const addToCart = (product, id) => {
    const cartItem = cart.find((item) => item._id === id);

    if (cartItem) {
      if (cartItem.amount < cartItem.quantity) {
        const updatedCart = cart.map((item) => {
          if (item._id === id) {
            return { ...item, amount: item.amount + 1 };
          }
          return item;
        });
        setCart(updatedCart);
      }
    } else {
      const newItem = { ...product, amount: 1 };
      setCart([...cart, newItem]);
    }
  };

  // Função para remover item do carrinho
  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item._id !== id);
    setCart(updatedCart);
  };

  // Funções de aumento e diminuição de quantidade
  const increaseAmount = (id) => {
    const cartItem = cart.find((item) => item._id === id);
    if (cartItem && cartItem.amount < cartItem.quantity) {
      const updatedCart = cart.map((item) => {
        if (item._id === id) {
          return { ...item, amount: item.amount + 1 };
        }
        return item;
      });
      setCart(updatedCart);
    }
  };

  const decreaseAmount = (id) => {
    const cartItem = cart.find((item) => item._id === id);
    if (cartItem) {
      if (cartItem.amount > 1) {
        const updatedCart = cart.map((item) => {
          if (item._id === id) {
            return { ...item, amount: item.amount - 1 };
          }
          return item;
        });
        setCart(updatedCart);
      } else {
        removeFromCart(id);
      }
    }
  };

  // Função para lidar com a mudança do método de pagamento
  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);

    if (method === 'both') {
      const halfTotal = parseFloat((total / 2).toFixed(2));
      setPixAmount(halfTotal);
      setCreditAmount(halfTotal);
    } else {
      setPixAmount(0);
      setCreditAmount(total);
    }
  };

  const handlePixAmountChange = (value) => {
    const pixValue = parseFloat(value) || 0;
    if (pixValue <= total) {
      setPixAmount(pixValue);
      setCreditAmount(parseFloat((total - pixValue).toFixed(2)));
    }
  };

  const handleCreditAmountChange = (value) => {
    const creditValue = parseFloat(value) || 0;
    if (creditValue <= total) {
      setCreditAmount(creditValue);
      setPixAmount(parseFloat((total - creditValue).toFixed(2)));
    }
  };

  // Função para criar um pedido
  const createOrder = async (deliveryDate, paymentMethod) => {
    try {
      const response = await fetch('http://localhost:5003/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cart.map((item) => ({
            product: item._id,
            quantity: item.amount,
            price: item.price,
          })),
          total,
          deliveryDate,
          paymentMethod,
        }),
      });

      const data = await response.json();
      console.log('Pedido criado com sucesso:', data);
      setCart([]); // Limpar o carrinho após criar o pedido
    } catch (error) {
      console.error('Erro ao criar pedido:', error);
    }
  };

  useEffect(() => {
    const totalItems = cart.reduce((acc, currentItem) => acc + currentItem.amount, 0);
    setItemAmount(totalItems);
  }, [cart]);

  return (
    <ShopContext.Provider
      value={{
        products,
        cart,
        total,
        itemAmount,
        addToCart,
        removeFromCart,
        increaseAmount,
        decreaseAmount,
        createOrder,
        deliveryDate,
        setDeliveryDate,
        paymentMethod,
        handlePaymentMethodChange,
        pixAmount,
        creditAmount,
        handlePixAmountChange,
        handleCreditAmountChange,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
