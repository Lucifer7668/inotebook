import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = () => {
  
    const [formData, setFormData]=useState({name:"",email:"",password:"",phone:""})
  const API_URL = "http://localhost:8000";
  let navigate=useNavigate()
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value }); // Update specific field in the formData state
  };
    const handleRegister=async(e)=>{
        e.preventDefault();
        try {
            
            const response = await fetch(`${API_URL}/api/auth/register`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name:formData.name,
                email:formData.email,
                password:formData.password,
                phone:formData.phone,

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
                navigate('/');
                toast.success('Registeration successfull')
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
    <h2 className="text-center">Register</h2>
      <div className="container my-3">
        <form onSubmit={handleRegister}>
        <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              onChange={handleInputChange}
            />
          </div>
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
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input type="password" className="form-control" id="password" name="password"  onChange={handleInputChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">
              Phone
            </label>
            <input type="text" className="form-control" id="phone" name="phone"  onChange={handleInputChange} />
          </div>
         
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
  
}

export default Register
