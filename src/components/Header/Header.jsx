import React from "react";
import {FcPhotoReel} from 'react-icons/fc'
import {FaUserCircle} from 'react-icons/fa'
import { useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate()
  const movePath = (path) => {
    navigate(`${path}`)
  }
  const userData = JSON.parse(localStorage.getItem("user"));  
  return (
   <nav className="m-container navbar navbar-expand-lg h-100">
  <div className="container-fluid">
    <button className="navbar-brand" >
      <FcPhotoReel/>
    </button>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item px-3">
          <button onClick={() => movePath('/')} className="nav-link" aria-current="page" >Lịch Chiếu</button>
        </li>
        <li className="nav-item px-3">
          <button onClick={() => movePath('/')} className="nav-link" >Cụm rạp</button>
        </li>
        <li className="nav-item px-3">
          <button onClick={() => movePath('/')} className="nav-link" >Tin Tức</button>
        </li>
        <li className="nav-item px-3">
          <button onClick={() => movePath('/')}  className="nav-link" >Ứng Dụng</button>
        </li>
        <li className="nav-item px-3">
          <button onClick={() => movePath('register')}  className="nav-link " >Đăng Ký</button>
        </li>
        <li className="nav-item px-3">
          <button onClick={() => movePath(userData?.taiKhoan ? 'logout' : 'login')} className="nav-link " >{userData?.taiKhoan ? `${userData.hoTen}!` :'Đăng nhập'}</button>
        </li>
      </ul>
    </div>
  </div>
</nav>

  );
};

export default Header;
