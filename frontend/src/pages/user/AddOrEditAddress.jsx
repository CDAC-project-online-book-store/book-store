import React, { useState, useEffect } from 'react'
import AddressForm from '../../components/AddressForm';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';

const AddOrEditAddress = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { index } = useParams();
    const [existing, setExisting] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const isEdit = typeof index !== 'undefined';
    
    useEffect(() => {
        if (isEdit && location.state?.addressId) {
            fetchAddress();
        }
    }, [isEdit, location.state?.addressId]);
    
    const fetchAddress = async () => {
        try {
            setLoading(true);
            const user = JSON.parse(localStorage.getItem('user'));
            const response = await api.get(`/addresses/get`, { params: { userId: user.id } });
            const address = response.data.find(addr => addr.id === parseInt(location.state.addressId));
            if (address) {
                setExisting({
                    fullName: address.name,
                    flat: address.addressLineOne,
                    area: address.addressLineTwo,
                    landmark: address.landMark,
                    city: address.city,
                    state: address.state,
                    phone: address.phoneNumber,
                    pincode: address.pinCode
                });
            }
        } catch (error) {
            console.error('Error fetching address:', error);
        } finally {
            setLoading(false);
        }
    };
    
    const handleSubmit = async (formData) => {
        const user = JSON.parse(localStorage.getItem('user'));
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
            if (isEdit && location.state?.addressId) {
                await api.put(`/addresses/edit`, payload, { params: { userId: user.id, addressId: location.state.addressId } });
            } else {
                await api.post(`/addresses/create`, payload, { params: { userId: user.id } });
            }
            const redirectTo = location.state?.redirectTo || '/user/addresses';
            const fromCheckout = location.state?.fromCheckout;
            
            // Show success message
            alert(isEdit ? 'Address updated successfully!' : 'Address added successfully!');
            
            navigate(redirectTo, { replace: true, state: fromCheckout ? { book: location.state.book, quantity: location.state.quantity, buyNow: location.state.buyNow } : undefined });
        } catch (err) {
            console.error('Error saving address:', err);
            const data = err?.response?.data;
            const msg = (typeof data === 'string') ? data : (data?.message || data?.error || err?.message || 'Failed to save address');
            alert(msg);
        }
    }

    if (loading) {
        return (
            <div className='container mt-5 mb-4'>
                <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-2">Loading address details...</p>
                </div>
            </div>
        );
    }

    return (
    <div className='container mt-5 mb-4'>
        <AddressForm mode={isEdit ? 'edit': 'add'} initialData={existing} onSubmit={handleSubmit}/>
        <button type='button' className='btn btn-secondary mt-3' onClick={() => navigate(-1)}>
        Back
        </button>
    </div>
  )
}

export default AddOrEditAddress;