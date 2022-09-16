import React from 'react'
import { useNavigate } from 'react-router-dom';
const LogOut = ({id}) => {

  const navigate = useNavigate()
  // const handleLogout = () => {
  //   localStorage.removeItem('user');
  //   navigate('./')
  // }

  return (
    <div>
      <span>{id} | </span>
      <button className='logOut' style={{fontSize:'14px',fontWeight:'500'}}>Đăng Xuất</button>
    </div>
  )
}

export default LogOut