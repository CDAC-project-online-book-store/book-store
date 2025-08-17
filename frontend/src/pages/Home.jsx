
import React, { useEffect, useState } from 'react';
import BookCarousel from '../components/BookCarousal';
import GetInTouch from './../components/GetInTouch';
import HeroSection from './../components/HeroSection';
import { getBooks } from '../services/bookService';

function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [authorFilter, setAuthorFilter] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const categories = Array.from(new Set(books.map(b => b.category || (Array.isArray(b.categories) ? b.categories[0] : 'Uncategorized'))));
  const authors = Array.from(new Set(books.flatMap(b => b.author ? [b.author] : (Array.isArray(b.authors) ? b.authors : []))));
  const navigate = window.reactRouterNavigate || ((url) => window.location.href = url); // fallback for navigation

  useEffect(() => {
    getBooks()
      .then(res => setBooks(Array.isArray(res.data) ? res.data : []))
      .catch(() => setError("Failed to fetch books."))
      .finally(() => setLoading(false));
  }, []);

  // Group books by category
  const booksByCategory = Array.isArray(books)
    ? books.reduce((acc, book) => {
        const category = book.category || (Array.isArray(book.categories) ? book.categories[0] : 'Uncategorized');
        if (!acc[category]) acc[category] = [];
        acc[category].push(book);
        return acc;
      }, {})
    : {};

  if (loading) return <div className="container mt-4">Loading books...</div>;
  if (error) return <div className="container mt-4 text-danger">{error}</div>;

  // Filter books based on search and filters
  const filteredBooks = books.filter(book => {
    const matchesSearch = searchTerm === "" || (book.title && book.title.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = categoryFilter === "" || (book.category === categoryFilter || (Array.isArray(book.categories) && book.categories.includes(categoryFilter)));
    const matchesAuthor = authorFilter === "" || (book.author === authorFilter || (Array.isArray(book.authors) && book.authors.includes(authorFilter)));
    const matchesPriceMin = priceMin === "" || (book.price >= parseFloat(priceMin));
    const matchesPriceMax = priceMax === "" || (book.price <= parseFloat(priceMax));
    return matchesSearch && matchesCategory && matchesAuthor && matchesPriceMin && matchesPriceMax;
  });

  const handleSearch = (e) => {
    e.preventDefault();
    // Pass filtered books and search params to SearchResults page
    const params = new URLSearchParams();
    params.set('books', JSON.stringify(filteredBooks));
    params.set('search', searchTerm);
    params.set('filters', JSON.stringify({ category: categoryFilter, author: authorFilter, priceMin, priceMax }));
    navigate(`/search?${params.toString()}`);
  };

  return (
    <div className="container-fluid px-4 py-3">
      <section className="mb-5">
        <HeroSection />
        <div style={{ height: '32px' }}></div> {/* Add vertical gap */}
      </section>
      <section className="book-grid mb-5" id='shop-section'>
        {Object.entries(booksByCategory).map(([category, books]) => (
          <BookCarousel key={category} title={category} books={books} />
        ))}
      </section>
      <section className="get-in-touch mb-5">
        <GetInTouch />
      </section>
    </div>
  );
}

export default Home
 