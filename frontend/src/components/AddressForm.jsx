import React, { useState, useEffect, use } from 'react';

const AddressForm = ({ initialData = {}, onSubmit, mode = 'add' }) => {
  // const { index } = useParams(); // Get the index from the URL
  // const addresses = JSON.parse(localStorage.getItem('addresses')) || [];

  // //if index exists, preload form data for editing 
  // const existingData = index !== undefined ? addresses[index] : {
  //     fullName: '',
  //     phone:'',
  //     pincode:'',
  //     flat:'',
  //     area:'',
  //     landmark:'',
  //     city:'',
  //     state:''

  // };


  const [pincodeError, setPincodeError] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    pincode: '',
    flat: '',
    area: '',
    landmark: '',
    city: '',
    state: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({ ...prev, ...initialData }));
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === 'pincode') setPincodeError('');
  };

  const handlePincodeBlur = async () => {
    const { pincode } = formData;
    if (pincode.length === 6) {
      try {
        const res = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
        const data = await res.json();
        const postOffice = data[0].PostOffice?.[0];
        if (postOffice) {
          setFormData((prev) => ({
            ...prev,
            city: postOffice.District || '',
            state: postOffice.State || '',
          }));
          setPincodeError('');
        } else {
          setPincodeError('Invalid pincode. Please enter a valid 6-digit pincode.');
          setFormData((prev) => ({ ...prev, city: '', state: '' }));
        }
      } catch (err) {
        console.error('Pincode fetch error:', err);
        setPincodeError('Failed to fetch pincode details. Please try again.');
        setFormData((prev) => ({ ...prev, city: '', state: '' }));
      }
    } else if (pincode.length > 0) {
      setPincodeError('Pincode must be 6 digits.');
      setFormData((prev) => ({ ...prev, city: '', state: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="border p-4 rounded shadow bg-light" onSubmit={handleSubmit}>
      <h4 className="mb-4 text-primary">{mode === 'edit' ? 'Edit Address' : 'Add New Address'}</h4>

      <input name="fullName" className="form-control mb-2" value={formData.fullName} onChange={handleChange} placeholder="Full Name" required />
      <input
        name="phone"
        className="form-control mb-2"
        value={formData.phone}
        onChange={(e) => {
          // Strip non-digits and limit to 10
          const onlyDigits = e.target.value.replace(/\D/g, '').slice(0, 10);
          handleChange({ target: { name: 'phone', value: onlyDigits } });
        }}
        placeholder="Mobile Number"
        required
        inputMode="numeric"
        maxLength={10}
      />
      <input
        type="number"
        name="pincode"
        className={`form-control mb-2 ${pincodeError ? 'is-invalid' : ''}`}
        placeholder="Pincode"
        value={formData.pincode}
        onChange={handleChange}
        onBlur={handlePincodeBlur}
        min="100000"
        max="999999"
        required
      />
      {pincodeError && <div className="invalid-feedback" style={{ display: 'block' }}>{pincodeError}</div>}

      <input name="flat" className="form-control mb-2" value={formData.flat} onChange={handleChange} placeholder="Flat/House No." required />
      <input name="area" className="form-control mb-2" value={formData.area} onChange={handleChange} placeholder="Area/Street/Sector" required />
      <input name="landmark" className="form-control mb-2" value={formData.landmark} onChange={handleChange} placeholder="Landmark (Optional)" />
      <input name="city" className="form-control mb-2" value={formData.city} onChange={handleChange} placeholder="City" required />
      <input name="state" className="form-control mb-2" value={formData.state} onChange={handleChange} placeholder="State" required />

      <button type="submit" className="btn btn-primary">{mode === 'edit' ? 'Update Address' : 'Save Address'}</button>
    </form>
  );
};

export default AddressForm;