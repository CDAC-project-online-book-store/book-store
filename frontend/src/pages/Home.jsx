import React from 'react'
import dummyBooks from '../data/dummyBooks'
import BookCarousel from '../components/BookCarousal'


export const booksByCategory =  dummyBooks.reduce((acc, book) => {
    const category = book.category || 'Uncategorized';
    if (!acc[category]) 
        acc[category] = [];
    acc[category].push(book);
    return acc;
}, {})

function Home() {

  return (
    <div className="container-fluid px-4 py-3">
      <section className="mb-5">
        <div className="bg-dark text-light p-5 rounded text-center">
          <h1>Discover Your Next Great Read</h1>
          <p>Explore stories, manga, and documentaries curated for you.</p>
          {/* <button className="btn btn-primary mt-3">Search</button> */}
        </div>
      </section>

      {Object.entries(booksByCategory).map(([category, books]) => (
        <BookCarousel key={category} title={category} books={books} />
      ))}
    </div>

  )
}

export default Home
