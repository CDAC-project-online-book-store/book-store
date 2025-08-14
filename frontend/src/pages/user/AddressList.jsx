import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AddressBox from '../../components/AddressBox';
import api from '../../services/api';

const AddressList = () => {
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && user.userId) {
        console.log('Fetching addresses for user:', user.userId);
        console.log('API URL:', `${api.defaults.baseURL}addresses/get?userId=${user.userId}`);
        
        const response = await api.get('/addresses/get', { params: { userId: user.userId } });
        console.log('Addresses response:', response.data);
        setAddresses(response.data);
      } else {
        console.error('No user found in localStorage');
        alert('User not found. Please login again.');
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
      console.error('Error response:', error.response);
      console.error('Error status:', error.response?.status);
      console.error('Error data:', error.response?.data);
      
      if (error.code === 'ERR_NETWORK') {
        alert('Cannot connect to server. Please make sure the backend is running.');
      } else {
        alert('Failed to load addresses. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Listen for navigation events to refresh addresses
  useEffect(() => {
    const handleFocus = () => {
      fetchAddresses();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  const handleDelete = async (addressId) => {
    const confirmDelete = window.confirm('Delete this address?');
    if (confirmDelete) {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.userId) {
          alert('User not found. Please login again.');
          return;
        }
        
        console.log('Deleting address with ID:', addressId, 'for user:', user.userId);
        console.log('Delete URL:', `/addresses/${addressId}?userId=${user.userId}`);
        console.log('Full API URL:', `${api.defaults.baseURL}addresses/${addressId}?userId=${user.userId}`);
        
        // Make the delete request
        console.log('Making DELETE request...');
        const response = await api.delete(`/addresses/${addressId}?userId=${user.userId}`);
        console.log('Delete response status:', response.status);
        console.log('Delete response data:', response.data);
        console.log('Delete response headers:', response.headers);
        
        // Show success message
        alert('Address deleted successfully!');
        
        // Refresh the address list
        await fetchAddresses();
        
      } catch (error) {
        console.error('Error deleting address:', error);
        console.error('Error response:', error.response);
        console.error('Error status:', error.response?.status);
        console.error('Error data:', error.response?.data);
        
        let errorMessage = 'Failed to delete address';
        
        if (error.response?.status === 404) {
          errorMessage = 'Address not found';
        } else if (error.response?.status === 403) {
          errorMessage = 'You are not authorized to delete this address';
        } else if (error.response?.status === 500) {
          errorMessage = 'Server error occurred while deleting address';
        } else if (error.response?.data?.message) {
          errorMessage = error.response.data.message;
        } else if (error.message) {
          errorMessage = error.message;
        }
        
        alert(`Failed to delete address: ${errorMessage}`);
      }
    }
  };

  const handleAddClick = () => {
    navigate('/user/address');
  }

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading addresses...</p>
        </div>
      </div>
    );
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
          addresses.map((addr) => (
            <div key={addr.id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100 shadow-sm border-2">
                <div className="card-body">
                  <h5 className="card-title">{addr.name}</h5>
                  <p className="card-text"><strong>Phone:</strong> {addr.phoneNumber}</p>
                  <p className="card-text"><strong>Address:</strong> {addr.addressLineOne}, {addr.addressLineTwo}</p>
                  <p className="card-text"><strong>Landmark:</strong> {addr.landMark}</p>
                  <p className="card-text"><strong>Pincode:</strong> {addr.pinCode}</p>
                  <p className="card-text"><strong>City:</strong> {addr.city}</p>
                  <p className="card-text"><strong>State:</strong> {addr.state}</p>
                </div>
                <div className="card-footer bg-white border-0 d-flex justify-content-between">
                  <Link to={`/user/address/${addr.id}`} state={{ addressId: addr.id }} className="btn btn-outline-primary">✏️ Edit</Link>
                  <button onClick={() => handleDelete(addr.id)} className="btn btn-outline-danger">🗑️ Delete</button>
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