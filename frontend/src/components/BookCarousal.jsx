import React from 'react'
import { Link } from 'react-router-dom';
import BookCard from './BookCard';

function BookCarousal({title, books}) {
  return (
   <div className="mb-5">
      <h2 className="mb-3 d-flex justify-content-center">{title}</h2>
      <div className="d-flex overflow-auto gap-4 pb-2">
        {books.map((book) => (
          <div key={book.isbn}>
            <BookCard book={book} />
          </div>
        ))}
      </div>
    </div>

  )
}

export default BookCarousal
