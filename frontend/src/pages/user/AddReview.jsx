import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { addReview, getUserReview, updateReview } from "../../services/reviewService";
import { getBookById } from "../../services/bookService";

function Reviews() {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [book, setBook] = useState(null);
  const navigate = useNavigate();
  const { state } = useLocation();
  const user = useMemo(() => JSON.parse(localStorage.getItem('user')), []);

  const bookId = state?.bookId;
  const isUpdate = !!state?.update;

  useEffect(() => {
    if (bookId) {
      getBookById(bookId).then(res => setBook(res.data)).catch(() => setBook(null));
      if (isUpdate && user?.id) {
        getUserReview(user.id, bookId).then(res => {
          setRating(res.data.rating);
          setReview(res.data.comments || "");
        }).catch(() => {});
      }
    }
  }, [bookId, isUpdate, user]);

  const handleRating = (rate) => {
    setRating(rate);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      alert("Please select a rating.");
      return;
    }
    try {
      const payload = { userId: user.userId, bookId, rating, comments: review };
      if (isUpdate) {
        await updateReview(payload);
      } else {
        await addReview(payload);
      }
      // redirect to book details page
      if (book?.isbn) {
        navigate(`/book/book-details/${book.isbn}`, { replace: true });
      } else {
        navigate(-1);
      }
    } catch (err) {
      const msg = err?.response?.data?.message || 'Failed to submit review';
      alert(msg);
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="card shadow p-4">
        <div className="d-flex align-items-center mb-4">
          <div className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
            👤
          </div>
          <span className="ms-3 fw-bold">{(user?.userName) || 'User'}</span>
        </div>

        <div className="row align-items-center mb-4">
          <div className="col-md-6">
            <div className="border p-3 text-center">
              <h5 className="mb-1">{book?.title || 'Book'}</h5>
              <small className="text-muted">{Array.isArray(book?.authors) ? book.authors.join(', ') : ''}</small>
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

          <button type="submit" className="btn btn-primary w-100">{isUpdate ? 'Update' : 'Submit'} Review</button>
        </form>
      </div>
    </div>
  );
}

export default Reviews;
