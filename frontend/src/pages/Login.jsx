import React, { useState } from 'react';

// Helper to parse JWT token
function parseJwt(token) {
  if (!token) return null;
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { loginUser } from '../services/userService';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    const navigate = useNavigate();
    const { state } = useLocation();
    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
      const res = await loginUser({ email, password });
      const user = res.data;
      // Store JWT token
      localStorage.setItem('token', user.token);
      localStorage.setItem('isLoggedIn', 'true');
      // Store username from backend response, role from response or token
      const userInfo = parseJwt(user.token);
      localStorage.setItem('user', JSON.stringify({
        username: user.username,
        userName: user.username,
        userId: user.userId,
        role: user.role || userInfo?.role
      }));
      if (state?.redirectTo) {
        navigate(state.redirectTo, { replace: true, state: state });
      } else if (userInfo?.role?.toLowerCase() === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
        } catch (err) {
            setError(err?.response?.data?.message || 'Invalid email or password');
        }
    };



    return (
      <div className="container vh-100 d-flex align-items-center justify-content-center bg-light">
        <div className="row w-100">
          <div className="col-md-6 col-lg-4 mx-auto">
            <div className="card shadow-lg p-4 border-0" style={{ borderRadius: '16px', background: '#fff' }}>
              <div className="text-center mb-4">
                <div style={{ fontSize: '2.5rem', color: '#22577a', marginBottom: '0.5rem' }}>📚</div>
                <h3 className="mb-1 fw-bold text-primary">Sign In</h3>
                <p className="text-muted mb-0">Welcome back! Please login to your account.</p>
              </div>
              <form onSubmit={handleLogin}>
                {error && <div className="alert alert-danger mb-3">{error}</div>}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label fw-semibold">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label fw-semibold">Password</label>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <button type="submit" className="btn btn-primary w-75">Sign In</button>
                  <Link to="/forgot-password" className="btn btn-link p-0 ms-2">Forgot Password?</Link>
                </div>
              </form>
              <hr className="my-4" />
              <p className="text-center mb-0">
                Don't have an account?
                <Link to="/signup" className="btn btn-link">Sign up</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Login
