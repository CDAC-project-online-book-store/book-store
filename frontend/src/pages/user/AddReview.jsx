import React, { useState } from "react";
import "../../css/Reviews.css";

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
    // Example validation
    if (!title || !review || rating === 0) {
      alert("Please fill in all required fields including rating.");
      return;
    }
    alert("Review submitted!");
    // Logic to handle the data can go here
  };

  return (
    <div className="review-card">
      <div className="user-section">
        <div className="user-avatar">👤</div>
        <span className="username">Username</span>
      </div>

      <div className="book-section">
        <div className="book-thumbnail">
          <div className="book-title">BOOK<br />TITLE</div>
          <div className="book-author">Author</div>
        </div>

        <div className="rating-section">
          <p className="rating-question">How was the item?</p>
          <div className="stars">
            {[1, 2, 3, 4, 5].map((i) => (
              <span
                key={i}
                className={i <= rating ? "star filled" : "star"}
                onClick={() => handleRating(i)}
              >
                ★
              </span>
            ))}
          </div>
        </div>
      </div>

      <form className="review-form" onSubmit={handleSubmit}>
        <label htmlFor="reviewTitle">Review title (required)</label>
        <input
          type="text"
          id="reviewTitle"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label htmlFor="review">Write a review</label>
        <textarea
          id="review"
          rows="3"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          required
        />

        <label htmlFor="upload">Share a video or photo</label>
        <input
          type="file"
          id="upload"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Reviews;
