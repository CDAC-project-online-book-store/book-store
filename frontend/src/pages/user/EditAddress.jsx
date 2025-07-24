import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const EditAddress = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { address, index } = location.state || {};

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    pincode: '',
    flat: '',
    area: '',
    landmark: '',
    city: '',
    state: '',
  });

  useEffect(() => {
    if (address) {
      setFormData({ ...address });
    }
  }, [address]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedAddress = {
      ...formData,
      address: `${formData.flat}, ${formData.area}, ${formData.landmark}`,
    };

    const stored = JSON.parse(localStorage.getItem('addresses')) || [];
    stored[index] = updatedAddress;
    localStorage.setItem('addresses', JSON.stringify(stored));
    navigate('/address');
  };

  return (
    <div className="container mt-5 mb-4">
      <h3 className="mb-4 text-primary">Edit Address</h3>
      <form className="border p-4 rounded shadow bg-light" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            className="form-control"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Mobile Number</label>
          <input
            type="text"
            className="form-control"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Pincode</label>
          <input
            type="text"
            className="form-control"
            name="pincode"
            placeholder="6 digit pin code"
            value={formData.pincode}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Flat, House No., Building, Apartment</label>
          <input
            type="text"
            className="form-control"
            name="flat"
            value={formData.flat}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Area, Street, Sector, Village</label>
          <input
            type="text"
            className="form-control"
            name="area"
            value={formData.area}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Landmark (Optional)</label>
          <input
            type="text"
            className="form-control"
            name="landmark"
            value={formData.landmark}
            onChange={handleChange}
          />
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Town/City</label>
            <input
              type="text"
              className="form-control"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">State</label>
            <select
              className="form-select"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
            >
              <option value="">Choose a state</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Delhi">Delhi</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              {/* Add more if needed */}
            </select>
          </div>
        </div>

        <button type="submit" className="btn btn-success">Update Address</button>
      </form>
    </div>
  );
};

export default EditAddress;
