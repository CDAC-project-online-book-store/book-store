import React from 'react'
import AddressForm from '../../components/AddressForm';
import { useNavigate, useParams } from 'react-router-dom';

const AddOrEditAddress = () => {
    const navigate = useNavigate();
    const { index } = useParams();
    const stored = JSON.parse(localStorage.getItem("addresses")) || [];
    
    const isEdit = typeof index !== 'undefined';
    const existing = isEdit ? stored[parseInt(index)] : null;
    
    const handleSubmit = (formData) => {
        const updated = {
            ...formData,
            address: `${formData.flat}, ${formData.area}, ${formData.landmark}`,
        };
        if (isEdit){
            stored[parseInt(index)] = updated;
        }
        else {
            stored.push(updated);
        }
        localStorage.setItem('addresses',JSON.stringify(stored));
        navigate('/user/addresses');

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