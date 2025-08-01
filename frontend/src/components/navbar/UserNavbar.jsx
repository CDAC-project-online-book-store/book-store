import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserNavbar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setShowSidebar(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);
const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  }
  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-3">
        {/* Sidebar Toggle Button */}
        <button className="btn btn-light me-2" onClick={() => setShowSidebar(true)}>
          <i className="bi bi-list"></i>
        </button>

        {/* Search Bar */}
        <form className="d-flex flex-grow-1 mx-3">
          <input className="form-control me-2" type="search" placeholder="Search" />
          <button className="btn btn-light" type="submit">
            <i className="bi bi-search"></i>
          </button>
        </form>

        
        {/* Dashboard Button (Cart Icon) */}
        <button className="btn btn-light">
          <i className="bi bi-cart"></i>
        </button>
      </nav>

      {/* Sidebar */}
      <div
        className={`position-fixed top-0 start-0 bg-white border-end h-100 p-3`}
        style={{
          width: '250px',
          zIndex: 1045,
          transform: showSidebar ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease-in-out',
        }}
      >
        <div className="d-flex align-items-center mb-3">
          <i className="bi bi-person-fill me-2"></i>
          <strong>Dashboard</strong>
        </div>
        <ul className="nav flex-column">
          <li className="nav-item"><a className="nav-link" href="#home">Home</a></li>
          <li className="nav-item"><a className="nav-link" href="#wishlist">Your Wishlist</a></li>
          <li className="nav-item"><a className="nav-link" href="#orders">Your Orders</a></li>
          <li className="nav-item"><a className="nav-link" onClick={handleLogout} href="/">Sign out</a></li>
        </ul>
      </div>

      {/* Overlay */}
      {showSidebar && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', zIndex: 1040 }}
          onClick={() => setShowSidebar(false)}
        ></div>
      )}
    </>
  );
};

export default UserNavbar;
