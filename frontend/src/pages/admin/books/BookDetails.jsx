import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBookById } from '../../../services/adminBookService';
// This component is now common for all user roles

function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [coverUrl, setCoverUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getBookById(id)
      .then(res => {
        setBook(res.data);
        // Fetch cover from OpenLibrary if ISBN exists
        if (res.data.isbn) {
          // OpenLibrary cover API: https://covers.openlibrary.org/b/isbn/{isbn}-L.jpg
          setCoverUrl(`https://covers.openlibrary.org/b/isbn/${res.data.isbn}-L.jpg`);
        }
      })
      .catch(() => setError("Book not found!"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="container mt-4">Loading...</div>;
  if (error || !book) return <div className="container mt-4"><h4 className="text-danger">{error || "Book not found!"}</h4></div>;

  return (
    <div className="container mt-5">
      <div className="row g-4">
        <div className="col-md-5 d-flex flex-column align-items-center justify-content-center">
          <div className="border rounded p-3 bg-light w-100 text-center">
            <img
              src={coverUrl || book.coverImageUrl || '/assets/book covers/default.jpg'}
              alt={book.title}
              className="img-fluid mb-3 shadow"
              style={{ maxHeight: '350px', objectFit: 'contain' }}
              onError={e => { e.target.src = '/assets/book covers/default.jpg'; }}
            />
          </div>
        </div>
        <div className="col-md-7">
          <div className="bg-white border rounded p-4 shadow">
            <h2 className="mb-2 text-primary">{book.title}</h2>
            <div className="mb-2 text-muted">by {Array.isArray(book.authors) ? book.authors.join(', ') : book.author}</div>
            <div className="mb-3">
              <span className="badge bg-info me-2">{book.language}</span>
              <span className="badge bg-secondary me-2">{book.format}</span>
              <span className="badge bg-warning text-dark">{book.isActive ? 'Active' : 'Deleted'}</span>
            </div>
            <h4 className="text-success mb-3">₹{book.price}</h4>
            <div className="mb-3"><strong>Stock:</strong> {book.stockQuantity}</div>
            <div className="mb-3"><strong>ISBN:</strong> {book.isbn}</div>
            <div className="mb-3"><strong>Publisher:</strong> {book.publisher}</div>
            <div className="mb-3"><strong>Edition:</strong> {book.edition}</div>
            <div className="mb-3"><strong>Categories:</strong> {Array.isArray(book.categories) ? book.categories.join(', ') : book.category}</div>
            <div className="mb-3"><strong>Publication Date:</strong> {book.publicationDate}</div>
            <div className="mb-3"><strong>Rating:</strong> {book.rating}</div>
            <div className="mb-3"><strong>Description:</strong> {book.description}</div>
            <div className="d-flex mt-4">
              <button className="btn btn-outline-secondary me-2" onClick={() => navigate(-1)}>Back</button>
              {/* Add to Cart or Buy Now buttons for user role can be added here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;
