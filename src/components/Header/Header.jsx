import React from "react";
const Header = () => {
  return (
   <nav className="m-container navbar navbar-expand-lg h-100">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">
      Cyber Movie
    </a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item px-3">
          <a className="nav-link" aria-current="page" href="#">HOME</a>
        </li>
        <li className="nav-item px-3">
          <a className="nav-link" href="#">MOVIE SHOWING</a>
        </li>
        <li className="nav-item px-3">
          <a className="nav-link" href="#">COMING MOVIE</a>
        </li>
        <li className="nav-item px-3">
          <a className="nav-link" href="#">SIGN IN</a>
        </li>
        <li className="nav-item px-3">
          <a className="nav-link " href="#">SIGN UP</a>
        </li>
        <li className="nav-item px-3">
          <a className="nav-link " href="#">User</a>
        </li>
      </ul>
    </div>
  </div>
</nav>

  );
};

export default Header;
