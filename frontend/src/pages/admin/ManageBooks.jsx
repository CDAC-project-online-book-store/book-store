import React, { useEffect, useState } from 'react';
import '../../css/ManageBooks.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getBooks, getAllBooksIncludingInactive, deleteBook } from '../../services/adminBookService';


function ManageBooks() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchField, setSearchField] = useState("title");
  const [filterPrice, setFilterPrice] = useState("");
  const [filterLanguage, setFilterLanguage] = useState("");
  // Removed rack filter
  const [showOutOfStock, setShowOutOfStock] = useState(false);
  const [showSoftDeleted, setShowSoftDeleted] = useState(false);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const fetchBooks = showSoftDeleted ? getAllBooksIncludingInactive : getBooks;
    fetchBooks()
      .then(res => setBooks(res.data))
      .catch(err => setError("Failed to fetch books."))
      .finally(() => setLoading(false));
  }, [showSoftDeleted]);

  // function to delete a book
  const OnClickDelete = (bookId, bookTitle) => {
    const confirmed = window.confirm(`Are you sure you want to delete "${bookTitle}"?`);
    if (confirmed) {
      setLoading(true);
      deleteBook(bookId)
        .then(() => {
          setBooks(prev => prev.filter(b => b.id !== bookId));
          alert(`Book "${bookTitle}" deleted successfully!`);
        })
        .catch(() => setError("Failed to delete book."))
        .finally(() => setLoading(false));
    }
  };

  // Filter and search logic
  let filteredBooks = books;
  if (searchQuery.trim() !== "") {
    filteredBooks = filteredBooks.filter((book) => {
      const value = (book[searchField] || "").toString().toLowerCase();
      return value.includes(searchQuery.toLowerCase());
    });
  }
  if (filterLanguage) {
    filteredBooks = filteredBooks.filter((book) => (book.language || "").toLowerCase() === filterLanguage.toLowerCase());
  }
  
  // Out of stock filter: checked means show out of stock, unchecked means hide out of stock
  if (!showOutOfStock) {
    filteredBooks = filteredBooks.filter(book => book.stockQuantity > 0);
  } else {
    filteredBooks = filteredBooks.filter(book => book.stockQuantity === 0);
  }
  // Soft deleted filter: checked means show soft deleted, unchecked means hide soft deleted
  if (!showSoftDeleted) {
    filteredBooks = filteredBooks.filter(book => book.isActive !== false && book.isActive !== 0);
  } else {
    filteredBooks = filteredBooks.filter(book => book.isActive === false || book.isActive === 0);
  }
  if (filterPrice === "high-to-low") {
    filteredBooks = [...filteredBooks].sort((a, b) => b.price - a.price);
  } else if (filterPrice === "low-to-high") {
    filteredBooks = [...filteredBooks].sort((a, b) => a.price - b.price);
  }

  // Pagination logic
  const totalBooks = filteredBooks.length;
  const totalPages = Math.ceil(totalBooks / pageSize);
  const paginatedBooks = filteredBooks.slice((currentPage - 1) * pageSize, currentPage * pageSize);


  // Inventory summary
  const totalCopies = books.reduce((sum, b) => sum + (b.stockQuantity || 0), 0);
  const availableCopies = books.filter(b => b.stockQuantity > 0).reduce((sum, b) => sum + b.stockQuantity, 0);
  const issuedCopies = books.filter(b => b.stockQuantity === 0).length;
  // Calculate total sold (assuming book.soldCount exists)
  const totalSold = books.reduce((sum, b) => sum + (b.soldCount || 0), 0);

  return (
    <div className="manage-books-bg">
      <div className="container py-4">
        <header className="mb-4">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="fw-bold text-primary">Books Catalog</h2>
            <div className="d-flex gap-2">
              <Link to="/admin/dashboard" className="btn btn-outline-secondary">← Back to Dashboard</Link>
              <Link to="/admin/books/add">
                <button className="btn btn-primary">+ Add New Book</button>
              </Link>
            </div>
          </div>
        </header>
        {/* Inventory summary cards */}
        <div className="row inventory-summary mb-4">
          <div className="col-md-3 col-6 mb-3">
            <div className="summary-card p-3 text-center shadow-sm rounded bg-white">
              <div className="summary-number fs-2 fw-bold">{books.length}</div>
              <div className="summary-label text-uppercase">Total Books</div>
            </div>
          </div>
          <div className="col-md-3 col-6 mb-3">
            <div className="summary-card p-3 text-center shadow-sm rounded bg-white">
              <div className="summary-number fs-2 fw-bold">{totalCopies}</div>
              <div className="summary-label text-uppercase">Total Copies</div>
            </div>
          </div>
          <div className="col-md-3 col-6 mb-3">
            <div className="summary-card p-3 text-center shadow-sm rounded bg-white">
              <div className="summary-number fs-2 fw-bold text-success">{availableCopies}</div>
              <div className="summary-label text-uppercase">Available</div>
            </div>
          </div>
          <div className="col-md-3 col-6 mb-3">
            <div className="summary-card p-3 text-center shadow-sm rounded bg-white">
              <div className="summary-number fs-2 fw-bold text-info">{totalSold}</div>
              <div className="summary-label text-uppercase">Total Sold</div>
            </div>
          </div>
        </div>

        {/* Filters section */}
        <div className="filters-section mb-4 p-4 rounded bg-white shadow-sm">
          <div className="row filters-grid">
            <div className="col-md-4 mb-3">
              <label htmlFor="searchQuery" className="fw-semibold">Search Books</label>
              <input
                type="text"
                id="searchQuery"
                className="form-control"
                placeholder={`Title, author, or ISBN...`}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="col-md-3 mb-3">
              <label htmlFor="searchField" className="fw-semibold">Search Field</label>
              <select className="form-select" value={searchField} onChange={e => setSearchField(e.target.value)}>
                <option value="title">Title</option>
                <option value="author">Author</option>
                <option value="isbn">ISBN</option>
                <option value="category">Category</option>
                <option value="language">Language</option>
              </select>
            </div>
            <div className="col-md-3 mb-3">
              <label htmlFor="filterPrice" className="fw-semibold">Sort by Price</label>
              <select className="form-select" value={filterPrice} onChange={e => setFilterPrice(e.target.value)}>
                <option value="">Sort by Price</option>
                <option value="low-to-high">Low to High</option>
                <option value="high-to-low">High to Low</option>
              </select>
            </div>
            <div className="col-md-2 mb-3">
              <label htmlFor="filterLanguage" className="fw-semibold">Language</label>
              <select className="form-select" value={filterLanguage} onChange={e => setFilterLanguage(e.target.value)}>
                <option value="">All Languages</option>
                {[...new Set(books.map(b => b.language).filter(Boolean))].map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>
            <div className="col-md-2 mb-3 d-flex align-items-end">
              <input
                type="checkbox"
                checked={showOutOfStock}
                onChange={e => setShowOutOfStock(e.target.checked)}
                id="outOfStock"
              />
              <label htmlFor="outOfStock" className="ms-2">Show Out of Stock</label>
            </div>
            <div className="col-md-2 mb-3 d-flex align-items-end">
              <input
                type="checkbox"
                checked={showSoftDeleted}
                onChange={e => setShowSoftDeleted(e.target.checked)}
                id="softDeleted"
              />
              <label htmlFor="softDeleted" className="ms-2">Show Soft Deleted</label>
            </div>
          </div>
        </div>

        {/* Books table section */}
        <div className="books-section bg-white rounded shadow-sm mb-4">
          <div className="section-header d-flex justify-content-between align-items-center">
            <h4 className="mb-0">Book List</h4>
            <span className="results-info">Showing {paginatedBooks.length} of {totalBooks} books</span>
          </div>
          <div className="table-responsive">
            <table className="table table-striped align-middle">
              <thead className="table-light">
                <tr>
                  <th>ISBN</th>
                  <th>Title</th>
                  <th>Author(s)</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Published On</th>
                  <th>Quantity</th>
                  <th>Total Sold</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedBooks.map((book) => (
                  <tr key={book.id || book.isbn}>
                    <td>{book.isbn}</td>
                    <td>{book.title}</td>
                    <td>{Array.isArray(book.authors) ? book.authors.join(', ') : book.author}</td>
                    <td>{Array.isArray(book.categories) ? book.categories.join(', ') : book.category}</td>
                    <td>₹{book.price}</td>
                    <td>{book.publicationDate || book.publication_date}</td>
                    <td>{book.stockQuantity}</td>
                    <td>{book.soldCount || 0}</td>
                    <td>{book.isActive ? 'Active' : 'Deleted'}</td>
                    <td>
                      <Link to={`/admin/books/details/${book.id}`}>
                        <button className="btn btn-sm btn-info me-2">View</button>
                      </Link>
                      <Link to={`/admin/books/edit/${book.id}`}>
                        <button className="btn btn-sm btn-warning me-2">Edit</button>
                      </Link>
                      <button className="btn btn-sm btn-danger" onClick={() => OnClickDelete(book.id, book.title)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination controls */}
          <div className="pagination d-flex justify-content-between align-items-center p-3 border-top">
            <div className="pagination-info">Page {currentPage} of {totalPages}</div>
            <div className="pagination-controls">
              <button className="page-btn btn btn-outline-secondary me-2" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
              {[...Array(totalPages)].map((_, idx) => (
                <button
                  key={idx + 1}
                  className={`page-btn btn ${currentPage === idx + 1 ? 'btn-dark' : 'btn-outline-secondary'} mx-1`}
                  onClick={() => setCurrentPage(idx + 1)}
                >
                  {idx + 1}
                </button>
              ))}
              <button className="page-btn btn btn-outline-secondary ms-2" disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
            </div>
          </div>
        </div>
        {error && <div className="alert alert-danger mt-3">{error}</div>}
        {loading && <div>Loading...</div>}
      </div>
    </div>
  )
}

export default ManageBooks
