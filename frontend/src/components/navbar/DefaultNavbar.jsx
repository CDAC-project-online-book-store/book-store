import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


function DefaultNavbar() {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')));

  useEffect(() => {
    const interval = setInterval(() => {
      setUser(JSON.parse(localStorage.getItem('user')));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light" style={{ background: '#e3f2fd', borderBottom: '1px solid #b6d4fe' }}>
        <div className="container">
          <Link className="navbar-brand" to="/">
            <div style={{ display: 'inline-flex', alignItems: 'center' }}>
              <h2>📚</h2>
              <h3>Online Book Store</h3>
            </div>
          </Link>
          <div className="d-flex align-items-center ms-auto">
            {/* Show user name if logged in */}
            {user?.name && <span className="me-3 fw-bold text-primary">Hi, {user.name}</span>}
            <Link className="btn btn-link" to="/">Home</Link>
            <Link className="btn btn-link" to="/login">Login</Link>
            <Link className="btn btn-link" to="/signup">Signup</Link>
            <Link className="btn btn-link" to="/contact">Contact</Link>
          </div>
        </div>
      </nav>
      {/* Subtle separator bar below navbar */}
      <div style={{ height: '4px', background: 'linear-gradient(to right, #b6d4fe, #e3f2fd)' }}></div>
    </>
  )
}


export default DefaultNavbar
    