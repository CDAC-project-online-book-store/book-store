import React from 'react'
import AddressForm from '../../components/AddressForm';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';

const AddOrEditAddress = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { index } = useParams();
    const stored = JSON.parse(localStorage.getItem("addresses")) || [];
    
    const isEdit = typeof index !== 'undefined';
    const existing = isEdit ? stored[parseInt(index)] : null;
    
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
            const redirectTo = location.state?.redirectTo || '/payment/checkout';
            const fromCheckout = location.state?.fromCheckout;
            navigate(redirectTo, { replace: true, state: fromCheckout ? { book: location.state.book, quantity: location.state.quantity, buyNow: location.state.buyNow } : undefined });
        } catch (err) {
            const data = err?.response?.data;
            const msg = (typeof data === 'string') ? data : (data?.message || data?.error || err?.message || 'Failed to save address');
            alert(msg);
        }
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