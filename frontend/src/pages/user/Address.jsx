import '../../css/Address.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Address() {
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("addresses")) || [];
    setAddresses(stored);
  }, []);

  const handleAddClick = () => {
    navigate('/add-new-address');
  };

  return (
    <div className="address-page">
      <h2 className="address-heading">Your Addresses</h2>
      <div className="address-list">
        <div className="add-address-box" onClick={handleAddClick}>
          <div style={{ fontSize: '2rem' }}>+</div>
          <div>Add Address</div>
        </div>

        {addresses.map((addr, index) => (
          <div key={index} className="address-card">
            <div><strong>{addr.fullName}</strong></div>
            <div>{addr.address}</div>
            <div>State: {addr.state}</div>
            <div>Pincode: {addr.pincode}</div>
            <div>City: {addr.city}</div>
            <div>Phone No: {addr.phone}</div>
            <button onClick={() => navigate('/edit-address', { state: { address: addr, index } })}>Edit</button>
            <button>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Address;
