import React from 'react'

const Footer = () => {
  return (
    <> 
    <div className='d-flex '>
        <div className="col-5">
            <h4>Cyber Movie</h4>
            <h6>179 Học viện Công nghệ Bưu chính Viễn Thông</h6>
            <h6 className='mb-3'>Quận 9, Tp. Hồ Chí Minh</h6>
            <h6>Call us : 123456789</h6>
        </div>
        <div className="col-7 d-flex">
            <div className="col-6 text-center text-light">
                <h6>Chính Sách</h6>
                <p>Security</p>
                <p>Security</p>
                <p>Security</p>
            </div>
            <div className="col-6 text-center text-light">
                <h6>Tài Khoản</h6>
                <p>Account</p>
                <p>Account</p>
                <p>Account</p>

            </div>
        </div>
    </div>
    <div className='text-end'>
    <span>Back to top</span>
</div>
</>
  )
}

export default Footer