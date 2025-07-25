import React from 'react'
import { Link } from 'react-router-dom';

function BookCarousal({title, books}) {
  return (
   <div className="mb-5">
      <h4 className="mb-3">{title}</h4>
      <div className="d-flex overflow-auto gap-4 pb-2">
        {books.map((book) => (
          <div key={book.isbn} style={{ minWidth: "150px" }}>
            <img src={book.imageUrl} alt={book.title} className="img-fluid rounded" />
            <Link to="/book/book-details">
            <h6 className="mt-2">{book.title}</h6>
            </Link>
            <p className="text-muted small">{book.author}</p>
          </div>
        ))}
      </div>
    </div>

  )
}

export default BookCarousal
