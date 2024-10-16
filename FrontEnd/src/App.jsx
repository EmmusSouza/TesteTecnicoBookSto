import Navbar from "./components/Navbar/Navbar"
import{Routes, Route} from 'react-router-dom'
import Homepage from "./pages/Homepage/Homepage"
import Cart from "./components/Cart/Cart"
const App = () => {
  return (
    <div>
      <Navbar/>   
      <Routes>
        <Route path="/" element = {<Homepage/>}/>
        <Route path="/cart" element = {<Cart/>}/>
      </Routes>
    </div>
  )
}

export default App
