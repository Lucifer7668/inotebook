import React from 'react'
import { Navigate } from 'react-router-dom';

const AuthRedirect = ({children}) => {
    const token = localStorage.getItem("token");

    if (token) {
      // Redirect to the homepage or another route if already logged in
      return <Navigate to="/" />;
    }
  
    return children; 
}

export default AuthRedirect
