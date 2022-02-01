import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    console.log('admin',localStorage)
    const auth = localStorage.getItem("isLoggedIn"); 
    
    return auth ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute