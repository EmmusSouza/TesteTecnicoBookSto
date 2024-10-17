import { Link } from 'react-router-dom';
import cart from '../../assets/Cart.png';
import './Navbar.css'
import { useContext } from 'react';
import { ShopContext } from '../ShopContext/ShopContext';

const Navbar = () => {
  const {itemAmount} = useContext(ShopContext)
  return (
    <div>
       <div className="navbar">
        <div className="logo">
        <h2>BookSto</h2>
        </div>
        <div className="nav_icon_wrapper">
            <div className="nav_cart">
           <Link to ="/Cart">
           <img src={cart} alt="Carirnho" className='icon' />
           <p className="nav_cart_num">{itemAmount}</p>
           </Link>
            </div>
        </div>
       </div>
    </div>
  )
}

export default Navbar