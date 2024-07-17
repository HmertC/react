import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const token = localStorage.getItem('token');
    if (!token) {
        return <Navigate to="/girisekran" />
    }
    return <>{children}</>;
};