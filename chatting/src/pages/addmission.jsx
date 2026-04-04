// CourseCatalog.jsx
import React, { useState } from 'react';
import './addmission.css'; // Same CSS use kar sakte ho

const courses = [
  {
    id: 1,
    name: 'ADCA Plus',
    price: 4999,
    duration: '12 Months',
    info: 'Advanced Diploma in Computer Applications. Includes Office 365, Tally Prime, Photoshop, and Web Basics.',
    icon: 'monitor'
  },
  {
    id: 2,
    name: 'Web Development',
    price: 8999,
    duration: '6 Months',
    info: 'Full Stack Development: HTML5, CSS3, JavaScript, React, and Backend with Node.js.',
    icon: 'code-2'
  },
  {
    id: 3,
    name: 'Python AI/ML',
    price: 7499,
    duration: '4 Months',
    info: 'Data Science and Artificial Intelligence basics using Python, NumPy, and Pandas.',
    icon: 'brain-circuit'
  },
  {
    id: 4,
    name: 'Graphic Design',
    price: 3999,
    duration: '3 Months',
    info: 'Master Adobe Photoshop, Illustrator, and CorelDraw for professional branding.',
    icon: 'palette'
  },
  {
    id: 5,
    name: 'Tally Prime & GST',
    price: 3499,
    duration: '2 Months',
    info: 'Professional Accounting and Taxation with GST Filing and Inventory Management.',
    icon: 'calculator'
  },
  {
    id: 6,
    name: 'CCC / BCC',
    price: 1499,
    duration: '3 Months',
    info: 'Basic Computer Course essential for Government Jobs and Digital Literacy.',
    icon: 'shield-check'
  },
  {
    id: 7,
    name: 'Cyber Security',
    price: 9999,
    duration: '6 Months',
    info: 'Ethical Hacking, Network Security, and Protection against Cyber Threats.',
    icon: 'lock'
  },
  {
    id: 8,
    name: 'Digital Marketing',
    price: 5499,
    duration: '3 Months',
    info: 'SEO, Social Media Marketing, Google Ads, and Content Strategy.',
    icon: 'trending-up'
  },

];

const Addmission = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedBatch, setSelectedBatch] = useState('');
  const [studentName, setStudentName] = useState('');

  const batches = ['Morning (09:00 AM)', 'Noon (01:00 PM)', 'Evening (05:00 PM)'];

  const selectCourse = (course) => {
    setSelectedCourse(course);
    setCurrentStep(2);
  };

  const setBatch = (batch) => {
    setSelectedBatch(batch);
  };

  const nextStep = (step) => {
    if (step === 3) {
      if (!selectedBatch) {
        alert('Please select a batch timing!');
        return;
      }
      setCurrentStep(3);
    } else if (step === 4) {
      // Backend API call yahan hogi
      handleSubmit();
    } else {
      setCurrentStep(step);
    }
  };

  const handleSubmit = async () => {
  if (!studentName.trim()) {
    alert('Student name required!');
    return;
  }

  const enrollmentData = {
    course_id: selectedCourse.id,
    course_name: selectedCourse.name,
    price: selectedCourse.price,
    batch: selectedBatch,
    student_name: studentName.trim()
  };

  try {
    const response = await fetch('http://localhost/shine-api/enroll.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(enrollmentData)
    });

    const result = await response.json();
    
    if (response.ok && result.success) {
      alert(`✅ Enrollment successful! ID: ${result.enrollment_id}`);
      setCurrentStep(4);
    } else {
      alert(`❌ Error: ${result.message || 'Enrollment failed'}`);
    }
  } catch (error) {
    console.error('Network error:', error);
    alert('🌐 Server down? Check XAMPP Apache + MySQL');
  }
};


  const goBack = () => {
    if (currentStep === 2) setCurrentStep(1);
    else if (currentStep === 3) setCurrentStep(2);
    else window.history.back();
  };

  return (
    <>
      <video className="video-bg" autoPlay muted loop>
        <source src="coding.mp4" type="video/mp4" />
      </video>

      <a href="#" className="back-btn" onClick={goBack}>
        <i data-lucide="arrow-left"></i> Back to Home
      </a>

      <div className="container">
        {/* Step 1: Course Grid */}
        <div className={`step ${currentStep === 1 ? 'active' : ''}`} id="step1">
          <div className="header">
            <h1>Our Courses</h1>
            <p>Advanced Computer Training for a Shiner Future</p>
          </div>
          <div className="course-grid">
            {courses.map((course) => (
              <div
                key={course.id}
                className="course-card"
                onClick={() => selectCourse(course)}
              >
                <i data-lucide={course.icon} size="36" color="#00f2fe"></i>
                <h3>{course.name}</h3>
                <p className="duration">{course.duration}</p>
                <p className="price-tag">₹{course.price.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Step 2: Course Details */}
        <div className={`step ${currentStep === 2 ? 'active' : ''}`} id="step2">
          <div className="detail-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2>{selectedCourse?.name} ({selectedCourse?.duration})</h2>
              <span style={{ color: 'var(--accent)', fontWeight: '800', fontSize: '20px' }}>
                ₹{selectedCourse?.price.toLocaleString()}
              </span>
            </div>
            <p style={{ color: '#ccc', margin: '20px 0', lineHeight: '1.6', borderLeft: '3px solid var(--accent)', paddingLeft: '15px' }}>
              {selectedCourse?.info}
            </p>

            <div style={{ marginBottom: '25px' }}>
              <label style={{ color: 'var(--accent)', fontSize: '12px', fontWeight: 'bold', letterSpacing: '1px' }}>
                SELECT BATCH TIMING
              </label>
              <div className="batch-options">
                {batches.map((batch, index) => (
                  <div
                    key={index}
                    className={`batch-chip ${selectedBatch === batch ? 'selected' : ''}`}
                    onClick={() => setBatch(batch)}
                  >
                    {batch}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ color: 'var(--accent)', fontSize: '12px', fontWeight: 'bold', letterSpacing: '1px' }}>
                STUDENT FULL NAME
              </label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Enter your name"
                style={{
                  width: '100%',
                  padding: '14px',
                  background: 'rgba(0,0,0,0.3)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  color: 'white',
                  marginTop: '8px'
                }}
              />
            </div>

            <button className="btn-primary" onClick={() => nextStep(3)}>
              Review & Pay
            </button>
          </div>
        </div>

        {/* Step 3: Payment */}
        <div className={`step ${currentStep === 3 ? 'active' : ''}`} id="step3">
          <div className="detail-card" style={{ textAlign: 'center' }}>
            <h2>Confirm Enrollment</h2>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '15px', margin: '20px 0', textAlign: 'left' }}>
              <p><strong>Course:</strong> {selectedCourse?.name}</p>
              <p><strong>Batch:</strong> {selectedBatch}</p>
              <p><strong>Student:</strong> {studentName || 'Guest Student'}</p>
              <hr style={{ border: '0', borderTop: '1px solid var(--border)', margin: '10px 0' }} />
              <p style={{ fontSize: '20px', color: 'var(--accent)' }}>
                <strong>Total:</strong> ₹{selectedCourse?.price.toLocaleString()}
              </p>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <img src="qr.jpeg" alt="QR" style={{ border: '8px solid white', borderRadius: '10px', width: '200px', height: 'auto' }} />
              <p style={{ color: '#00ff88', marginTop: '10px', fontSize: '14px' }}>Scan QR to pay via Any UPI App</p>
            </div>
            <button className="btn-primary" onClick={() => nextStep(4)}>
              I Have Paid - Submit
            </button>
          </div>
        </div>

        {/* Step 4: Success */}
        <div className={`step ${currentStep === 4 ? 'active' : ''}`} id="step4">
          <div className="detail-card" style={{ textAlign: 'center' }}>
            <i data-lucide="check-circle" size="80" color="#00ff88"></i>
            <h1 style={{ marginTop: '20px' }}>Welcome to Shine!</h1>
            <p>
              Your admission for <b>{selectedCourse?.name}</b> is successfully initiated. 
              See you in the <b>{selectedBatch}</b> batch!
            </p>
            <button className="btn-primary" onClick={() => window.location.reload()}>
              Return to Dashboard
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Addmission;
