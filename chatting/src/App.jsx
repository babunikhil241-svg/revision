import { useState } from 'react';
import './App.css';
import Box from './components/box';
import MockTest from './pages/MockTest';
import Addmission from './pages/addmission';
import AuthPage from './pages/AuthPage';

import AdminDashboard from './pages/AdminDashboard';
import { Link, Routes, Route, Navigate } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Youtube, Globe, ChevronRight, ArrowUp } from 'lucide-react';
import ContactForm from './components/ContactForm';
import Gallery from './pages/gallery';



function App() {
    const [showContact, setShowContact] = useState(false);
    const [showAdmission, setShowAdmission] = useState(false);
    const [showPayment, setShowPayment] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);


    // Auth State
    const [user, setUser] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Thank you! We will contact you soon! 📞');
        setShowContact(false);
        setShowAdmission(false);
    };

    const courses = [
        { name:'Web Development', price: 8999, desc: 'HTML, CSS, JavaScript, React, Node.js', icon: '💻' },
        { name: 'Data Science', price: 7499, desc: 'Python, ML, Data Analysis, AI', icon: '📊' },
        { name: 'Mobile App Dev', price: 8999, desc: 'Flutter, React Native, Android, iOS', icon: '📱' },
        { name: 'Cloud Computing', price: 22000, desc: 'AWS, Azure, DevOps, Docker', icon: '☁️' },
        { name: 'CCC/BCC', price: 1499, desc: 'Basic Computer Course Certification', icon: '💻' },
        { name: 'Tally Prime', price: 3499, desc: 'Accounting & GST Software Training', icon: '📈' }
    ];

    const handleBuyCourse = (course) => {
        setSelectedCourse(course);
        setShowPayment(true);
    };

    const upiDetails = {
        upiId: 'shineclasses@paytm',
        account: 'Shine Classes',
        phone: '+91 98765 43210',
        qrCode: 'payment-qr.png'
    };

    return (
        <div className="App">
            <div className="progress-bar" />

            {/* Navbar */}
            <nav className="navbar">
                <div className="nav-container">
                    <div className="logo">
                        <img src='logo3.png' alt="logo" />
                    </div>

                    <ul className={`nav-menu ${isMenuOpen ? 'nav-menu-open' : ''}`}>
                        <li><Link to="/"><b>🏠 Home</b></Link></li>
                        <li><Link to="/Gallery"><b>💻 Gallery</b></Link></li>
                        <li><Link to="/addmission" onClick={() => setIsMenuOpen(false)}><b>📝 Admission</b></Link></li>

                        {user ? (
                            <li><Link to="/AdminDashboard" onClick={() => setIsMenuOpen(false)}><b>📊 Dashboard</b></Link></li>
                        ) : (
                            <li><Link to="/AuthPage" onClick={() => setIsMenuOpen(false)}><b>🔑 Login</b></Link></li>
                        )}

                        <li><Link to="/MockTest" onClick={() => setIsMenuOpen(false)}><b>✍️ Mock Test</b></Link></li>
                        <li><Link to="/ContactForm"><b>📞 Contact</b></Link></li>
                    </ul>

                    <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <span className={`hamburger ${isMenuOpen ? 'open' : ''}`}></span>
                    </button>
                </div>
            </nav>

            {/* Routes Configuration */}
            <Routes>
                {/* Home Route */}
                <Route path="/" element={
                    <>
                        <section id="home" className="hero">


                            <div className="hero-content">
                                {/* Main Title - Pure CSS Typewriter */}
                                <div style={{ minHeight: '1.2em', marginBottom: '10px' }}>
                                    <h1 className="typewriter-main">
                                        Welcome To Shine Classes
                                    </h1>
                                </div>

                                {/* Subtitle - One-by-One Letter Fade */}
                                <div className="subtitle-reveal">
                                    {"Master Computer Courses with Expert Training".split("").map((char, index) => (
                                        <span
                                            key={index}
                                            className="letter-pop"
                                            style={{
                                                animationDelay: `${index * 0.05}s`,
                                                minWidth: char === " " ? "8px" : "auto"
                                            }}
                                        >
                                            {char}
                                        </span>
                                    ))}
                                </div>

                                <div className="hero-buttons" style={{ marginTop: '30px' }}>
                                    <Link to="/ContactForm" className="cta-button">Join Now</Link>
                                    <Link to="/MockTest" className="cta-secondary" style={{ textDecoration: 'none', display: 'inline-block' }}>Free Mock Test</Link>
                                </div>
                            </div>
                        </section>

                        <Box />

                        <section className="section testimonials">
                            <h2 className="section-title">Student Success</h2>
                            <div className="testimonials-grid">
                                <div className="testimonial">
                                    <div className="testimonial-avatar">
                                        <img src="nikhil.jpg" alt="Rahul S." />
                                        <div className="hover-details">
                                            <span className="name">Nikhil S.</span>
                                            <span className="course">Web Development</span>
                                            <span className="rating">⭐⭐⭐⭐⭐</span>
                                        </div>
                                    </div>
                                    <p>"Got placed at Google after Web Dev course! ⭐⭐⭐⭐⭐"</p>
                                    <span>- Nikhil S.</span>
                                </div>
                                <div className="testimonial">
                                    <div className="testimonial-avatar">
                                        <img src="priya.jpg" alt="Priya K." />
                                        <div className="hover-details">
                                            <span className="name">Priya K.</span>
                                            <span className="course">Data Science</span>
                                            <span className="rating">⭐⭐⭐⭐⭐</span>
                                        </div>
                                    </div>
                                    <p>"Best Data Science training in Lucknow! 🔥"</p>
                                    <span>- Priya K.</span>
                                </div>
                                <div className="testimonial">
                                    <div className="testimonial-avatar">
                                        <img src="boys.jpg" alt="Amit M." />
                                        <div className="hover-details">
                                            <span className="name">Amit M.</span>
                                            <span className="course">Mobile App Dev</span>
                                            <span className="rating">⭐⭐⭐⭐</span>
                                        </div>
                                    </div>
                                    <p>"100% practical training. Loved it!"</p>
                                    <span>- Amit M.</span>
                                </div>
                            </div>
                        </section>



                        <section id="courses" className="section">
                            <h2 className="section-title">Our Computer Courses</h2>
                            <div className="courses-grid">
                                {courses.map((course, index) => (
                                    <div key={index} className="course-card">
                                        <div className="course-icon">{course.icon}</div>
                                        <h3>{course.name}</h3>
                                        <p>{course.desc}</p>
                                        <span className="course-price">₹{course.price.toLocaleString()}</span>

                                    </div>
                                ))}
                            </div>
                        </section>

                        <section id="actions" className="section quick-links-section">
                            <h2 className="section-title">Quick Actions</h2>
                            <div className="quick-links">
                            
                                <Link to="/addmission" className="quick-link" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>➕Admission Form</Link>
                                 <Link to="/MockTest" className="quick-link" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✅ Free Mock Test</Link>
                                <Link to="/ContactForm" className="quick-link" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>📞 Contact Us</Link>
                                 <a href="https://wa.me/918601823230?text=Hello" className="quick-link whatsapp" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>💬 WhatsApp Chat</a>
                              
                            </div>
                        </section>
                    </>
                } />

                {/* Main Pages */}<Route path="/Gallery" element={<Gallery isAdmin={true} />} />
                <Route path="/MockTest" element={<MockTest />} />
                <Route path="/addmission" element={<Addmission />} />
                <Route path="/AuthPage" element={<AuthPage setAuth={setUser} />} />
                <Route path="/ContactForm" element={<ContactForm />} />


                {/* Protected Admin Route */}
                <Route
                    path="/AdminDashboard"
                    element={user ? <AdminDashboard username={user} logout={() => setUser(null)} /> : <Navigate to="/AuthPage" />}
                />
            </Routes>

            {/* Footer */}
            <footer id="contact" className="footer">
                <div className="footer-content">
                    <div className="footer-section">
                        <img src="/logo3.png" alt="Shine Logo" className="footer-logo" />
                        <div className="footer-brand-box">Shine Classes</div>
                        <p className="footer-description">
                            SHINE CLASSES is a beacon of educational excellence...
                        </p>
                        <div className="footer-socials">
                            <a href="https://www.youtube.com/redirect?event=channel_description&redir_token=QUFFLUhqbHBoODAxbG5fc0VfeXZkS191TlhyRksxdGVMZ3xBQ3Jtc0treF90X3psLWdfeFh6Z3J3WUlRUXQtUTVLZHRocDBVWE5XV1IwS2JyVjh1UlNBanN5dFhfUnFaXzEzb3hGanhqWVJwc0JzT0RVWjRiTkhkQWs2b1d5eVQ3UFU3WjNJY1hJZ21qUmhmMnhsTENGc0I1VQ&q=https%3A%2F%2Fwww.facebook.com%2Fprofile.php%3Fid%3D61586930730638"><Facebook size={20} /></a>
                            <a href="https://youtube.com/@computercodingwithshine?si=K2jVlVdA-qMyutgM"><Youtube size={20} /></a>
                            <a href="https://www.youtube.com/redirect?event=channel_description&redir_token=QUFFLUhqbGRXbGJ3RGlyTWJTclN4UVhSckVWSzNrMHItUXxBQ3Jtc0ttSXJfZVhxLTh2MVVreFZHajhNNlZNRHBXS2UzWUV0UjhuUms4ZXdZYTZjTGhIZXBmT3pYaUdJTUtWd3A2TF80eW1MWU16R2pMbkVseXl4amtoNXhMRkNxSUJSUFpGTmRxRUFEN2p2WXZiY3JJU1lFMA&q=https%3A%2F%2Flkebf.on-app.in%2Fapp%2Foc%2F750238%2Flkebf%3Futm_source%253Dcopy-link%2526utm_medium%253Dtutor-course-referral%2526utm_campaign%253Dcourse-overview-app"><Globe size={20} /></a>
                        </div>
                    </div>

                    <div className="footer-section">
                        <h3 className="footer-heading">Address</h3>
                        <div className="footer-contact-list">
                            <p><MapPin size={18} className="icon-green" /> HARIOM NAGAR (CIVIL LINE) GORAKHPUR</p>
                            <p><Phone size={18} className="icon-green" /> 7347853813</p>
                            <p><Mail size={18} className="icon-green" /> shineclasses25@gmail.com</p>
                        </div>
                    </div>

                    <div className="footer-section">
                        <h3 className="footer-heading">Quick Links</h3>
                        <div className="quick-links-container">
                            <ul>
                                <li><ChevronRight size={14} /> <Link to="/">Home</Link></li>
                                <li><ChevronRight size={14} /> <Link to="/Gallery">Gallery</Link></li>
                                <li><ChevronRight size={14} /> <Link to="/addmission">Admission</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>COPYRIGHT © 2026 SHINE CLASSES . ALL RIGHTS RESERVED.</p>
                    <div className="scroll-top" onClick={() => window.scrollTo(0, 0)}><ArrowUp size={20} /></div>
                </div>
            </footer>
            {/* Modals */}
            {showPayment && selectedCourse && (
                <div className="modal-overlay" onClick={() => setShowPayment(false)}>
                    <div className="modal payment-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setShowPayment(false)}>×</button>
                        <h3>💳 Pay for {selectedCourse.name}</h3>
                        <div className="payment-content">
                            <div className="course-details">
                                <h4>Course: {selectedCourse.name}</h4>
                                <div className="total-price">Total: ₹{selectedCourse.price.toLocaleString()}</div>
                            </div>
                            <div className="upi-payment">
                                <h4>UPI Payment</h4>
                                <div className="qr-code">
                                    <img src={upiDetails.qrCode} alt="UPI QR Code" className="qr-image" />
                                    <p>Scan & Pay ₹{selectedCourse.price}</p>
                                </div>
                            </div>
                            <button className="confirm-payment" onClick={() => { alert('Payment confirmed!'); setShowPayment(false); }}>Payment Done ✅</button>
                        </div>
                    </div>
                </div>
            )}
    </div>
    );
}
export default App;