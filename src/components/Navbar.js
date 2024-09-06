import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Navbar = () => {
    let location = useLocation();
    let navigate=useNavigate()
    const token = localStorage.getItem('token');
    useEffect(() => {
      }, [location]);
      const handleLogout=()=>{
        localStorage.removeItem('token');
        navigate('/login')
      }
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">iNotebook</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/"?"active":""}`} aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/about"?"active":""}`} to="/about">About</Link>
        </li>
      </ul>
      {!token ? (
              <div className="d-flex">
                <Link to="/login" className="btn btn-primary mx-2">Login</Link>
                <Link to="/signup" className="btn btn-primary mx-2">SignUp</Link>
              </div>
            ) : (
              <div className="d-flex">
                <Link to="/profile" className="btn btn-primary mx-2">Profile</Link>
                <button onClick={handleLogout} className="btn btn-primary mx-2">Logout</button>
              </div>
            )}
    </div>
  </div>
</nav></>
  )
}

export default Navbar
