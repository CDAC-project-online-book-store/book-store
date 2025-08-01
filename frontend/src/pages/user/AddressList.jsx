import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AddressBox from '../../components/AddressBox';

const AddressList = () => {
  const navigate = useNavigate();
  const addresses = JSON.parse(localStorage.getItem('addresses')) || [];

  const handleDelete = (index) => {
    const confirmDelete = window.confirm('Delete this address?');
    if (confirmDelete) {
      const updated = [...addresses];
      updated.splice(index, 1);
      localStorage.setItem('addresses', JSON.stringify(updated));
      navigate(0); // refresh the list
    }
  };

  const handleAddClick = () => {
    navigate('/user/address');
  }

  return (
    <div className="container mt-5">
      <h3 className="text-primary mb-4">📦 Saved Addresses</h3>
      <div className="row g-4">
        {/* Add button  */}
        <AddressBox className="card h-100 shadow-sm border-2" title="Add New Address" onClickHandler={handleAddClick} />
        
        {/* Existing addresses */}
        {addresses.length === 0 ? (
          <p>No addresses saved yet.</p>
        ) : (
          addresses.map((addr, index) => (
            <div key={index} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100 shadow-sm border-2">
                <div className="card-body">
                  <h5 className="card-title">{addr.fullName}</h5>
                  <p className="card-text"><strong>Phone:</strong> {addr.phone}</p>
                  <p className="card-text"><strong>Address:</strong> {addr.address}</p>
                  <p className="card-text"><strong>Pincode:</strong> {addr.pincode}</p>
                  <p className="card-text"><strong>City:</strong> {addr.city}</p>
                  <p className="card-text"><strong>State:</strong> {addr.state}</p>
                </div>
                <div className="card-footer bg-white border-0 d-flex justify-content-between">
                  <Link to={`/user/address/${index}`} className="btn btn-outline-primary">✏️ Edit</Link>
                  <button onClick={() => handleDelete(index)} className="btn btn-outline-danger">🗑️ Delete</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AddressList;