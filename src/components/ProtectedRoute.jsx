import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    const adminToken = localStorage.getItem('adminToken');

    if (!isAdmin || !adminToken) {
        return <Navigate to="/admin/login" />;
    }

    return children;
};

export default ProtectedRoute; 