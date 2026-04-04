import React, { useState } from 'react';

import './ContactForm.css'; 

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('http://localhost/shine-api/contact.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.status === "success") {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    /* 1. Container ko 'relative' aur 'overflow-hidden' banaya gaya hai */
    <div className="contact-container relative min-h-screen overflow-hidden py-12">


      {/* 3. Content - Ise 'relative' aur 'z-10' diya hai taaki ye background ke upar rahe */}
      <div className="relative z-10 max-w-lg mx-auto px-4">
        <h2 className="text-center">Contact Us</h2>
        <p className="text-center mb-8">Admission query ya kisi bhi jaankari ke liye message karein.</p>
        
        <form className="contact-form" onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Aapka Naam" 
            required 
            onChange={(e) => setFormData({...formData, name: e.target.value})} 
            value={formData.name} 
          />
          
          <input 
            type="email" 
            placeholder="Email Address" 
            required 
            onChange={(e) => setFormData({...formData, email: e.target.value})} 
            value={formData.email} 
          />
          
          <input 
            type="tel" 
            placeholder="Phone Number (10 digits)" 
            required 
            pattern="[0-9]{10}"
            onChange={(e) => setFormData({...formData, phone: e.target.value})} 
            value={formData.phone} 
          />
          
          <textarea 
            placeholder="Aapka Sawal / Inquiry" 
            required 
            onChange={(e) => setFormData({...formData, message: e.target.value})} 
            value={formData.message} 
          />
          
          <button type="submit" className="submit-btn" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending...' : 'Submit Karein'}
          </button>

          {status === 'success' && (
            <div className="status-msg success-msg">Aapka message mil gaya hai! Ham jald contact karenge.</div>
          )}
          {status === 'error' && (
            <div className="status-msg error-msg">Kuch error aa rahi hai, fir se try karein.</div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ContactForm;