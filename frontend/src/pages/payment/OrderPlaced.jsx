import React from 'react';
import { useNavigate } from 'react-router-dom';

const OrderPlaced = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <div className="card p-5 text-center shadow-sm">
        <h3>Your Order is placed</h3>
        <button className="btn btn-primary mt-3" onClick={() => navigate('/user/order-history')}>Go to Order History</button>
      </div>
    </div>
  );
};

export default OrderPlaced;


