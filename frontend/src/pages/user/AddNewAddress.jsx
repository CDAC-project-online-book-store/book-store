import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../services/api';

const AddNewAddress = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [pincodeError, setPincodeError] = useState('');
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
    if (name === 'pincode')
      setPincodeError(''); // clear error on change
  };

  const handlePincodeBlur = async (e) => {
    const pincode = formData.pincode;
    if (pincode.length === 6) {
      try {
        const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
        const data = await response.json();
        const postOffice = data[0].PostOffice?.[0]; // grab the first post
        if (postOffice) {
          setFormData((prev) => ({
            ...prev,
            city: postOffice.District || prev.city,
            state: postOffice.State || prev.state,
          }));
          setPincodeError('');
        }
        else{
          setPincodeError('Invalid pincode. Please enter a valid 6-digit pincode.')
          setFormData ((prev) => ({
            ...prev,
            city:'',
            state:''
          }))
        }
      } catch (error) {
        console.error('Failed to fetch pincode details:', error);
        setPincodeError('Failed to fetch pincode details. please try again');
        setFormData((prev) => ({
          ...prev,
          city:'',
          state:''
        }));
      }
    }
    else if (pincode.length > 0) {
      setPincodeError('Pincode must be 6 digits.');
      setFormData((prev) => ({
          ...prev,
          city:'',
          state:''
        }));
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user?.id) {
      navigate('/login', { replace: true, state: { redirectTo: state?.redirectTo || '/payment/checkout' } });
      return;
    }
    const payload = {
      name: formData.fullName,
      addressLineOne: formData.flat,
      addressLineTwo: formData.area,
      landMark: formData.landmark,
      city: formData.city,
      state: formData.state,
      phoneNumber: formData.phone,
      pinCode: formData.pincode,
      label: 'HOME'
    };
    try {
      await api.post(`/addresses/create`, payload, { params: { userId: user?.id } });
      const redirect = state?.redirectTo || '/payment/checkout';
      // if returning to checkout, go back to checkout
      navigate(redirect, { replace: true, state: state?.fromCheckout ? { book: state.book, quantity: state.quantity } : undefined });
    } catch (err) {
      console.error('Save address error:', err?.response || err);
      const msg = err?.response?.data?.message || err?.response?.data?.error || 'Failed to save address';
      alert(msg);
    }
  };

  return (
    <div className="container mt-5 mb-4">
      <h3 className="mb-4 text-primary">Add New Address</h3>
      <form className="border p-4 rounded shadow bg-light" onSubmit={handleSubmit}>
        <div className="mb-3">
          {/* Full name */}
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
        {/* Mobile number */}
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
        {/* Pincode */}
        <div className="mb-3">
          <label className="form-label">Pincode</label>
          <input
            type="number"
            className={`form-control ${pincodeError ? 'is-invalid' : ''}`}
            name="pincode"
            placeholder="6 digit pin code"
            value={formData.pincode}
            onChange={handleChange}
            onBlur={handlePincodeBlur}
            required
            min='100000'
            max='999999'
          />
          {pincodeError && (
            <div className='invalid-feedback' style={{display: 'block'}}>
              {pincodeError}
            </div>)}
        </div>
        {/* Flat/house number */}
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
        {/* Area,street */}
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
            <input
              type="text"
              className="form-control"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Save Address</button>
        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </form>
    </div>
  );
};

export default AddNewAddress;
