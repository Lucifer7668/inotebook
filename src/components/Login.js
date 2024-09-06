import React, { useState } from "react";
import { toast } from "react-toastify";
import {useNavigate} from 'react-router-dom'

const Login = () => {
    const [credentials, setCredentials]=useState({email:"",password:"",remember:""})
  const API_URL = "http://localhost:8000";
  let navigate=useNavigate()
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value }); // Update specific field in the formData state
  };
    const handleLogin=async(e)=>{
        e.preventDefault();
        try {
            
            const response = await fetch(`${API_URL}/api/auth/login`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email:credentials.email,
                password:credentials.password,
                remember:credentials.remember
              }),
            });
      
            if (!response.ok) {
                const errorData = await response.json(); // Extract error details from the response
                // Display the error messages
                if (errorData.errors) {
                  Object.entries(errorData.errors).forEach(([field, message]) => {
                    toast.error(`${message}`); // Display each error message
                  });
                } else {
                  toast.error(`Error: ${response.status}`); // General error if no detailed messages
                }
                return; // Stop further execution
              }
      
            const result = await response.json();
            if(result.success){
                localStorage.setItem('token',result.authtoken);
                toast.success('Login successful');
                let token=localStorage.getItem('token');
                if(token){
                    navigate('/'); // Redirect to home page
                }
            }else{
            toast.error(result.error.message);

            }
            console.log(result);
          } catch (err) {
            toast.error(err.message);
          }
    }
  return (
    <>
    <h2 className="text-center">Login</h2>
      <div className="container my-3">
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              onChange={handleInputChange}
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input type="password" className="form-control" id="password" name="password"  onChange={handleInputChange} />
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="remember"
              name="remember"
              value={true}
              onChange={handleInputChange}
            />
            <label className="form-check-label" htmlFor="remember">
              Remember me ?
            </label>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
