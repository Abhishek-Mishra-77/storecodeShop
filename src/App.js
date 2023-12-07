import React from 'react';
import './App.css';
import Navbar from './Component/Navbar/Navbar';
import Shop from './Pages/Shop/Shop';
import ShopCategory from './Pages/ShopCategory/ShopCategory';
import Product from './Pages/Product/Product'
import Cart from './Pages/Cart/Cart'
import LoginSignup from './Pages/LoginSignup/LoginSignup';
import Footer from './Component/Footer/Footer';
import men_banner from './Component/Assets/banner_mens.png'
import women_banner from './Component/Assets/banner_women.png'
import kids_banner from './Component/Assets/banner_kids.png'
import TopBanner from './Component/TopBanner/TopBanner';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <Router>
      <TopBanner />
      <Navbar />
      <Routes>
        <Route path='/' element={<Shop />} />
        <Route path='/mens' element={<ShopCategory banner={men_banner} category="men" />} />
        <Route path='/womens' element={<ShopCategory banner={women_banner} category="women" />} />
        <Route path='/kids' element={<ShopCategory banner={kids_banner} category="kid" />} />
        <Route path='product' element={<Product />} >
          <Route path=':productId' element={<Product />} />
        </Route>
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<LoginSignup />} />
        <Route path='*' element={<Shop />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
