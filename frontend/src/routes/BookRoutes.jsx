import React from 'react'
import BookDetails from '../pages/books/BookDetails'
import { Routes, Route } from 'react-router-dom'

function BookRoutes() {
  return (
   <Routes>
      <Route path='/book/book-details/:isbn' element={<BookDetails />} />
      {/* <Route path="/book/reviews" element={<ViewReview/>} /> */}
    </Routes>
  )
}

export default BookRoutes
