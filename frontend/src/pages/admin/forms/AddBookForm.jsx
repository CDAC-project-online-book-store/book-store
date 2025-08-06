import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBook } from '../../../services/adminBookService';
import { getAllAuthors, addAuthor } from '../../../services/authorService';
import { getAllCategories, addCategory } from '../../../services/categoryService';
import SelectWithAddModal from '../../../components/SelectWithAddModal';

function AddBookForm() {
  const today = new Date().toISOString().split('T')[0];
  const navigate = useNavigate();
  const [isbn, setIsbn] = useState("");
  const [form, setForm] = useState({
    isbn: "",
    title: "",
    authors: [],
    categories: [],
    price: "",
    description: "",
    publicationDate: "",
    stockQuantity: "",
    coverImageUrl: "",
    format: "HARDCOVER"
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [authorOptions, setAuthorOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);

  useEffect(() => {
    getAllAuthors().then(res => {
      const mapped = res.data.map(a => ({ ...a, name: a.name || a.author }));
      setAuthorOptions(mapped);
    });
    getAllCategories().then(res => {
      const mapped = res.data.map(c => ({ ...c, name: c.name || c.category }));
      setCategoryOptions(mapped);
    });
  }, []);
  const OnCancel = () => {
    navigate('/admin/books');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleAuthorsSelect = (ids) => {
    setForm(prev => ({ ...prev, authors: ids }));
  };
  const handleCategoriesSelect = (ids) => {
    setForm(prev => ({ ...prev, categories: ids }));
  };
  const handleAddAuthor = (author) => {
    addAuthor({ author }).then(res => {
      const a = res.data;
      setAuthorOptions(prev => [...prev, { ...a, name: a.name || a.author }]);
    });
  };
  const handleAddCategory = (name) => {
    addCategory({ name }).then(res => {
      const c = res.data;
      setCategoryOptions(prev => [...prev, { ...c, name: c.name || c.category }]);
    });
  };

  const fetchFromOpenLibrary = async () => {
    if (!isbn) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`https://openlibrary.org/isbn/${isbn}.json`);
      if (!res.ok) throw new Error("Book not found in OpenLibrary");
      const data = await res.json();
      setForm(prev => ({
        ...prev,
        isbn,
        title: data.title || "",
        authors: [],
        publisher: data.publishers ? data.publishers.join(', ') : "",
        publicationDate: data.publish_date ? new Date(data.publish_date).toISOString().split('T')[0] : "",
        description: typeof data.description === 'string' ? data.description : (data.description?.value || ""),
        coverImageUrl: data.covers ? `https://covers.openlibrary.org/b/id/${data.covers[0]}-L.jpg` : ""
      }));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      ...form,
      authorIds: form.authors,
      categoryIds: form.categories,
      stockQuantity: form.stockQuantity
    };
    createBook(payload)
      .then(() => navigate('/admin/books'))
      .catch(() => setError("Failed to add book."))
      .finally(() => setLoading(false));
  };

  return (
    <div className="container mt-4 d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <form className="p-4 bg-light rounded shadow" style={{ maxWidth: 600, width: '100%' }} onSubmit={handleSubmit}>
        <h4 className='mb-3 text-primary text-center'>Add New Book</h4>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="row g-2">
          <div className="col-6">
            <label className="form-label">ISBN</label>
            <div className="input-group">
              <input type="text" className="form-control" name="isbn" value={isbn} onChange={e => setIsbn(e.target.value)} placeholder="Enter ISBN" />
              <button type="button" className="btn btn-outline-info" onClick={fetchFromOpenLibrary} disabled={loading}>Search OpenLibrary</button>
            </div>
          </div>
          <div className="col-6">
            <label className="form-label">Title</label>
            <input type="text" className="form-control" name="title" value={form.title} onChange={handleChange} placeholder="Enter Book Title" />
          </div>
          <div className="col-6">
            <SelectWithAddModal
              label="Authors"
              options={authorOptions}
              selected={form.authors}
              onSelect={handleAuthorsSelect}
              onAdd={handleAddAuthor}
              placeholder="Enter new author name"
            />
          </div>
          <div className="col-6">
            <SelectWithAddModal
              label="Categories"
              options={categoryOptions}
              selected={form.categories}
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
            <label className="form-label">Price (₹)</label>
            <input type="number" className="form-control" name="price" value={form.price} onChange={handleChange} placeholder="Enter Book Price" />
          </div>
          <div className="col-6">
            <label className="form-label">Stock Quantity</label>
            <input type="number" className="form-control" name="stockQuantity" value={form.stockQuantity} onChange={handleChange} placeholder="Stock count" />
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
            <label className="form-label">Publisher</label>
            <input type="text" className="form-control" name="publisher" value={form.publisher || ''} onChange={handleChange} />
          </div>
          <div className="col-6">
            <label className="form-label">Publication Date</label>
            <input type="date" className="form-control" name="publicationDate" value={form.publicationDate} onChange={handleChange} max={today} />
          </div>
          <div className="col-12">
            <label className="form-label">Description</label>
            <textarea className="form-control" rows="2" name="description" value={form.description} onChange={handleChange} placeholder="Enter Book Description"></textarea>
          </div>
          <div className="col-12">
            <label className="form-label">Book Cover Image</label>
            {form.coverImageUrl && <img src={form.coverImageUrl} alt="Book Cover" className="img-thumbnail mb-2" width={100} />}
            <input type="file" className="form-control" accept="image/*" />
          </div>
        </div>
        <div className='d-flex justify-content-end mt-3 gap-2'>
          <button type="submit" className="btn btn-primary" disabled={loading}>Add Book</button>
          <button type="button" className="btn btn-secondary" onClick={OnCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default AddBookForm
