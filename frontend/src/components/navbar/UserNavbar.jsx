import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaRegUserCircle } from 'react-icons/fa';

const UserNavbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  //get the user from localStorage
  useEffect(() => {
    const user = localStorage.getItem('user');
    setUser(JSON.parse(user));
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    // Redirect to home page after logout
    navigate('/');
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <div style={{ display: 'inline-flex', alignItems: 'center' }}>
              <h2>📚</h2>
              <h3>Online Book Store</h3>
            </div>
          </Link>
          <div className="d-flex align-items-center ms-auto">
            <span className="me-3 fw-bold text-primary">{user ? `Hi, ${user.userName || user.username}` : ''}</span>
            <Link className="btn btn-secondary" to="/user/dashboard"><FaRegUserCircle /> Dashboard</Link>
            <button className="btn btn-outline-danger ms-2" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default UserNavbar;
