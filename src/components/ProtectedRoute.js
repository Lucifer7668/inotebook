import React from 'react'
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProtectedRoute = ({children}) => {
    const token = localStorage.getItem('token');

    if (!token) {
        toast.error('Please Login')
        return <Navigate to="/login" />; // Redirect to login if not authenticated
      }
      return children; // Render the protected component if authenticated
    
}

export default ProtectedRoute
