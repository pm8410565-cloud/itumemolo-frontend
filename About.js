import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './About.css';

const About = () => {
  const [storeInfo, setStoreInfo] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStoreInfo = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/store');
        setStoreInfo(response.data);
      } catch (error) {
        console.error('Error fetching store info:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStoreInfo();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="about-page">
      <div className="container">
        <h1>About ITUME SUPERMARKET MOLO</h1>
        
        <section className="about-section">
          <h2>Our Story</h2>
          <p className="about-text">{storeInfo.about_us}</p>
        </section>

        <section className="founders-section">
          <h2>Our Founders</h2>
          <div className="founders-grid">
            {storeInfo.founders && storeInfo.founders.map((founder, index) => (
              <div key={index} className="founder-card">
                <div className="founder-avatar">
                  {founder.name.charAt(0)}
                </div>
                <h3>{founder.name}</h3>
                <p className="role">{founder.role}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="values-section">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <h3>Quality</h3>
              <p>We provide only the best quality products to our customers</p>
            </div>
            <div className="value-card">
              <h3>Affordability</h3>
              <p>Competitive prices for all our products</p>
            </div>
            <div className="value-card">
              <h3>Freshness</h3>
              <p>Daily supply of fresh groceries and vegetables</p>
            </div>
            <div className="value-card">
              <h3>Community</h3>
              <p>Serving the Molo community since 2010</p>
            </div>
          </div>
        </section>

        <section className="location-section">
          <h2>Visit Us</h2>
          <div className="location-card">
            <h3>Location Details</h3>
            <p><strong>Address:</strong> {storeInfo.address}</p>
            <p><strong>Landmark:</strong> Next to Molo Police Station</p>
            <p><strong>Coordinates:</strong> {storeInfo.location?.latitude}, {storeInfo.location?.longitude}</p>
            <a 
              href={storeInfo.location?.map_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="direction-button"
            >
              Get Directions
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;