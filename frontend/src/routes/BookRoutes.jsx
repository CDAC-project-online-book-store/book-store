import React from 'react'
import BookDetails from '../pages/books/BookDetails'
import { Routes, Route } from 'react-router-dom'

function BookRoutes() {
  return (
   <Routes>
      <Route path='/book-details' element={<BookDetails />} />
      
    </Routes>
  )
}

export default BookRoutes
