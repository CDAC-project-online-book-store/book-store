import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoutes = ({ children, allowedRoles }) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    // Get user role from localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    // If user is not logged in or role is not allowed, redirect to login
    const userRole = (user?.role || 'UNREGISTERED').toLowerCase();
    const allowedRolesLower = allowedRoles ? allowedRoles.map(r => r.toLowerCase()) : null;
    if (!isLoggedIn || (allowedRolesLower && !allowedRolesLower.includes(userRole))) {
        return <Navigate to="/login" replace/>;
    }
    return children;
};

export default ProtectedRoutes
