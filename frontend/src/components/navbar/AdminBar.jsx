import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FcLibrary } from 'react-icons/fc';

const AdminBar = () => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')));

  useEffect(() => {
    const interval = setInterval(() => {
      setUser(JSON.parse(localStorage.getItem('user')));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <header style={{ background: '#faedcd', borderBottom: '2px solid #e9ecef', padding: '1rem 0', boxShadow: '0 2px 10px rgba(0,0,0,0.07)', position: 'sticky', top: 0, zIndex: 100 }}>
      <div className="container d-flex justify-content-between align-items-center">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link to="/admin/dashboard" className="btn btn-lg" style={{ fontSize: '2.5rem', lineHeight: 1 }}><FcLibrary size={40} /></Link>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#333' }}>Book Store Admin</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ background: '#333', color: '#fff', padding: '0.3rem 0.8rem', borderRadius: 15, fontSize: '0.8rem', fontWeight: 500, textTransform: 'uppercase' }}>Admin</span>
          <span>{user?.userName || user?.username || ''}</span>
          <Link to="/admin/profile" className="btn btn-outline-dark btn-sm">Profile</Link>
          <Link to="/" className="btn btn-outline-dark btn-sm" onClick={handleLogout}>Sign Out</Link>
        </div>
      </div>
    </header>
  );
};

export default AdminBar;
