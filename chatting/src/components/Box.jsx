// Box.jsx
import React from 'react';
import './Box.css';
import myImage from './image.jpeg';

const Box = ({ title = "Welcome" }) => {
  return (
    <div className="main-container">
      <h1>{title}</h1>
      <h2 className='kuchnhi'>To Shine Classes</h2>
      
      {/* Is div ko add kiya hai taki flexbox kaam kar sake */}
      <div className="content-row">
        
        <div className="text-section">
          <p className='text-content-title'>Course Features</p>
          <p className='text-content-body'>
            1. Student mentoring for academic concerns <br/>
            2. Immediate Doubt Clarification during classes <br/>
            3. Recorded lectures of all previous classes <br/>
            4. Special weekend batches for working people. <br/>
            5. Books and other learning material related to SSC exam preparation.
          </p>
        </div>

        <div className="image-content">
          <img src={myImage} alt="Shine Classes Logo" className="box-image" />
        </div>

      </div>
    </div>
  );
};

export default Box;
