import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getBooks, getAllBooksIncludingInactive, deleteBook } from '../../services/adminBookService';


function ManageBooks() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchField, setSearchField] = useState("title");
  const [filterPrice, setFilterPrice] = useState("");
  const [filterLanguage, setFilterLanguage] = useState("");
  const [showOutOfStock, setShowOutOfStock] = useState(false);
  const [showSoftDeleted, setShowSoftDeleted] = useState(false);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
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

  const OnClickDashboard = () => {
    navigate('/admin/dashboard');
  };

  return (
    <div>
      <div className="container mt-4">
        <h2>Manage Books</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        {loading && <div>Loading...</div>}
        {/* Search and filter bar */}
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 gap-2">
          <div className='mb-3 p-2'>
            <select className="form-select" value={searchField} onChange={e => setSearchField(e.target.value)}>
              <option value="title">Title</option>
              <option value="author">Author</option>
              <option value="isbn">ISBN</option>
              <option value="category">Category</option>
              <option value="language">Language</option>
            </select>
          </div>
          <div className='mb-3 flex-grow-1 p-2'>
            <input
              type="text"
              className="form-control"
              placeholder={`Search by ${searchField}`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className='mb-3 p-2'>
            <select className="form-select" value={filterPrice} onChange={e => setFilterPrice(e.target.value)}>
              <option value="">Sort by Price</option>
              <option value="low-to-high">Low to High</option>
              <option value="high-to-low">High to Low</option>
            </select>
          </div>
          <div className='mb-3 p-2'>
            <select className="form-select" value={filterLanguage} onChange={e => setFilterLanguage(e.target.value)}>
              <option value="">Filter by Language</option>
              {/* Dynamically generate language options from books */}
              {[...new Set(books.map(b => b.language).filter(Boolean))].map(lang => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>
          <div className='mb-3 p-2'>
            <input
              type="checkbox"
              checked={showOutOfStock}
              onChange={e => setShowOutOfStock(e.target.checked)}
              id="outOfStock"
            />
            <label htmlFor="outOfStock" className="ms-2">Show Out of Stock</label>
          </div>
          <div className='mb-3 p-2'>
            <input
              type="checkbox"
              checked={showSoftDeleted}
              onChange={e => setShowSoftDeleted(e.target.checked)}
              id="softDeleted"
            />
            <label htmlFor="softDeleted" className="ms-2">Show Soft Deleted</label>
          </div>
          <div className='mb-3 p-2'>
            <Link to={`/admin/books/add`}  >
              <button className="btn btn-primary" >Add new Book</button>
            </Link>
          </div>
          <div className="mb-3 p-2">
            <button className="btn btn-secondary" onClick={OnClickDashboard}>
              Dashboard
            </button>
          </div>
        </div>

        {/* Book table */}
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ISBN</th>
              <th>Title</th>
              <th>Author(s)</th>
              <th>Category</th>
              <th>Price</th>
              <th>Published On</th>
              <th>Quantity</th>
              <th>isActive</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.map((book) => (
              <tr key={book.id || book.isbn}>
                <td>{book.isbn}</td>
                <td>{book.title}</td>
                <td>{Array.isArray(book.authors) ? book.authors.join(', ') : book.author}</td>
                <td>{Array.isArray(book.categories) ? book.categories.join(', ') : book.category}</td>
                <td>₹{book.price}</td>
                <td>{book.publicationDate || book.publication_date}</td>
                <td>{book.stockQuantity}</td>
                <td>{book.isActive ? 'Active' : 'Deleted'}</td>
                <td>
                  <Link to={`/admin/books/details/${book.id}`}>
                    <button className="btn btn-sm btn-info me-2">View Details</button>
                  </Link>
                  <Link to={`/admin/books/edit/${book.id}`}  >
                    <button className="btn btn-sm btn-warning me-2">Edit</button>
                  </Link>
                  <button className="btn btn-sm btn-danger" onClick={() => OnClickDelete(book.id, book.title)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ManageBooks
