import { Routes, Route } from 'react-router-dom'
import ViewReview from '../components/ViewReview'

function BookRoutes() {
  return (
    <Routes>
        <Route path="/book/reviews" element={<ViewReview/>} />
      </Routes>
  )
}

export default BookRoutes
