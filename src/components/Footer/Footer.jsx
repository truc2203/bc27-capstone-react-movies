import React from 'react'

const Footer = () => {
  return (
    <> 
    <div className='m-container d-flex mt-5 mb-3 border-bottom flex-wrap'>
        <div className="col-12 col-md-6 pb-4 pb-md-0">
            <h1>Cyber Movie</h1>
            <h6>179 Học viện Công nghệ Bưu chính Viễn Thông</h6>
            <h6 className='mb-3'>Quận 9, Tp. Hồ Chí Minh</h6>
            <h6>Call us : 123456789</h6>
        </div>
        <div className="col-12 col-md-6 d-flex">
            <div className="col-6 text-start text-light">
                <h6>Chính Sách</h6>
                <p>Term of User</p>
                <p>Privacy Policy</p>
                <p>Security</p>
            </div>
            <div className="col-6 text-end text-light">
                <h6>Tài Khoản</h6>
                <p>My Account</p>
                <p>Watchlist</p>
                <p>Collections</p>
                <p>User Guild</p>

            </div>
        </div>
    </div>
    <h6 className='m-container'>Trần Thanh Trúc</h6>
</>
  )
}

export default Footer