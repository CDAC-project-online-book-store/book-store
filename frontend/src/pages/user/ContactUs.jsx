import React from 'react';

function ContactUs() {
  return (
    <div className="container mt-5">
      <h2 align="center" className="mb-4 text-primary">Contact Us</h2>

      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="card shadow-sm">
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
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
