import React from 'react'
import ChairList from '../component/ChairList'
import { useParams } from 'react-router-dom'
import BookingInfo from '../component/BookingInfo'
const Booking = () => {
    const {timeId} = useParams()
  return (
    <div className='m-container d-flex py-5 flex-xl-row flex-column'>
        <div className='col-xl-8 col-12'> 
        <h4 className='text-dark w-75 m-auto border-bottom border-4 text-center border-warning'>MÀN HÌNH</h4>
        <ChairList timeId={timeId}/>
        </div>
        <div className="col-xl-4 col-12">
        <BookingInfo timeId={timeId}/>
        </div>
    </div>
  )
}

export default Booking