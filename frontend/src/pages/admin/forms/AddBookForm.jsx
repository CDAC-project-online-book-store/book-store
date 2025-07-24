import React from 'react'
import { useNavigate } from 'react-router-dom';

function AddBookForm() {
// Get today's date in YYYY-MM-DD format
const today = new Date().toISOString().split('T')[0];
 

const navigate = useNavigate();
  const OnCancel = () => {
    navigate('/admin/books');
  }

return (
    <div className="container mt-4">
        <form className="p-4 bg light rounded shadow">
            <h4 className='mb-3 text-primary'>Add New Book</h4>
            
            <div className="mb-3">
                    <label className="form-label">ISBN</label>
                    <input type="text" className="form-control" placeholder="Enter ISBN" />
            </div>
            
            <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input type="text" className="form-control" placeholder="Enter Book Title" />
            </div>
            
            <div className="mb-3">
                    <label className="form-label">Author</label>
                    <input type="text" className="form-control" placeholder="Enter Author Name" />  
            </div>
            
            <div className="mb-3">
                    <label className="form-label">Category</label>
                    <input type="text" className="form-control" placeholder="Enter Book Category" />
            </div>
            
            <div className="mb-3">
                    <label className="form-label">Price (₹)</label> 
                    <input type="number" className="form-control" placeholder="Enter Book Price" />
            </div>
            
            <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea className="form-control" rows="3" placeholder="Enter Book Description"></textarea>
            </div>
            
            <div className="mb-3">
                    <label className="form-label">Publisher On</label>
                    <input type="date" className="form-control" max={today} />
            </div>
            
            <div className="mb-3">
                <label className="form-label">Inventory</label>
                <input type="number" className="form-control" placeholder="Stock count" />
            </div>

            <div className="mb-3">
                    <label className="form-label">Book Cover Image</label>
                    <input type="file" className="form-control" accept="image/*" />
            </div>
            
            <button type="submit" className="btn btn-primary">Add Book</button>
            <button type="button" className="btn btn-secondary ms-2" onClick={OnCancel}>Cancel</button>
        </form>
    </div>
)
}

export default AddBookForm
