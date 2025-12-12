import React from 'react';
import './WhatsAppButton.css';

const WhatsAppButton = () => {
  const phone = '254722998024';
  const message = "Hello ITUME SUPERMARKET! I have a question...";
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  
  return (
    <a href={url} className="whatsapp-button" target="_blank" rel="noreferrer">
      💬 WhatsApp
    </a>
  );
};

export default WhatsAppButton;