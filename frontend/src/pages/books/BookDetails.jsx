import React, { useState } from 'react';

function BookDetails() {
  const [quantity, setQuantity] = useState(1);
  const [selectedRating, setSelectedRating] = useState(0);

  const handleStarClick = (index) => setSelectedRating(index + 1);

  return (
   <>
    <div className="container mt-4">
      <h2 className="mb-4 text-primary">Book Details</h2>

      {/* Main Book Info Card */}
      <div className="card p-4 shadow-sm mb-4">
        <div className="row">
          <div className="col-md-4 text-center mb-3 mb-md-0">
            <img
              src="https://m.media-amazon.com/images/I/81YOuOGFCJL.jpg"
              alt="Harry Potter Cover"
              className="img-fluid border rounded"
              style={{ maxHeight: '300px', objectFit: 'cover' }}
            />
          </div>
          <div className="col-md-8">
            <p><strong>Title:</strong> Harry Potter and the Sorcerer's Stone</p>
            <p><strong>Authors:</strong> J.K. Rowling</p>
            <p><strong>Price:</strong> ₹499</p>
            <p><strong>Category:</strong> Fantasy</p>
            <p><strong>Language:</strong> English</p>
            <p><strong>Published On:</strong> 1997-06-26</p>
            <div className="mt-2">
              <strong>Your Rating:</strong>
              <div>
                {[...Array(5)].map((_, idx) => (
                  <span
                    key={idx}
                    className={`fs-4 me-1 ${selectedRating > idx ? 'text-warning' : 'text-secondary'}`}
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleStarClick(idx)}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-4">
          <label className="form-label"><strong>Description:</strong></label>
          <p className="form-control" style={{ minHeight: '100px' }}>
            A young boy discovers he's a wizard and attends Hogwarts School of Witchcraft and Wizardry...
          </p>
        </div>

        {/* Action Buttons */}
        <div className="d-flex flex-wrap gap-2 mt-3 align-items-center">
          <button className="btn btn-primary">Buy Now</button>
          <input
            type="number"
            value={quantity}
            min="1"
            onChange={(e) => setQuantity(e.target.value)}
            className="form-control w-auto"
          />
          <button className="btn btn-outline-warning">Add to Wishlist</button>
          <button className="btn btn-outline-success">Add to Cart</button>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="card p-4 shadow-sm">
        <h4 className="mb-3">Reviews</h4>

        {/* Review 1 */}
        <div className="card mb-3">
          <div className="row g-0 align-items-center">
            <div className="col-md-2 text-center p-2">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="User Avatar"
                className="img-fluid rounded-circle"
                style={{ width: '60px', height: '60px', objectFit: 'cover' }}
              />
              <p className="mb-0 mt-1"><strong>John Doe</strong></p>
            </div>
            <div className="col-md-10 p-2">
              <p className="mb-1 text-warning">★★★★☆</p>
              <textarea
                className="form-control"
                defaultValue="Engaging and thrilling read!"
              />
            </div>
          </div>
        </div>

        {/* Review 2 */}
        <div className="card mb-3">
          <div className="row g-0 align-items-center">
            <div className="col-md-2 text-center p-2">
              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="User Avatar"
                className="img-fluid rounded-circle"
                style={{ width: '60px', height: '60px', objectFit: 'cover' }}
              />
              <p className="mb-0 mt-1"><strong>Jane Smith</strong></p>
            </div>
            <div className="col-md-10 p-2">
              <p className="mb-1 text-warning">★★★★★</p>
              <textarea
                className="form-control"
                defaultValue="Classic fantasy that never gets old."
              />
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}

export default BookDetails;
