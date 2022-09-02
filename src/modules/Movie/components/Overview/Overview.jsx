import React from "react";

import useRequest from "hooks/useRequest";
import movieAPI from "apis/movieAPI";

const Overview = ({ movieId }) => {
  const {
    data: movie,
    isLoading,
    error,
  } = useRequest(() => movieAPI.getMovieDetails(movieId));

  if (!movie) {
    return null;
  }

  return (
    <div className="d-flex">
      <div className="col-4 pe-5">
      <img className="movieShowingPic" src={movie.hinhAnh} alt="" />
      </div>
      <div className="col-8">
      <h3 className="text-start text-dark pt-3">{movie.tenPhim}</h3>
      <p>Mô tả : {movie.moTa}</p>
      <p>Đánh giá phim : {movie.danhGia}/10</p>
      </div>
    </div>
  );
};

export default Overview;
