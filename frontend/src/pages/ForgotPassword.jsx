import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Here you would send the reset request to backend
  };

  return (
    <div className="container vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="back-home position-absolute" style={{top: '2rem', left: '2rem'}}>
        <Link to="/login" className="btn btn-outline-secondary">← Back to Sign In</Link>
      </div>
      <div className="reset-container card shadow p-4 w-100" style={{maxWidth: 400}}>
        <div className="logo mb-4">
          <h1 className="mb-2" style={{fontSize: '1.8rem'}}>Reset Password</h1>
          <p className="text-muted" style={{fontSize: '0.9rem'}}>Enter your email address and we'll send you instructions to reset your password.</p>
        </div>
        <div className="info-box alert alert-info mb-4" style={{fontSize: '0.95rem'}}>
          Please ensure you have access to the email address associated with your account.
        </div>
        {submitted ? (
          <div className="alert alert-success">Reset instructions would be sent to: {email}</div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3 text-start">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                placeholder="Enter your registered email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-dark w-100 mb-3">Send Reset Instructions</button>
          </form>
        )}
        <div className="form-footer mt-3">
          <Link to="/login" className="text-dark">Remember your password? Sign In</Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
