import React from 'react'
import {Routes, Route} from "react-router-dom"
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Home from '../pages/Home'
import ContactUs from '../pages/ContactUs'
import ForgotPassword from '../pages/ForgotPassword'
import SearchResults from '../pages/SearchResults'

function DefaultRoutes() {
    return (
        <div>
            <Routes>

                <Route path='/' element={<Home/>} />
                <Route path='/search' element={<SearchResults />} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/contact' element={<ContactUs />} />
                <Route path='/forgot-password' element={<ForgotPassword />} />
            </Routes>
        </div>
    )
}

export default DefaultRoutes
