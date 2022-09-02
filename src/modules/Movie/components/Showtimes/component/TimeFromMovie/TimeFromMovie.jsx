import React from "react";
import { useSelector } from "react-redux";
import movieAPI from "apis/movieAPI";
import useRequest from "hooks/useRequest";
import { useNavigate } from "react-router-dom";
const TimeFromMovie = ({ movieId }) => {
  const {
    data: moviesShow,
    isLoading,
    error,
  } = useRequest(() => movieAPI.showCinemasList());

  const navigate = useNavigate();

  const { movies, moviesList } = useSelector((state) => state.movie);

  
  return (
    <div>
      {moviesShow?.map((movie) => {
        if (movie.maHeThongRap === movies?.maHeThongRap) {
          return (
            <div className=" ps-4" key={movie.maHeThongRap}>
              {movie.lstCumRap.map((cinemaName) => {
                if (cinemaName.tenCumRap === moviesList?.tenCumRap) {
                  return (
                    <div className="mb-3" key={cinemaName.maCumRap}>
                      {cinemaName.danhSachPhim.map((movieList) => {
                        if (movieList.maPhim == movieId) {
                          return (
                            <div className="border-bottom py-3">
                              <button
                                
                                style={{
                                  backgroundColor: "transparent",
                                  display: "flex",
                                }}
                                key={movieList.maPhim}
                                className="mb-3 movie-title"
                              >
                                <div>
                                  <img
                                    className="movie-logo rounded-3 me-3"
                                    src={movieList.hinhAnh}
                                    alt=""
                                  />
                                </div>
                                <div className="text-start">
                                  <p className=" fw-semibold m-0">
                                    {movieList.tenPhim}
                                  </p>
                                  <p className="fw-semibold m-0">
                                    {cinemaName.diaChi}
                                  </p>
                                </div>
                              </button>
                              {movieList.lstLichChieuTheoPhim.map(
                                (showTimes) => {
                                  return (
                                    <p
                                      className="showtimes d-inline-block "
                                      key={showTimes.maLichChieu}
                                    >
                                      {showTimes.ngayChieuGioChieu}
                                    </p>
                                  );
                                }
                              )}
                            </div>
                          );
                        }
                      })}
                    </div>
                  );
                }
              })}
            </div>
          );
        }
      })}
    </div>
  );
};

export default TimeFromMovie;
