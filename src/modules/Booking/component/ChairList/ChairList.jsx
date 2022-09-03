import React from 'react'
import useRequest from 'hooks/useRequest'
import movieAPI from 'apis/movieAPI'
const ChairList = ({timeId}) => {

  const {
    data:chairs,
    isLoading,
    error
  } = useRequest(() => movieAPI.getChairList(timeId))

  return (
    <div className=' py-5 d-flex'>
      <div className="col-1">
        <div className="d-flex flex-column">
          <p className=' chair-col'>A</p>
          <p className=' chair-col'>B</p>
          <p className=' chair-col'>C</p>
          <p className=' chair-col'>D</p>
          <p className=' chair-col'>E</p>
          <p className=' chair-col'>F</p>
          <p className=' chair-col'>G</p>
          <p className=' chair-col'>H</p>
          <p className=' chair-col'>I</p>
          <p className=' chair-col'>J</p>
        </div>
      </div>
      <div className="col-11 d-flex flex-wrap">
        {chairs?.danhSachGhe?.map((chair) => {
          return(
            <button className='chairs' key={chair.maGhe}>{chair.stt}</button>
          )
        })}
      </div>
    </div>
  )
}

export default ChairList