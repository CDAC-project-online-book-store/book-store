import React from 'react';

const AddToCartButton = ({ onClick, disabled }) => (
  <button className="btn btn-outline-success" onClick={onClick} disabled={disabled}>
    Add to Cart
  </button>
);

export default AddToCartButton;
