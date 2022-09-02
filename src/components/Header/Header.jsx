import React from "react";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate()
  const path = ""
  const movePath = (path) => {
    navigate(`${path}`)
    console.log('login');
  }
  return (
   <nav className="m-container navbar navbar-expand-lg h-100">
  <div className="container-fluid">
    <button className="navbar-brand" >
      Cyber Movie
    </button>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item px-3">
          <button onClick={() => movePath('/')} className="nav-link" aria-current="page" >HOME</button>
        </li>
        <li className="nav-item px-3">
          <button onClick={() => movePath('/')} className="nav-link" >MOVIE SHOWING</button>
        </li>
        <li className="nav-item px-3">
          <button onClick={() => movePath('/')} className="nav-link" >COMING MOVIE</button>
        </li>
        <li className="nav-item px-3">
          <button onClick={() => movePath('login')}  className="nav-link" >SIGN IN</button>
        </li>
        <li className="nav-item px-3">
          <button onClick={() => movePath('register')}  className="nav-link " >SIGN UP</button>
        </li>
        <li className="nav-item px-3">
          <button onClick={() => movePath('admin')} className="nav-link " >User</button>
        </li>
      </ul>
    </div>
  </div>
</nav>

  );
};

export default Header;
