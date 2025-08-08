import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAdminBookById } from '../../services/adminBookService';
import { getBookByIsbn } from '../../services/publicBookService';
import AddToCartButton from '../../components/AddToCartButton';
import BuyNowButton from '../../components/BuyNowButton';
import { getUserRole } from '../../utils/getUserRole';

function BookDetails() {
  const { id, isbn } = useParams();
  const [book, setBook] = useState(null);
  const [coverUrl, setCoverUrl] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedRating, setSelectedRating] = useState(0);
  const navigate = useNavigate();
  const role = getUserRole();

  useEffect(() => {
    if (role === 'Admin' && id) {
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

  const handleStarClick = (index) => setSelectedRating(index + 1);
  const handleAddToCart = () => {
    // TODO: Call addToCart service
    alert('Added to cart!');
  };
  const handleBuyNow = () => {
    // TODO: Call buyNow service
    alert('Buy now!');
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
            {role === 'ADMIN' && <div className="mb-3"><strong>Stock:</strong> {book.stockQuantity}</div>}
            <div className="mb-3"><strong>ISBN:</strong> {book.isbn}</div>
            <div className="mb-3"><strong>Publisher:</strong> {book.publisher}</div>
            <div className="mb-3"><strong>Edition:</strong> {book.edition}</div>
            <div className="mb-3"><strong>Categories:</strong> {
              Array.isArray(book.categories)
                ? book.categories.map(c => typeof c === 'object' ? c.name : c).join(', ')
                : (typeof book.category === 'object' ? book.category.name : book.category)
            }</div>
            <div className="mb-3"><strong>Publication Date:</strong> {book.publicationDate}</div>
            <div className="mb-3"><strong>Rating:</strong> {book.rating}</div>
            <div className="mb-3"><strong>Description:</strong> {book.description}</div>
            <div className="d-flex mt-4 gap-2">
              <button className="btn btn-outline-secondary me-2" onClick={() => navigate(-1)}>Back</button>
              {(role === 'CUSTOMER' || role === 'UNREGISTERED') && <>
                <BuyNowButton onClick={handleBuyNow} />
                <AddToCartButton onClick={handleAddToCart} />
                <input type="number" value={quantity} min="1" onChange={e => setQuantity(e.target.value)} className="form-control w-auto ms-2" style={{ maxWidth: '80px' }} />
              </>}
            </div>
            <div className="mt-4">
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
      </div>
      {/* Reviews Section (static for now) */}
      <div className="card p-4 shadow-sm mt-4">
        <h4 className="mb-3">Reviews</h4>
        {/* Example reviews, replace with dynamic if needed */}
        <div className="card mb-3">
          <div className="row g-0 align-items-center">
            <div className="col-md-2 text-center p-2">
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User Avatar" className="img-fluid rounded-circle" style={{ width: '60px', height: '60px', objectFit: 'cover' }} />
              <p className="mb-0 mt-1"><strong>John Doe</strong></p>
            </div>
            <div className="col-md-10 p-2">
              <p className="mb-1 text-warning">★★★★☆</p>
              <textarea className="form-control" defaultValue="Engaging and thrilling read!" />
            </div>
          </div>
        </div>
        <div className="card mb-3">
          <div className="row g-0 align-items-center">
            <div className="col-md-2 text-center p-2">
              <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="User Avatar" className="img-fluid rounded-circle" style={{ width: '60px', height: '60px', objectFit: 'cover' }} />
              <p className="mb-0 mt-1"><strong>Jane Smith</strong></p>
            </div>
            <div className="col-md-10 p-2">
              <p className="mb-1 text-warning">★★★★★</p>
              <textarea className="form-control" defaultValue="Classic fantasy that never gets old." />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;
