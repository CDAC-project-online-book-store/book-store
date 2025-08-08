import React from 'react'
import { Link } from 'react-router-dom';


function DefaultNavbar() {
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm" style={{backgroundColor: '#22577a' }}>
            <div className="container-fluid">
                <Link className="navbar-brand" to='/'>📚Online Book Store</Link>
                {/* Search Bar */}
        <form className="d-flex flex-grow-1 mx-3">
          <input className="form-control me-2" type="search" placeholder="Search" />
          <button className="btn btn-light" type="submit">
            <i className="bi bi-search"></i>
          </button>
        </form>
                <div className="d-flex">
                    <Link className="nav-link" to='/login'><button className="btn btn-warning">Login/signup</button></Link>
                    {/* <Link className="nav-link" to='/signup'><button className="btn btn-primary">Signup</button></Link> */}
                </div>
            </div>
        </nav>
    </div>
  )
}


export default DefaultNavbar
    