import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {

  const handleLogout = () => {
    
    localStorage.removeItem('token');
  };

  return (
    <header className="container" id="header">
      <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
        <div className="col-md-3 mb-2 mb-md-0">
          <a className="d-inline-flex link-body-emphasis text-decoration-none">
            <h2><Link to={"/inicio"}><i class="bi bi-shop-window"></i></Link></h2>
          </a>
        </div>
        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
          <li><Link to={"/inicio"} className="px-2 btn btn-outline-secondary">Inicio</Link></li>
          <li><Link to={"/login"} onClick={handleLogout} className="px-2 btn btn-outline-danger">Logout</Link></li>
        </ul>
      </div>
    </header>
  )
}

export default Header