import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoutes = ({ children, allowedRoles }) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userRole = localStorage.getItem('userRole');

    if (!isLoggedIn || (allowedRoles && !allowedRoles.includes(userRole))) {
        return <Navigate to="/login" replace/>;
    }
    return children;
};

export default ProtectedRoutes
