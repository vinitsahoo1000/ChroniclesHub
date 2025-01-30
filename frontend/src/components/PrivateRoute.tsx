import axios from "axios";
import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Backend_URL } from "../config";

const PrivateRoute = () => {
    const token = localStorage.getItem("token");
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
    const verify = async () => {
        if (!token) {
        setIsAuthenticated(false); // No token, redirect to login
        return;
    }

    try {
        const response = await axios.get(`${Backend_URL}/user/verify`, {
            headers: {
            Authorization: token,
            },
        });
        
        if (response.status === 200) {
          setIsAuthenticated(true); // Token is valid
        } else {
          setIsAuthenticated(false); // Token invalid or expired
        }
        } catch (error) {
        setIsAuthenticated(false); // Error verifying token
        }
    };

    verify();
    }, [token]);

  // Show loading while checking authentication status
    if (isAuthenticated === null) {
        return <div></div>;
    }

  // If not authenticated, redirect to login
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

  // If authenticated, render the child route (Outlet)
    return <Outlet />;
};

export default PrivateRoute;
