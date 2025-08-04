import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
const GetInTouch = () => (
    <footer className="get-in-touch-footer">
        <hr />
        <h2>Get In Touch</h2>
        <div className="get-in-touch-container">
            {/* Left: Form Section */}

            <div className="get-in-touch-form">
                <div className="col-12 col-md-6 mb-4">
                    <form className="contact-form">
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email*</label>
                            <input type="email" id="email" name="email" className="form-control" placeholder="Your email" required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="message" className="form-label">Message*</label>
                            <textarea id="message" name="message" className="form-control" rows="4" placeholder="Your message" required />
                        </div>

                        <div className="form-check mb-3">
                            <input type="checkbox" id="subscribe" name="subscribe" className="form-check-input" />
                            <label htmlFor="subscribe" className="form-check-label">Subscribe to newsletter</label>
                        </div>

                        <button type="submit" className="btn btn-success">Send Message</button>
                    </form>
                </div>
            </div>

            {/* Right: Contact & Icons */}
            <div className="get-in-touch-contact">
                <p>
                    123-456-7890<br />
                    info@mysite.com<br />
                    Sunbeam Infotech,<br />
                    Hinjewadi, Pune, India
                </p>
                <div className="social-icons d-flex gap-3">
                    <a href="#" className='social-link'><FaFacebookF /></a>
                    <a href="#" className='social-link'><FaTwitter /></a>
                    <a href="#" className='social-link'><FaInstagram /></a>
                    <a href="#" className='social-link'><FaLinkedin /></a>

                </div>
            </div>
        </div>
        <hr />
        {/* Bottom Center: Policies */}
        <div className="footer-bottom">
            <div className="policy-links">
                <a href="/privacy">Privacy Policy</a> |
                <a href="/accessibility">Accessibility Statement</a> |
                <a href="/shipping">Shipping Policy</a> |
                <a href="/terms">Terms & Conditions</a> |
                <a href="/refund">Refund Policy</a>
            </div>
            <p>&copy; 2025 by Online Book Store. Powered and secured by You.</p>
        </div>
    </footer>
);

export default GetInTouch;