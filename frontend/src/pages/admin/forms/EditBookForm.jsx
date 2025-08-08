import React, { useEffect, useState } from 'react';
import { getAllAuthors, addAuthor } from '../../../services/authorService';
import { getAllCategories, addCategory } from '../../../services/categoryService';
import SelectWithAddModal from '../../../components/SelectWithAddModal';
import { useParams, useNavigate } from 'react-router-dom';
import { getAdminBookById, updateBook } from '../../../services/adminBookService';

function EditBookForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [form, setForm] = useState({ format: "HARDCOVER" });
  const [authorOptions, setAuthorOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log('EditBookForm: isbn param:', id);
    getAdminBookById(id)
      .then(res => {
        console.log('EditBookForm: getAdminBookById response:', res);
        setBook(res.data);
        setForm(res.data);
      })
      .catch((err) => {
        console.error('EditBookForm: getAdminBookById error:', err);
        setError("Book not found!");
      })
      .finally(() => setLoading(false));
    getAllAuthors().then(res => {
      const mapped = res.data.map(a => ({ ...a, name: a.name || a.author }));
      setAuthorOptions(mapped);
    });
    getAllCategories().then(res => {
      const mapped = res.data.map(c => ({ ...c, name: c.name || c.category }));
      setCategoryOptions(mapped);
    });
  }, [id]);

  const OnCancel = () => {
    navigate('/admin/books');
  };

  // Handle comma-separated authors/categories
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };
  const handleAuthorsSelect = (ids) => {
    setForm(prev => ({ ...prev, authors: ids.map(Number) }));
  };
  const handleCategoriesSelect = (ids) => {
    setForm(prev => ({ ...prev, categories: ids.map(Number) }));
  };
  const handleAddAuthor = (author) => {
    addAuthor({ author }).then(res => setAuthorOptions(prev => [...prev, res.data]));
  };
  const handleAddCategory = (name) => {
    addCategory({ name }).then(res => setCategoryOptions(prev => [...prev, res.data]));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      authorIds: form.authors,
      categoryIds: form.categories,
      stockQuantity: form.stockQuantity
    };
    updateBook(id, payload)
      .then(() => navigate('/admin/books'))
      .catch(() => setError("Failed to update book."));
  };

  if (loading) return <div className="container mt-4">Loading...</div>;
  if (error || !book) return <div className="container mt-4"><h4 className="text-danger">{error || "Book not found!"}</h4></div>;

  return (
    <div className="container mt-4 d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <form className="p-4 bg-white border rounded shadow" style={{ maxWidth: 600, width: '100%' }} onSubmit={handleSubmit}>
        <h4 className="mb-3 text-info text-center">Edit Book</h4>
        <div className="row g-2">
          <div className="col-6">
            <label className="form-label">ISBN</label>
            <input type="text" className="form-control" value={form.isbn || ''} readOnly />
          </div>
          <div className="col-6">
            <label className="form-label">Title</label>
            <input type="text" className="form-control" name="title" value={form.title || ''} onChange={handleChange} />
          </div>
          <div className="col-6">
            <SelectWithAddModal
              label="Authors"
              options={authorOptions}
              selected={form.authors || []}
              onSelect={handleAuthorsSelect}
              onAdd={handleAddAuthor}
              placeholder="Enter new author name"
            />
          </div>
          <div className="col-6">
            <SelectWithAddModal
              label="Categories"
              options={categoryOptions}
              selected={form.categories || []}
              onSelect={handleCategoriesSelect}
              onAdd={handleAddCategory}
              placeholder="Enter new category name"
            />
          </div>
          <div className="col-6">
            <label className="form-label">Format</label>
            <select className="form-select" name="format" value={form.format} onChange={handleChange} required>
              <option value="HARDCOVER">Hardcover</option>
              <option value="PAPERBACK">Paperback</option>
              <option value="EBOOK">Ebook</option>
              <option value="AUDIOBOOK">Audiobook</option>
            </select>
          </div>
          <div className="col-6">
            <label className="form-label">Price</label>
            <input type="number" className="form-control" name="price" value={form.price || ''} onChange={handleChange} />
          </div>
          <div className="col-6">
            <label className="form-label">Stock Quantity</label>
            <input type="number" className="form-control" name="stockQuantity" value={form.stockQuantity || ''} onChange={handleChange} />
          </div>
          <div className="col-6">
            <label className="form-label">Edition</label>
            <input type="text" className="form-control" name="edition" value={form.edition || ''} onChange={handleChange} />
          </div>
          <div className="col-6">
            <label className="form-label">Language</label>
            <input type="text" className="form-control" name="language" value={form.language || ''} onChange={handleChange} />
          </div>
          <div className="col-6">
            <label className="form-label">Active Status</label>
            <select
              className="form-select"
              name="isActive"
              value={form.isActive ? "true" : "false"}
              onChange={e => setForm(prev => ({ ...prev, isActive: e.target.value === "true" }))}
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>
          <div className="col-6">
            <label className="form-label">Publisher</label>
            <input type="text" className="form-control" name="publisher" value={form.publisher || ''} onChange={handleChange} />
          </div>
          <div className="col-6">
            <label className="form-label">Publication Date</label>
            <input type="date" className="form-control" name="publicationDate" value={form.publicationDate || ''} onChange={handleChange} />
          </div>
          <div className="col-12">
            <label className="form-label">Description</label>
            <textarea className="form-control" rows="2" name="description" value={form.description || ''} onChange={handleChange} />
          </div>
          <div className="col-12">
            <label className="form-label">Book Cover</label>
            {form.coverImageUrl && <img src={form.coverImageUrl} alt="Book Cover" className="img-thumbnail mb-2" width={100} />}
            <input type="file" className="form-control" accept="image/*" />
          </div>
        </div>
        <div className="mb-3 text-muted mt-2">
          <small>Created: {form.created_timestamp}</small><br />
          <small>Last Updated: {form.updated_timestamp}</small>
        </div>
        <div className='d-flex justify-content-end mt-3 gap-2'>
          <button type="submit" className="btn btn-info">Update Book</button>
          <button type="button" className="btn btn-secondary" onClick={OnCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default EditBookForm
