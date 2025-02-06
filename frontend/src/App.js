import {Route, Routes} from 'react-router-dom';
import Home from './pages/Home.jsx'
import Collection from './pages/Collection.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Product from './pages/Product.jsx'
import Cart from './pages/Cart.jsx'
import Login from './pages/Login.jsx'
import PlaceOrder from './pages/PlaceOrder.jsx'
import Order from './pages/Order.jsx'
import Navbar from './Components/Navbar.jsx'
import Footer from './Components/Footer.jsx';
import Searchbar from './Components/Searchbar.jsx';
import { ToastContainer} from 'react-toastify';

function App() {
  return (
    
    <div className='p-6'>
      <Navbar/>
      <ToastContainer/>
      <Searchbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/collection' element={<Collection/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/product/:productId' element={<Product/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/place-order' element={<PlaceOrder/>}/>
        <Route path='/order' element={<Order/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
