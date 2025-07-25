import React from 'react'
import {Link} from 'react-router-dom'

function Signup() {
    return (
        <div className='container vh-100 d-flex align-items-center justify-content-center'>
      <div className='row w-100'>
        <div className='col-md-6  col-lg-5 mx-auto'>
          <div className='card shadow p-4'>
            <h3 className='text-center mb-4'>Register</h3>
            <form>
              <div className='mb-3' >
                <label htmlFor="name">Name</label>
                <input type='text' id='name' className='htmlForm-control' placeholder='Enter name'/>
              </div>
              <div className='mb-3'>
                <label htmlFor="email">Email</label>
                <input type='email' id='email' className='htmlForm-control' placeholder='Enter email'/>
              </div>
              <div className='mb-3'>
                <label htmlFor="password">Password</label>
                <input type='password' id='password' className='htmlForm-control' placeholder='Enter password'/>
              </div>
              <div className='mb-3'>
                <label htmlFor="confirm-password">Password</label>
                <input type='password' id='confirm-password' className='htmlForm-control' placeholder='Confirm password'/>
              </div>
              <div className='mb-3'>
                <label htmlFor="mobile">Mobile</label>
                <input type='number' id='mobile' className='htmlForm-control' placeholder='Enter Mobile'/>
              </div>
              <div className='d-flex justify-content-center'>
                <button className='btn btn-primary w-75'>Sign up</button>
              </div>
            </form>
            <p className='text-center'>
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
