
import React, { useEffect, useState } from 'react';
import BookCarousel from '../components/BookCarousal';
import GetInTouch from './../components/GetInTouch';
import HeroSection from './../components/HeroSection';
import { getBooks } from '../services/bookService';

function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getBooks()
      .then(res => {
        const data = Array.isArray(res?.data) ? res.data : [];
        setBooks(data);
      })
      .catch(() => setError("Failed to fetch books."))
      .finally(() => setLoading(false));
  }, []);

  // Group books by category
  const booksByCategory = (Array.isArray(books) ? books : []).reduce((acc, book) => {
    const category = book.category || (Array.isArray(book.categories) ? book.categories[0] : 'Uncategorized');
    if (!acc[category]) acc[category] = [];
    acc[category].push(book);
    return acc;
  }, {});

  if (loading) return <div className="container mt-4">Loading books...</div>;
  if (error) return <div className="container mt-4 text-danger">{error}</div>;

  return (
    <div className="container-fluid px-4 py-3">
      <section className="mb-5">
        <HeroSection />
        <div className="text-light p-5 rounded text-center">
          {/* <button className="btn btn-primary mt-3">Search</button> */}
        </div>
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
