import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
    const admin = localStorage.getItem("admin"); 
    if(admin===false){
        return admin ? <Outlet /> : <Navigate to="/cars/all" />;
    }
    return admin ? <Outlet /> : <Navigate to="/login" />;
}

export default AdminRoute