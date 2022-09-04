import React from "react";
import useRequest from "hooks/useRequest";
import movieAPI from "apis/movieAPI";
import { useSelector } from "react-redux";
const BookingInfo = ({ timeId }) => {
  const {
    data: chairs,
    isLoading,
    error,
  } = useRequest(() => movieAPI.getChairList(timeId));

  const {bookingList} = useSelector((state) => state.movie)

  const totalPay = bookingList.reduce((total,value) => total += value.giaVe,0)

  return (
    <div className="border border-dark border-2 rounded-2 p-3">
      <h4 className="py-3 border-bottom border-dark border-1 text-dark text-center">
        {chairs?.thongTinPhim.tenPhim}
      </h4>
      <div className="d-flex justify-content-between py-3 fw-semibold border-1 border-bottom border-dark">
        <span>Ngày khởi chiếu :</span>{" "}
        <span>
          {chairs?.thongTinPhim.ngayChieu} {chairs?.thongTinPhim.gioChieu}
        </span>{" "}
      </div>
      <div className="d-flex justify-content-between py-3 fw-semibold border-1 border-bottom border-dark">
        <span> Cụm Rạp :</span> <span></span>
        {chairs?.thongTinPhim.tenCumRap}
      </div>
      <div className="d-flex justify-content-between py-3 fw-semibold border-1 border-bottom border-dark">
        <span>Rạp : </span> <span>{chairs?.thongTinPhim.tenRap}</span>{" "}
      </div>
      <div className="d-flex justify-content-between py-3 fw-semibold border-1 border-bottom border-dark">
        <span>Ghế chọn :</span> <span>{bookingList?.map((chair) => {
          return(
            <span key={chair.maGhe}>{chair.tenGhe}, </span>
          )
        })}</span>
      </div>
      <div className="d-flex justify-content-between py-3 fw-semibold border-1 border-bottom border-dark">
        <span>Ưu đãi : </span>
      </div>
      <div className="d-flex justify-content-between py-3 fw-semibold border-1 border-bottom border-dark">
        <span>Tổng Tiền :</span> <span>{totalPay}</span>
      </div>
      <button className="my-3  btn-style w-100 fs-5">ĐẶT VÉ</button>
    </div>
  );
};

export default BookingInfo;
