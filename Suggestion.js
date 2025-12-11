import React, { useState } from 'react';
import axios from 'axios';
import './Suggestions.css';

const Suggestions = () => {
  const [formData, setFormData] = useState({
    customer_name: '',
    email: '',
    suggestion: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await axios.post('http://localhost:5000/api/suggestions', formData);
      setSubmitted(true);
      setFormData({ customer_name: '', email: '', suggestion: '' });
    } catch (error) {
      console.error('Error submitting suggestion:', error);
      alert('Failed to submit suggestion. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="suggestions-page">
      <div className="container">
        <h1>Customer Suggestions</h1>
        <p className="subtitle">We value your feedback to serve you better</p>
        
        {submitted ? (
          <div className="success-message">
            <h2>Thank You!</h2>
            <p>Your suggestion has been submitted successfully. We appreciate your feedback.</p>
            <button onClick={() => setSubmitted(false)}>Submit Another Suggestion</button>
          </div>
        ) : (
          <form className="suggestion-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="customer_name">Name (Optional)</label>
              <input
                type="text"
                id="customer_name"
                name="customer_name"
                value={formData.customer_name}
                onChange={handleChange}
                placeholder="Your name"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email (Optional)</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your email"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="suggestion">Your Suggestion *</label>
              <textarea
                id="suggestion"
                name="suggestion"
                value={formData.suggestion}
                onChange={handleChange}
                placeholder="Please share your suggestions, complaints, or ideas for improvement..."
                rows="6"
                required
              />
            </div>
            
            <button type="submit" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Suggestion'}
            </button>
          </form>
        )}
        
        <div className="customer-care-info">
          <h2>Customer Care Support</h2>
          <p>For urgent matters, you can also contact our customer care:</p>
          <p><strong>Phone:</strong> +254 722998024</p>
          <p><strong>Email:</strong> care@itumemolo.co.ke</p>
          <p><strong>Response Time:</strong> Within 24 hours</p>
        </div>
      </div>
    </div>
  );
};

export default Suggestions;