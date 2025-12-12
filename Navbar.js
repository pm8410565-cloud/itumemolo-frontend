import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-top">
        <div className="container">
          <div className="contact-info">
            <FaPhone /> <span>+254 712 345 678</span>
            <FaMapMarkerAlt /> <span>Molo Town, Njoro-Molo mausummit road</span>
          </div>
        </div>
      </div>
      
      <div className="navbar-main">
        <div className="container">
          <Link to="/" className="logo">
            <h1>ITUME SUPERMARKET MOLO</h1>
          </Link>
          
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/offers">Offers</Link></li>
            <li><Link to="/new-arrivals">New Arrivals</Link></li>
            <li><Link to="/suggestions">Suggestions</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><FaShoppingCart className="cart-icon" /></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;