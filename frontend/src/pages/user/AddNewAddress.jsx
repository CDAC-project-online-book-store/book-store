import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/AddNewAddress.css'; // Use the same CSS file as EditAddress

const AddNewAddress = () => {
  const navigate = useNavigate();
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newAddress = {
      ...formData,
      address: `${formData.flat}, ${formData.area}, ${formData.landmark}`,
    };

    const existing = JSON.parse(localStorage.getItem('addresses')) || [];
    localStorage.setItem('addresses', JSON.stringify([...existing, newAddress]));
    navigate('/address');
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Add New Address</h2>
      <form onSubmit={handleSubmit} className="form-body">
        <label>Full Name</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
        />

        <label>Mobile number</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <label>Pincode</label>
        <input
          type="text"
          name="pincode"
          value={formData.pincode}
          onChange={handleChange}
          placeholder="6 digit pin code"
          required
        />

        <label>Flat, House no., Building, Company, Apartment</label>
        <input
          type="text"
          name="flat"
          value={formData.flat}
          onChange={handleChange}
          required
        />

        <label>Area, Street, Sector, Village</label>
        <input
          type="text"
          name="area"
          value={formData.area}
          onChange={handleChange}
          required
        />

        <label>Landmark (Optional)</label>
        <input
          type="text"
          name="landmark"
          value={formData.landmark}
          onChange={handleChange}
        />

        <div className="row-group">
          <div>
            <label>Town/City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>State</label>
            <select name="state" value={formData.state} onChange={handleChange} required>
              <option value="">choose a state</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Delhi">Delhi</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              {/* Add more as needed */}
            </select>
          </div>
        </div>

        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
};

export default AddNewAddress;
