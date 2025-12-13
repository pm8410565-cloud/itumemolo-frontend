import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [offers, setOffers] = useState([]);
  const [newItems, setNewItems] = useState([]);
  const [storeInfo, setStoreInfo] = useState({});
  const [activeTab, setActiveTab] = useState('home');
  const [suggestion, setSuggestion] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Fetch data from backend
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [productsRes, offersRes, newRes, storeRes] = await Promise.all([
        axios.get('https://itumemolo-backend-public.onrender.com/api/products'),
        axios.get('https://itumemolo-backend-public.onrender.com/api/products/offers'),
        axios.get('https://itumemolo-backend-public.onrender.com/api/products/new'),
        axios.get('https://itumemolo-backend-public.onrender.com/api/store')
      ]);

      setProducts(productsRes.data.products || []);
      setOffers(offersRes.data.products || []);
      setNewItems(newRes.data.products || []);
      setStoreInfo(storeRes.data.store || {});
    } catch (error) {
      console.log('Error fetching data:', error);
      // Use fallback data if API fails
      setProducts([
        { id: 1, name: 'Sugar 2kg', price: 250, description: 'Premium quality sugar', is_offer: true, offer_price: 220 },
        { id: 2, name: 'Cooking Oil 3L', price: 850, description: 'Pure vegetable oil', is_new: true },
        { id: 3, name: 'Fresh Milk 1L', price: 120, description: 'Fresh pasteurized milk', is_offer: true, offer_price: 100 }
      ]);
      setOffers([{ id: 1, name: 'Sugar 2kg', price: 250, offer_price: 220 }]);
      setNewItems([{ id: 2, name: 'Cooking Oil 3L', price: 850 }]);
      setStoreInfo({
        name: 'ITUME SUPERMARKET MOLO',
        address: 'Molo Town, Along Njoro-Molo Mausummit road Next to Chara lodge',
        phone: '+254 722998024',
        email: 'pm8410565@gmail.com'
      });
    }
  };

  const handleSubmitSuggestion = async (e) => {
    e.preventDefault();
    if (!suggestion.trim()) {
      alert('Please enter your suggestion');
      return;
    }

    try {
      const response = await axios.post('https://itumemolo-backend-public.onrender.com/api/suggestions', {
        name,
        email,
        suggestion
      });
      
      if (response.data.success) {
        setSubmitted(true);
        setName('');
        setEmail('');
        setSuggestion('');
        
        setTimeout(() => {
          setSubmitted(false);
        }, 3000);
      }
    } catch (error) {
      console.log('Suggestion submitted (simulated)');
      setSubmitted(true);
      setName('');
      setEmail('');
      setSuggestion('');
      
      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    }
  };

  // Render Home Page
  const renderHome = () => (
    <div className="home">
      <div className="hero">
        <h1>Welcome to {storeInfo.name || 'ITUME SUPERMARKET MOLO'}</h1>
        <p>Fresh Groceries • Quality Products • Affordable Prices</p>
        <p className="address">📍 {storeInfo.address}</p>
      </div>

      <div className="sections">
        <section className="section">
          <h2>🔥 Special Offers</h2>
          <div className="products-grid">
            {offers.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  {product.image ? (
                    <img src={product.image} alt={product.name} />
                  ) : (
                    <div className="image-placeholder">🛒</div>
                  )}
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="description">{product.description || 'Quality product'}</p>
                  <div className="price-section">
                    {product.is_offer ? (
                      <>
                        <span className="old-price">KSh {product.price}</span>
                        <span className="offer-price">KSh {product.offer_price}</span>
                      </>
                    ) : (
                      <span className="price">KSh {product.price}</span>
                    )}
                  </div>
                  {product.is_offer && <span className="badge offer">OFFER</span>}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <h2>🆕 New Arrivals</h2>
          <div className="products-grid">
            {newItems.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  {product.image ? (
                    <img src={product.image} alt={product.name} />
                  ) : (
                    <div className="image-placeholder">🛒</div>
                  )}
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="description">{product.description || 'New arrival'}</p>
                  <div className="price-section">
                    <span className="price">KSh {product.price}</span>
                  </div>
                  {product.is_new && <span className="badge new">NEW</span>}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section store-info">
          <h2>🏪 Store Information</h2>
          <div className="info-grid">
            <div className="info-card">
              <h3>📍 Location</h3>
              <p>{storeInfo.address || 'Molo Town, Njoro-Molo Mau summit road'}</p>
              <a 
                href={storeInfo.location?.map_url || 'https://maps.google.com'} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn"
              >
                View on Map
              </a>
            </div>
            
            <div className="info-card">
              <h3>⏰ Opening Hours</h3>
              {storeInfo.opening_hours ? (
                Object.entries(storeInfo.opening_hours).map(([day, time]) => (
                  <p key={day}><strong>{day}:</strong> {time}</p>
                ))
              ) : (
                <>
                  <p><strong>Mon-Thu:</strong> 7:00 AM - 9:00 PM</p>
                  <p><strong>Fri-Sat:</strong> 7:00 AM - 10:00 PM</p>
                  <p><strong>Sunday:</strong> 9:00 AM - 8:00 PM</p>
                </>
              )}
            </div>
            
            <div className="info-card">
              <h3>📞 Contact Us</h3>
              <p><strong>Phone:</strong> {storeInfo.phone || '+254 722998024'}</p>
              <p><strong>Email:</strong> {storeInfo.email || 'pm8410565@gmail.com'}</p>
              <p><strong>Customer Care:</strong> {storeInfo.customer_care || 'care@itumemolo.co.ke'}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );

  // Render Products Page
  const renderProducts = () => (
    <div className="products-page">
      <h1>All Products</h1>
      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-image">
              {product.image ? (
                <img src={product.image} alt={product.name} className="product-image" /> />
              ) : (
                <div className="image-placeholder">🛒</div>
              )}
            </div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="description">{product.description || 'Quality product'}</p>
              <p className="category">{product.category || 'General'}</p>
              <div className="price-section">
                {product.is_offer ? (
                  <>
                    <span className="old-price">KSh {product.price}</span>
                    <span className="offer-price">KSh {product.offer_price}</span>
                  </>
                ) : (
                  <span className="price">KSh {product.price}</span>
                )}
              </div>
              <div className="badges">
                {product.is_offer && <span className="badge offer">OFFER</span>}
                {product.is_new && <span className="badge new">NEW</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Render Suggestions Page
  const renderSuggestions = () => (
    <div className="suggestions-page">
      <h1>Customer Suggestions</h1>
      <p className="subtitle">We value your feedback to serve you better</p>
      
      <form className="suggestion-form" onSubmit={handleSubmitSuggestion}>
        <div className="form-group">
          <label>Your Name (Optional)</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </div>
        
        <div className="form-group">
          <label>Your Email (Optional)</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>
        
        <div className="form-group">
          <label>Your Suggestion *</label>
          <textarea
            value={suggestion}
            onChange={(e) => setSuggestion(e.target.value)}
            placeholder="Share your suggestions, complaints, or ideas for improvement..."
            rows="5"
            required
          />
        </div>
        
        <button type="submit" className="submit-btn">
          Submit Suggestion
        </button>
        
        {submitted && (
          <div className="success-message">
            ✅ Thank you! Your suggestion has been submitted successfully.
          </div>
        )}
      </form>
      
      <div className="customer-care">
        <h3>📞 Customer Care Support</h3>
        <p>For urgent matters, you can also contact our customer care:</p>
        <p><strong>Phone:</strong> {storeInfo.phone || '+254 722998024'}</p>
        <p><strong>Email:</strong> {storeInfo.customer_care || 'pm8410565@gmail.com'}</p>
        <p><strong>Response Time:</strong> Within 24 hours</p>
      </div>
    </div>
  );

  // Render About Page
  const renderAbout = () => (
    <div className="about-page">
      <h1>About {storeInfo.name || 'ITUME SUPERMARKET MOLO'}</h1>
      
      <div className="about-content">
        <p className="about-text">
          {storeInfo.about || 'ITUME SUPERMARKET MOLO has been serving the Molo community since 2010. We provide fresh groceries, quality household items, and excellent customer service at affordable prices.'}
        </p>
        
        <div className="founders-section">
          <h2>Our Founders</h2>
          <div className="founders">
            {storeInfo.founders ? (
              storeInfo.founders.map((founder, index) => (
                <div key={index} className="founder-card">
                  <div className="founder-avatar">
                    {founder.name.charAt(0)}
                  </div>
                  <h3>{founder.name}</h3>
                  <p className="role">{founder.role}</p>
                  <p className="founder-desc">{founder.description}</p>
                </div>
              ))
                        ) : (
              <>
                <div className="founder-card">
                  <div className="founder-avatar">P</div>
                  <h3>Mr. Paul Mwangi Ndirangu</h3>
                  <p className="role">Founder & CEO</p>
                  <p className="founder-desc">Founded ITUME SUPERMARKET MOLO in 2010 with a vision to provide quality products at affordable prices to the Molo community. With over 15 years of experience in retail business management.</p>
                </div>
                <div className="founder-card">
                  <div className="founder-avatar">H</div>
                  <h3>Mrs. Hannah Wanjiru Kariuki</h3>
                  <p className="role">Co-Founder & Operations Manager</p>
                  <p className="founder-desc">Oversees daily store operations, inventory management, and customer service excellence. Ensures fresh produce and quality products are always available for our valued customers.</p>
                </div>
              </>
            )}
          </div>
        </div>
        
        <div className="values-section">
          <h2>Our Values</h2>
          <div className="values">
            <div className="value-card">
              <h3>✅ Quality</h3>
              <p>We provide only the best quality products to our customers</p>
            </div>
            <div className="value-card">
              <h3>💰 Affordability</h3>
              <p>Competitive prices for all our products</p>
            </div>
            <div className="value-card">
              <h3>🌱 Freshness</h3>
              <p>Daily supply of fresh groceries and vegetables</p>
            </div>
            <div className="value-card">
              <h3>🤝 Community</h3>
              <p>Serving the Molo community since 2010</p>
            </div>
          </div>
        </div>
        
        <div className="location-section">
          <h2>📍 Visit Us</h2>
          <div className="location-card">
            <p><strong>Address:</strong> {storeInfo.address || 'Molo Town, Along Nakuru-Eldoret Highway'}</p>
            <p><strong>Landmark:</strong> Next to Molo Police Station</p>
            <a 
              href={storeInfo.location?.map_url || 'https://maps.google.com'} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn"
            >
              Get Directions
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="App">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="logo">
            <h1>🛒 ITUME SUPERMARKET MOLO</h1>
            <p className="tagline">Your One-Stop Shopping Destination</p>
          </div>
          
          {/* Navigation */}
          <nav className="navbar">
            <button 
              className={`nav-btn ${activeTab === 'home' ? 'active' : ''}`}
              onClick={() => setActiveTab('home')}
            >
              🏠 Home
            </button>
            <button 
              className={`nav-btn ${activeTab === 'products' ? 'active' : ''}`}
              onClick={() => setActiveTab('products')}
            >
              🛒 Products
            </button>
            <button 
              className={`nav-btn ${activeTab === 'suggestions' ? 'active' : ''}`}
              onClick={() => setActiveTab('suggestions')}
            >
              💡 Suggestions
            </button>
            <button 
              className={`nav-btn ${activeTab === 'about' ? 'active' : ''}`}
              onClick={() => setActiveTab('about')}
            >
              ℹ️ About
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <div className="container">
          {activeTab === 'home' && renderHome()}
          {activeTab === 'products' && renderProducts()}
          {activeTab === 'suggestions' && renderSuggestions()}
          {activeTab === 'about' && renderAbout()}
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Contact Info</h3>
              <p>{storeInfo.address || 'Molo Town, Nakuru-Eldoret Highway'}</p>
              <p>📞 {storeInfo.phone || '+254 722998024'}</p>
              <p>📧 {storeInfo.email || 'pm8410565@gmail.com'}</p>
            </div>
            
            <div className="footer-section">
              <h3>Quick Links</h3>
              <button onClick={() => setActiveTab('home')}>Home</button>
              <button onClick={() => setActiveTab('products')}>Products</button>
              <button onClick={() => setActiveTab('suggestions')}>Suggestions</button>
              <button onClick={() => setActiveTab('about')}>About Us</button>
            </div>
                <div className="map-container">
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.44!2d35.7339!3d-0.2480"
    width="100%"
    height="300"
    style={{border:0}}
    allowFullScreen
    loading="lazy"
    title="ITUME SUPERMARKET Location"
  ></iframe>
</div>
            
            <div className="footer-section">
              <h3>Opening Hours</h3>
              <p><strong>Mon-Thu:</strong> 7:00 AM - 9:00 PM</p>
              <p><strong>Fri-Sat:</strong> 7:00 AM - 10:00 PM</p>
              <p><strong>Sunday:</strong> 9:00 AM - 8:00 PM</p>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} ITUME SUPERMARKET MOLO. All rights reserved.</p>
            <p>📍 Located in Molo Town, Nakuru County, Kenya</p>
          </div>
        </div>
      </footer>
    </div>


  );
}

export default App;
