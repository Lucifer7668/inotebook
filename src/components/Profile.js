import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Profile = () => {
  const [user, setUser] = useState({naem:"",email:"",phone:""}); // Initialize as null or an empty object
  const API_URL = "http://localhost:8000";
  const token = localStorage.getItem("token");

  const getUser = async () => {
    try {
      const response = await fetch(`${API_URL}/api/auth/getuser`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Send the Bearer token in the Authorization header
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        toast.error(`Error: ${response.status}`);
        return;
      }

      const result = await response.json();
      setUser({name:result.user.name,email:result.user.email,phone:result.user.phone}); // Store the data in your state
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    getUser(); // Fetch data when the component is mounted
    // eslint-disable-next-line
  }, []);
  if (!user) {
    return <p>Loading...</p>; // Render a loading state while fetching the data
  }

  return (
    <>
    <div className="container my-3">
    <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">User Details</h5>
          <h6 className="card-subtitle mb-2 text-body-secondary">{user.name}</h6>
          <p className="card-text">{user.email}</p>
          <a href="/" className="card-link">
            {user.phone}
          </a>
        </div>
      </div>
    </div>
    
    </>
  );
};

export default Profile;
