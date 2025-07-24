import React from 'react'
import { useParams } from 'react-router-dom';
import dummyBooks from "../../../data/dummyBooks";
import { useNavigate } from 'react-router-dom';

function EditBookForm() {
  const { isbn } = useParams();

  const navigate = useNavigate();
  const OnCancel = () => {
    navigate('/admin/books');
  }

  const book = dummyBooks.find(b => b.isbn === isbn);
  if (!book) {
    return <div className="container mt-4"><h4 className="text-danger">Book not found!</h4></div>;
  }

  return (
    <div className="container mt-4">
      <form className="p-4 bg-white border rounded">
      <h4 className="mb-3 text-info">Edit Book</h4>

      <div className="mb-3">
        <label className="form-label">ISBN</label>
        <input type="text" className="form-control" value={book.isbn} readOnly />
      </div>

      <div className="mb-3">
        <label className="form-label">Title</label>
        <input type="text" className="form-control" defaultValue={book.title} />
      </div>

      <div className="mb-3">
        <label className="form-label">Author</label>
        <input type="text" className="form-control" defaultValue={book.author} />
      </div>

      <div className="mb-3">
        <label className="form-label">Price</label>
        <input type="number" className="form-control" defaultValue={book.price} />
      </div>

      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea className="form-control" rows="3" defaultValue={book.description} />
      </div>

      <div className="mb-3">
        <label className="form-label">Published On</label>
        <input type="date" className="form-control" defaultValue={book.published_on} />
      </div>

      <div className="mb-3">
        <label className="form-label">Inventory</label>
        <input type="number" className="form-control" defaultValue={book.stock} />
      </div>

      <div className="mb-3">
        <label className="form-label">Book Cover</label>
        <img src={book.imageUrl} alt="Book Cover" className="img-thumbnail mb-2" width={100} />
        <input type="file" className="form-control" accept="image/*" />
      </div>

      <div className="mb-3 text-muted">
        <small>Created: {book.created_timestamp}</small><br />
        <small>Last Updated: {book.updated_timestamp}</small>
      </div>

      <div d-flex justify-content-end mt-3>
        <button type="submit" className="btn btn-info">Update Book</button>
        <button type="button" className="btn btn-secondary ms-2" onClick={OnCancel}>Cancel</button>
      </div>
    </form>

    </div>
  )
}

export default EditBookForm
