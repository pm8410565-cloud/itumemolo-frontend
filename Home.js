import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import './Home.css';

const Home = () => {
  const [offers, setOffers] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [storeInfo, setStoreInfo] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [offersRes, newRes, storeRes] = await Promise.all([
          axios.get('http://localhost:5000/api/products/offers'),
          axios.get('http://localhost:5000/api/products/new'),
          axios.get('http://localhost:5000/api/store')
        ]);
        
        setOffers(offersRes.data);
        setNewArrivals(newRes.data);
        setStoreInfo(storeRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to ITUME SUPERMARKET MOLO</h1>
          <p>Fresh Groceries, Quality Products, Affordable Prices</p>
          <button className="cta-button">Shop Now</button>
        </div>
      </section>

      {/* Special Offers */}
      <section className="section offers-section">
        <h2>Special Offers</h2>
        <div className="products-grid">
          {offers.slice(0, 4).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="section new-arrivals-section">
        <h2>New Arrivals</h2>
        <div className="products-grid">
          {newArrivals.slice(0, 4).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Store Info */}
      <section className="section store-info-section">
        <div className="info-grid">
          <div className="info-card">
            <h3>Location</h3>
            <p>{storeInfo.address}</p>
            <a 
              href={storeInfo.location?.map_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="map-link"
            >
              View on Map
            </a>
          </div>
          
          <div className="info-card">
            <h3>Opening Hours</h3>
            {storeInfo.opening_hours && Object.entries(storeInfo.opening_hours).map(([day, time]) => (
              <p key={day}><strong>{day}:</strong> {time}</p>
            ))}
          </div>
          
          <div className="info-card">
            <h3>Contact Us</h3>
            <p><strong>Phone:</strong> {storeInfo.phone}</p>
            <p><strong>Email:</strong> {storeInfo.email}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;