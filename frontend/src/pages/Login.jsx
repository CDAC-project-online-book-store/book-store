import { React ,useState } from 'react';
import {Link, useNavigate} from 'react-router-dom'
import dummyUsers from '../data/dummyUsers'

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    const navigate = useNavigate();
    const handleLogin = (e) => {
        e.preventDefault();
        setError('');

        const foundUser = dummyUsers.find(user => user.email === email && user.password === password);
        if (foundUser) {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('user', JSON.stringify(foundUser));
            if (foundUser.role === 'Admin') {
                navigate('/admin/dashboard');
            } else {
                navigate('/');
            }
        } else {
            setError('Invalid email or password');
        }
    };



    return (
        <div className="container vh-100 d-flex align-items-center justify-content-center">
            <div className="row w-100">
                <div className="col-md-6 col-lg-4  mx-auto">
                    <div className="card shadow p-4">
                        <h3 className="text-center mb-4">Login</h3>
                        <form onSubmit={handleLogin}>
                            {error && <div className="alert alert-danger">{error}</div>}
                            <div className="mb-3">
                                <label htmlFor="email">Email Address</label>
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
                            <div className="mb-4">
                                <label htmlFor="password">Password</label>
                                <input 
                                type="password" 
                                id="password" 
                                className="form-control" 
                                placeholder="Enter Password"
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                />
                            </div>
                            <div className="d-flex justify-content-center">
                                <button type="submit" className="btn btn-primary w-75">Sign In</button>
                            </div>
                        </form>
                        <p className="text-center mt-2">
                            Don't have account?
                            <Link to="/signup">Sign up</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
