import React, { useState } from "react";

function Reviews() {
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const [file, setFile] = useState(null);

  const handleRating = (rate) => {
    setRating(rate);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !review || rating === 0) {
      alert("Please fill in all required fields including rating.");
      return;
    }
    alert("Review submitted!");
    // Logic to handle data (e.g. API) goes here
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="card shadow p-4">
        <div className="d-flex align-items-center mb-4">
          <div className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
            👤
          </div>
          <span className="ms-3 fw-bold">Username</span>
        </div>

        <div className="row align-items-center mb-4">
          <div className="col-md-6">
            <div className="border p-3 text-center">
              <h5 className="mb-1">BOOK TITLE</h5>
              <small className="text-muted">Author</small>
            </div>
          </div>

          <div className="col-md-6">
            <p className="mb-2 fw-semibold">How was the item?</p>
            <div>
              {[1, 2, 3, 4, 5].map((i) => (
                <span
                  key={i}
                  style={{
                    cursor: "pointer",
                    fontSize: "1.5rem",
                    color: i <= rating ? "#ffc107" : "#ccc",
                    marginRight: "5px"
                  }}
                  onClick={() => handleRating(i)}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="reviewTitle" className="form-label">Review title <span className="text-danger">*</span></label>
            <input
              type="text"
              id="reviewTitle"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="e.g. Best read of the year"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="review" className="form-label">Write a review</label>
            <textarea
              id="review"
              className="form-control"
              rows="3"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              required
              placeholder="Share your experience"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="upload" className="form-label">Share a video or photo</label>
            <input
              type="file"
              id="upload"
              className="form-control"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">Submit Review</button>
        </form>
      </div>
    </div>
  );
}

export default Reviews;
