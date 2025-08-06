import React from 'react';

const BuyNowButton = ({ onClick, disabled }) => (
  <button className="btn btn-primary" onClick={onClick} disabled={disabled}>
    Buy Now
  </button>
);

export default BuyNowButton;
