import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const VismeLogin = () => {
  useEffect(() => {
    // Visme ke embed script ko dynamic load karne ke liye
    const script = document.createElement('script');
    script.src = "https://static-bundle.visme.co/forms/vismeforms-embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Component unmount hone par script hata sakte hain (optional)
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div style={styles.pageWrapper}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        style={styles.container}
      >
        {/* Aapka Visme Code Yahan Hai */}
        <div 
          className="visme_d" 
          data-title="Webinar Registration Form" 
          data-url="g7ddqxx0-untitled-project?fullPage=true" 
          data-domain="forms" 
          data-full-page="true" 
          data-min-height="100vh" 
          data-form-id="133190"
        ></div>
      </motion.div>
    </div>
  );
};

const styles = {
  pageWrapper: {
    minHeight: '100vh',
    background: '#0f172a', // Dark theme background
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    width: '100%',
    maxWidth: '900px', // Aap apne hisaab se width adjust kar sakte hain
    borderRadius: '15px',
    overflow: 'hidden',
    boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
  }
};

export default VismeLogin;