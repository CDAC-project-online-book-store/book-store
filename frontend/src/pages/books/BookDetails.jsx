import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAdminBookById } from '../../services/adminBookService';
import { getBookByIsbn } from '../../services/publicBookService';
import { getAverageRating, getReviewsForBook } from '../../services/reviewService';
import BuyNowButton from '../../components/BuyNowButton';
import { getUserRole } from '../../utils/getUserRole';

function BookDetails() {
  const { id, isbn } = useParams();
  const [book, setBook] = useState(null);
  const [coverUrl, setCoverUrl] = useState("");
  // Quantity control removed; default buy quantity is 1
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedRating, setSelectedRating] = useState(0); // no longer used for display; kept for potential future UX
  const [averageRating, setAverageRating] = useState(null);
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();
  const role = getUserRole();

  useEffect(() => {
    if (role?.toLowerCase() === 'admin' && id) {
      getAdminBookById(id)
        .then(res => {
          setBook(res.data);
          if (res.data.isbn) setCoverUrl(`https://covers.openlibrary.org/b/isbn/${res.data.isbn}-L.jpg`);
        })
        .catch(() => setError('Book not found!'))
        .finally(() => setLoading(false));
    } else if (role !== 'Admin' && isbn) {
      getBookByIsbn(isbn)
        .then(res => {
          setBook(res.data);
          if (res.data.isbn) setCoverUrl(`https://covers.openlibrary.org/b/isbn/${res.data.isbn}-L.jpg`);
        })
        .catch(() => setError('Book not found!'))
        .finally(() => setLoading(false));
    } else {
      setError('Book not found!');
      setLoading(false);
    }
  }, [id, isbn, role]);

  useEffect(() => {
    if (book?.id) {
      getAverageRating(book.id).then(r => setAverageRating(r.data ?? 0)).catch(() => setAverageRating(0));
      getReviewsForBook(book.id).then(r => setReviews(r.data || [])).catch(() => setReviews([]));
    }
  }, [book?.id]);

  const handleStarClick = (index) => setSelectedRating(index + 1);
  const handleBuyNow = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const user = JSON.parse(localStorage.getItem('user'));
    const roleLower = (user?.role || 'UNREGISTERED').toLowerCase();
    if (!isLoggedIn || roleLower !== 'customer') {
      navigate('/login', { replace: true, state: { redirectTo: `/payment/checkout`, buyNow: { isbn: book.isbn, quantity: Number(quantity) } } });
      return;
    }
    // navigate to checkout with book info; default quantity = 1
    navigate('/payment/checkout', { state: { book, quantity: 1, buyNow: { isbn: book.isbn, quantity: 1 } } });
  };

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
            <div className="mb-2 text-muted">
              by {Array.isArray(book.authors)
                ? book.authors.map(a => typeof a === 'object' ? a.author || a.name : a).join(', ')
                : (typeof book.author === 'object' ? book.author.author || book.author.name : book.author)}
            </div>
            <div className="mb-3">
              <span className="badge bg-info me-2">{book.language}</span>
              <span className="badge bg-secondary me-2">{book.format}</span>
              <span className="badge bg-warning text-dark">{book.isActive ? 'Active' : 'Deleted'}</span>
            </div>
            <h4 className="text-success mb-3">₹{book.price}</h4>
            {role?.toLowerCase() === 'admin' && <div className="mb-3"><strong>Stock:</strong> {book.stockQuantity}</div>}
            <div className="mb-3"><strong>ISBN:</strong> {book.isbn}</div>
            <div className="mb-3"><strong>Publisher:</strong> {book.publisher}</div>
            <div className="mb-3"><strong>Edition:</strong> {book.edition}</div>
            <div className="mb-3"><strong>Categories:</strong> {
              Array.isArray(book.categories)
                ? book.categories.map(c => typeof c === 'object' ? c.name : c).join(', ')
                : (typeof book.category === 'object' ? book.category.name : book.category)
            }</div>
            <div className="mb-3"><strong>Publication Date:</strong> {book.publicationDate}</div>
            <div className="mb-3"><strong>Rating:</strong> {averageRating ?? book.rating ?? 0}</div>
            <div className="mb-3"><strong>Description:</strong> {book.description}</div>
            <div className="d-flex mt-4 gap-2">
              <button className="btn btn-outline-secondary me-2" onClick={() => navigate(-1)}>Back</button>
              {(role?.toLowerCase() === 'customer' || role?.toLowerCase() === 'unregistered') && <>
                <BuyNowButton onClick={handleBuyNow} />
              </>}
            </div>
            <div className="mt-4">
              <strong>Rating:</strong> {typeof averageRating === 'number' ? averageRating.toFixed(1) : (book.rating ?? 0)}
              <div aria-label={`Average rating ${typeof averageRating === 'number' ? averageRating.toFixed(1) : (book.rating ?? 0)} out of 5`}>
                <div style={{ position: 'relative', display: 'inline-block', lineHeight: 1 }}>
                  <div style={{ color: '#ccc' }}>★★★★★</div>
                  <div
                    style={{
                      color: '#ffc107',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: `${Math.min(Math.max(((Number(averageRating ?? book.rating ?? 0) / 5) * 100), 0), 100)}%`,
                      overflow: 'hidden',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    ★★★★★
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card p-4 shadow-sm mt-4">
        <h4 className="mb-3">Reviews</h4>
        {reviews.length === 0 && <div className="text-muted">No reviews yet.</div>}
        {reviews.map(r => (
          <div key={r.id} className="card mb-3">
            <div className="row g-0 align-items-center">
              <div className="col-md-2 text-center p-2">
                <div className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px' }}>{(r.userName || 'U').slice(0,1).toUpperCase()}</div>
                <p className="mb-0 mt-1"><strong>{r.userName}</strong></p>
              </div>
              <div className="col-md-10 p-2">
                <p className="mb-1 text-warning">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</p>
                <div className="form-control-plaintext">{r.comments}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookDetails;
