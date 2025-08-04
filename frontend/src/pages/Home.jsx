import React from 'react'
import dummyBooks from '../data/dummyBooks'
import BookCarousel from '../components/BookCarousal'
import GetInTouch from './../components/GetInTouch';
import HeroSection from './../components/HeroSection';


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

  )
}

export default Home
