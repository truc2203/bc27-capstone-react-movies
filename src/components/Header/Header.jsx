import React from "react";
import {FcPhotoReel} from 'react-icons/fc'
import { useState } from "react";
import {FaUserCircle} from 'react-icons/fa'
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
const Header = () => {
  const [open,setOpen] = useState(false)
  const navigate = useNavigate()
  const movePath = (path) => {
    navigate(`${path}`)
  }
  const userData = JSON.parse(localStorage.getItem("user"));  
  const showNavbar = () => {
    setOpen(!open)
  }
  const hanldeLogout = () => {
    localStorage.removeItem('user')
    movePath('/')
    notification.success({
      message:'Đăng xuất thành công !'
    })
  }
  return (
   <nav className="m-container navbar navbar-expand-lg h-100">
  <div className="container-fluid">
    <button onClick={() => movePath('/')} className="navbar-brand" >
      <FcPhotoReel/>
    </button>
    <button onClick={() => showNavbar()} style={{zIndex:'999'}} className="navbar-toggler bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
      <ul style={{display : open ? 'block' : 'none'}} className="navbar-nav showNav">
        <li className="nav-item px-3">
          <button onClick={() => movePath('/')} className="nav-link d-inline" aria-current="page" >Lịch Chiếu</button>
        </li>
        <li className="nav-item px-3">
          <button onClick={() => movePath('/')} className="nav-link d-inline" >Cụm rạp</button>
        </li>
        <li className="nav-item px-3">
          <button onClick={() => movePath('/')} className="nav-link d-inline" >Tin Tức</button>
        </li>
        <li className="nav-item px-3">
          <button onClick={() => movePath('/')}  className="nav-link d-inline" >Ứng Dụng</button>
        </li>
        <li className="nav-item px-3">
          <button onClick={() => movePath('register')}  className="nav-link d-inline " >Đăng Ký</button>
        </li>
        <li className="nav-item px-3">
          <button onClick={() => movePath(userData?.taiKhoan ? '' : 'login')} className="nav-link d-inline" >{userData?.taiKhoan ? `${userData.taiKhoan}` :'Đăng nhập'}</button>
          <button onClick={() => hanldeLogout()} className="nav-link d-inline " >{userData?.taiKhoan ? '| Đăng Xuất' :''}</button>
          
        </li>
      </ul>
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
          <button onClick={() => movePath(userData?.taiKhoan ? '' : 'login')} className="nav-link d-inline" >{userData?.taiKhoan ? `${userData.taiKhoan}` :'Đăng nhập'}</button>
          <button onClick={() => hanldeLogout()} className="nav-link d-inline " >{userData?.taiKhoan ? '| Đăng Xuất' :''}</button>
          
        </li>
      </ul>
    </div>
  </div>
</nav>

  );
};

export default Header;
