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

  const handleRemove = (indexToRemove) => {
    const updated = addresses.filter((_, i) => i !== indexToRemove);
    setAddresses(updated);
    localStorage.setItem("addresses", JSON.stringify(updated));
  };

  return (
    <div className="container mt-5">
      <h3 className="mb-4 text-primary">Your Addresses</h3>
      <div className="row g-4">
        {/* Add Address Box */}
        <div className="col-md-4">
          <div
            className="card text-center border-dashed p-4 h-100 d-flex align-items-center justify-content-center"
            style={{ cursor: "pointer", border: "2px dashed #38a3a5", minHeight: "200px" }}
            onClick={handleAddClick}
          >
            <div style={{ fontSize: '2rem', color: '#38a3a5' }}>+</div>
            <div>Add Address</div>
          </div>
        </div>

        {/* Existing Address Cards */}
        {addresses.map((addr, index) => (
          <div className="col-md-4" key={index}>
            <div className="card shadow h-100 p-3">
              <div className="card-body">
                <h5 className="card-title text-success">{addr.fullName}</h5>
                <p className="card-text mb-1">{addr.flat}, {addr.area}, {addr.landmark}</p>
                <p className="card-text mb-1">{addr.city}, {addr.state} - {addr.pincode}</p>
                <p className="card-text">Phone: {addr.phone}</p>
                <div className="d-flex justify-content-between">
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => navigate('/edit-address', { state: { address: addr, index } })}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleRemove(index)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

export default Address;
