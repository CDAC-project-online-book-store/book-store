import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';

function BookCard({ book }) {
    const { title, author, imageUrl, isbn, price } = book;
    const navigate = useNavigate();
    const coverUrl = isbn ? `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`
        : imageUrl; // fallback url
    return (
        // card should have fixed width and height
        // Inline style for fixed width and height
        // You can adjust the width and height as needed
        // Example: width: 220px, height: 370px
        // Alternatively, use a CSS class if preferred
        // Here, using inline style for demonstration

        <div className='book-card shadow-sm rounded p-3 bg-light d-flex flex-column'
            role='button'
            onClick={() => navigate(`/book/book-details/${isbn}`)}
        >
                <img
                    className='card-img-top rounded-3 mb-2'
                    src={coverUrl}
                    alt={title}
                    loading='lazy'
                    onError={(e) => {
                        e.target.onerror = null; // prevents looping
                        e.target.src = '/images/placeholder.png'; // fallback image
                    }}
                />

            <div className='card-body d-flex flex-column'>
                <h5 className='card-title text-truncate'>{title}</h5>
                <p className='card-text text-muted mb-2 text-truncate'>{author}</p>
                <span className='card-price mt-auto fw-bold'>₹ {price}</span>
            </div>
        </div>
    )
}

export default BookCard;    
