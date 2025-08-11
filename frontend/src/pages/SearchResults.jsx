
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BookCard from '../components/BookCard';
import { searchBooks } from '../services/bookService';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchResults = () => {
  const query = useQuery();
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Get initial search params from URL
  const [searchTerm, setSearchTerm] = useState(query.get('search') || "");
  const [category, setCategory] = useState(query.get('category') || "");
  const [author, setAuthor] = useState(query.get('author') || "");
  const [priceMin, setPriceMin] = useState(query.get('priceMin') || "");
  const [priceMax, setPriceMax] = useState(query.get('priceMax') || "");

  // Load all books in background on mount
  useEffect(() => {
    setLoading(true);
    setError("");
    searchBooks({})
      .then(res => setBooks(Array.isArray(res.data) ? res.data : []))
      .catch(() => setError("Failed to fetch books."))
      .finally(() => setLoading(false));
  }, []);

  // State for filtered results
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searched, setSearched] = useState(false);

  // Show all books by default
  useEffect(() => {
    if (!searched && books.length > 0) {
      setFilteredBooks(books);
    }
  }, [books, searched]);

  // Extract unique categories and authors from books
  const categories = Array.from(new Set(books.flatMap(b => b.categories || [])));
  const authors = Array.from(new Set(books.flatMap(b => b.authors || [])));

  const handleSearch = (e) => {
    e.preventDefault();
    let results = books;
    if (searchTerm) {
      results = results.filter(book => book.title && book.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (category) {
      results = results.filter(book => Array.isArray(book.categories) && book.categories.includes(category));
    }
    if (author) {
      results = results.filter(book => Array.isArray(book.authors) && book.authors.includes(author));
    }
    if (priceMin) {
      results = results.filter(book => typeof book.price === 'number' && book.price >= parseFloat(priceMin));
    }
    if (priceMax) {
      results = results.filter(book => typeof book.price === 'number' && book.price <= parseFloat(priceMax));
    }
    setFilteredBooks(results);
    setSearched(true);
  };

  return (
    <div className="container mt-4">
      <h2>Search Books</h2>
      <form className="row g-2 align-items-center mb-4" onSubmit={handleSearch}>
        <div className="col-md-3">
          <input type="text" className="form-control" placeholder="Enter book title..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        </div>
        <div className="col-md-2">
          <select className="form-select" value={category} onChange={e => setCategory(e.target.value)}>
            <option value="">All Categories</option>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
        <div className="col-md-2">
          <select className="form-select" value={author} onChange={e => setAuthor(e.target.value)}>
            <option value="">All Authors</option>
            {authors.map(auth => <option key={auth} value={auth}>{auth}</option>)}
          </select>
        </div>
        <div className="col-md-2">
          <input type="number" className="form-control" placeholder="Min Price" value={priceMin} onChange={e => setPriceMin(e.target.value)} />
        </div>
        <div className="col-md-2">
          <input type="number" className="form-control" placeholder="Max Price" value={priceMax} onChange={e => setPriceMax(e.target.value)} />
        </div>
        <div className="col-12 mt-2 text-center">
          <button type="submit" className="btn btn-primary">Search</button>
        </div>
      </form>
      {loading ? (
        <div className="mt-4">Loading books...</div>
      ) : error ? (
        <div className="mt-4 text-danger">{error}</div>
      ) : (
        <div className="row">
          {filteredBooks.length === 0 ? (
            <div className="col-12 text-center text-muted">No books found.</div>
          ) : (
            filteredBooks.map(book => (
              <div className="col-md-4 mb-4" key={book.id}>
                <BookCard book={book} />
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
