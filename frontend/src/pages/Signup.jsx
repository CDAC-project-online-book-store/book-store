import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { signupUser } from '../services/userService'

function Signup() {
    const [form, setForm] = useState({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      mobile: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = e => {
      setForm({ ...form, [e.target.id]: e.target.value });
      setError('');
      setSuccess('');
    };

    const handleSubmit = async e => {
      e.preventDefault();
      setError('');
      setSuccess('');
      // Basic validation
      if (!form.name || !form.email || !form.password || !form.confirmPassword || !form.mobile) {
        setError('Please fill in all fields.');
        return;
      }
      if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email)) {
        setError('Please enter a valid email address.');
        return;
      }
      if (form.password.length < 6) {
        setError('Password must be at least 6 characters.');
        return;
      }
      if (form.password !== form.confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
      if (!/^\d{10}$/.test(form.mobile)) {
        setError('Mobile number must be 10 digits.');
        return;
      }
      // Call backend API
      try {
        await signupUser({
          userName: form.name,
          email: form.email,
          password: form.password,
          phoneNumber: form.mobile,
        });
        setSuccess('Registration successful! You can now log in.');
        setForm({ name: '', email: '', password: '', confirmPassword: '', mobile: '' });
      } catch (err) {
        setError(err?.response?.data?.message || 'Registration failed.');
      }
    };

    return (
      <div className='container vh-100 d-flex align-items-center justify-content-center bg-light'>
        <div className='row w-100'>
          <div className='col-md-6 col-lg-5 mx-auto'>
            <div className='card shadow p-4'>
              <h3 className='text-center mb-4 text-primary'>Create Account</h3>
              <form onSubmit={handleSubmit} autoComplete="off">
                {error && <div className='alert alert-danger'>{error}</div>}
                {success && <div className='alert alert-success'>{success}</div>}
                <div className='mb-3'>
                  <label htmlFor="name">Name</label>
                  <input type='text' id='name' className='form-control' placeholder='Enter name' value={form.name} onChange={handleChange} required />
                </div>
                <div className='mb-3'>
                  <label htmlFor="email">Email</label>
                  <input type='email' id='email' className='form-control' placeholder='Enter email' value={form.email} onChange={handleChange} required />
                </div>
                <div className='mb-3'>
                  <label htmlFor="password">Password</label>
                  <input type='password' id='password' className='form-control' placeholder='Enter password' value={form.password} onChange={handleChange} required />
                </div>
                <div className='mb-3'>
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input type='password' id='confirmPassword' className='form-control' placeholder='Confirm password' value={form.confirmPassword} onChange={handleChange} required />
                </div>
                <div className='mb-3'>
                  <label htmlFor="mobile">Mobile</label>
                  <input type='number' id='mobile' className='form-control' placeholder='Enter Mobile' value={form.mobile} onChange={handleChange} required />
                </div>
                <div className='d-flex justify-content-center'>
                  <button className='btn btn-primary w-75' type='submit'>Sign up</button>
                </div>
              </form>
              <p className='text-center mt-3'>
                Already have an account?
                <Link to="/login" className='btn btn-link'>Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Signup
