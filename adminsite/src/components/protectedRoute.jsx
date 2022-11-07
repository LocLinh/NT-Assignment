import React from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";

const ProtectedRoute = () => {
    const { auth } = useAuth();
    const location = useLocation();
    const cookies = new Cookies();
    const token = cookies.get("Token");
    var role = "";
    if (token) {
        const dataFromToken = jwt_decode(token);
        role =
            dataFromToken[
                "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
            ];
    }

    return role === "Admin" ? (
        <Outlet />
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
};

export default ProtectedRoute;
