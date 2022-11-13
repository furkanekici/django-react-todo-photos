import { Navigate, Outlet, useLocation } from "react-router-dom";
import React from "react";
import useAuth from '../hooks/useAuth';

const RequireAuth = () => {
    const { auth } = useAuth();
    const key = localStorage.getItem('key');
    const location = useLocation();

    return (
        auth?.key || key ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />
    )
}

export default RequireAuth;