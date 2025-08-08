import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAdminBookById } from '../../../services/adminBookService';
import '../../../css/BookDetailsAdmin.css';

function AdminBookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [coverUrl, setCoverUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getAdminBookById(id)
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
  }, [id]);

  if (loading) return <div className="container mt-4">Loading...</div>;
  if (error || !book) return <div className="container mt-4"><h4 className="text-danger">{error || "Book not found!"}</h4></div>;

  // Summary values
  const totalCopies = Array.isArray(book.copies) ? book.copies.length : book.stockQuantity || 0;
  const availableCopies = Array.isArray(book.copies) ? book.copies.filter(c => c.status === 'AVAILABLE').length : book.stockQuantity || 0;
  const issuedCopies = Array.isArray(book.copies) ? book.copies.filter(c => c.status === 'ISSUED').length : 0;

  return (
    <div className="book-details-admin-bg">
      <div className="container">
        <div className="page-header row mb-4 align-items-stretch" style={{ display: 'flex' }}>
          <div className="col-md-4 d-flex flex-column justify-content-center">
            <div className="book-details">
              <h1>{book.title}</h1>
              <div className="author">by {Array.isArray(book.authors) ? book.authors.join(', ') : book.author}</div>
              <div className="meta mb-2">
                <strong>Book ID:</strong> #{book.id}<br />
                <strong>Subject:</strong> {book.category || (Array.isArray(book.categories) ? book.categories.join(', ') : '')}<br />
                <strong>ISBN:</strong> {book.isbn}
              </div>
              <div className="book-description mt-2 text-secondary">
                {book.description}
              </div>
              <div className="summary-cards-vertical d-flex flex-row gap-3 mt-4">
                <div className="summary-card mb-3">
                  <div className="summary-number">{totalCopies}</div>
                  <div className="summary-label">Total Copies</div>
                </div>
                <div className="summary-card mb-3">
                  <div className="summary-number available">{availableCopies}</div>
                  <div className="summary-label">Available</div>
                </div>
                <div className="summary-card mb-3">
                  <div className="summary-number issued">{book.soldCount || 0}</div>
                  <div className="summary-label">Copies Sold</div>
                </div>
                <div className="summary-card mb-3">
                  <div className="summary-number">₹{book.price}</div>
                  <div className="summary-label">Book Price</div>
                </div>
                <div className="summary-card mb-3" style={{ cursor: 'pointer' }} onClick={() => navigate(`/admin/books/edit/${book.id}`)}>
                  <div className="summary-number"><i className="bi bi-pencil-square" style={{ fontSize: '1.5rem' }}></i></div>
                  <div className="summary-label">Edit Book Info</div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 d-flex justify-content-center align-items-center">
            <div className="book-cover" style={{ minHeight: '220px' }}>
              <img
                src={coverUrl || book.coverImageUrl || '/assets/book covers/default.jpg'}
                alt={book.title}
                className="img-fluid rounded shadow"
                style={{ width: '420px', height: '520px', objectFit: 'cover', display: 'block', margin: '0 auto' }}
                onError={e => { e.target.src = '/assets/book covers/default.jpg'; }}
              />
            </div>
          </div>
        </div>

        <div className="buyers-section">
          <div className="section-header">
            <h2>Users Who Bought This Book</h2>
            <span>{Array.isArray(book.buyers) ? book.buyers.length : 0} users</span>
          </div>
          <div className="buyers-list">
            {Array.isArray(book.buyers) && book.buyers.length > 0 ? (
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>User Name</th>
                    <th>Email</th>
                    <th>Purchase Date</th>
                  </tr>
                </thead>
                <tbody>
                  {book.buyers.map((buyer, idx) => (
                    <tr key={buyer.id || idx}>
                      <td>{idx + 1}</td>
                      <td>{buyer.name || buyer.username || '-'}</td>
                      <td>{buyer.email || '-'}</td>
                      <td>{buyer.purchaseDate || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-muted">No users have bought this book yet.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminBookDetails;
