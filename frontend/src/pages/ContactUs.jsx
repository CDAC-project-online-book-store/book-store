import React, { useState } from 'react';

function ContactUs() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Here you would send the message to backend or email service
  };

  return (
    <div className="container mt-5">
      <h2 align="center" className="mb-4 text-primary">Contact Us</h2>
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h5 className="card-title mb-3 text-success">📞 Call Us</h5>
              <p className="card-text">
                We're here to help! Reach out to our customer support team.
              </p>
              <ul className="list-unstyled">
                <li><strong>Phone:</strong> +91 98765 43210</li>
                <li><strong>Hours:</strong> Mon - Sat, 9:00 AM - 6:00 PM</li>
                <li><strong>Email:</strong> support@bookstore.com</li>
              </ul>
              <button className="btn btn-primary mt-3">Call Now</button>
            </div>
          </div>
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title mb-3 text-info">✉️ Send Us a Message</h5>
              {submitted ? (
                <div className="alert alert-success">Thank you for reaching out! We'll get back to you soon.</div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="contactEmail" className="form-label">Your Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="contactEmail"
                      placeholder="Enter your email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="contactMessage" className="form-label">Message</label>
                    <textarea
                      className="form-control"
                      id="contactMessage"
                      rows={4}
                      placeholder="Type your message here..."
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-info">Send Message</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
