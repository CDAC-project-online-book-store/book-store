import React from 'react'
import dummyBooks from '../../data/dummyBooks'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function ManageBooks() {
  const [searchQuery, setSearchQuery] = useState("");

  const books = dummyBooks;

  const OnClickDelete = (bookTitle) => {
    const confirmed = window.confirm(`Are you sure you want to delete "${bookTitle}"?`);
    if (confirmed) {
      // Logic to delete the book goes here
      alert(`Book "${bookTitle}" deleted successfully!`);
    }
  }

  const filteredBooks = books.filter((book) => {
    const query = searchQuery.toLowerCase();
    return (
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query) ||
      book.isbn.toLowerCase().includes(query)
    );
  });

  const navigate = useNavigate();
  const OnClickDashboard = () => {
    navigate('/admin');
  }
  
  return (
    <div>
      <div className="container mt-4">
        <h2>Manage Books</h2>
        {/* Search bar */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className='mb-3 flex-grow-1 p-2'>
            <input
              type="text"
              className="form-control"
              placeholder="Search by title, author, or ISBN"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}

            />
          </div >
          {/* Add Book button */}
          <div className='mb-3 p-2'>
            <Link to={`/admin/books/add`}  >
              <button className="btn btn-primary" >Add new Book</button>
            </Link>
          </div>
          {/* dashboard button */}
              <div className="mb-3 p-2">
                <button className="btn btn-secondary" onClick={OnClickDashboard}>
                  Dashboard
                </button>
              </div>
        </div>

        {/* Book table */}
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ISBN</th>
              <th>Title</th>
              <th>Author</th>
              <th>Category</th>
              <th>Price</th>
              <th>Published On</th>
              <th>Quantity</th>
              <th>Actions</th>

            </tr>
          </thead>
          <tbody>
            {filteredBooks.map((book) => (
              <tr key={book.isbn}>
                <td>{book.isbn}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.category}</td>
                <td>₹{book.price}</td>
                <td>{book.published_on}</td>
                <td>{book.stock}</td>
                <td>
                  <Link to={`/admin/books/edit/${book.isbn}`}  >
                    <button className="btn btn-sm btn-warning me-2">Edit</button>
                  </Link>
                  <button className="btn btn-sm btn-danger" onClick={() => OnClickDelete(book.title)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ManageBooks
