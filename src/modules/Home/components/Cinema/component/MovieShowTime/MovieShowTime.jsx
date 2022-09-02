import React from "react";
import movieAPI from "apis/movieAPI";
import useRequest from "hooks/useRequest";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const MovieShowTime = () => {
  const {
    data: moviesShow,
    isLoading,
    error,
  } = useRequest(() => movieAPI.showCinemasList());

  const navigate = useNavigate()

  const { movies, moviesList } = useSelector((state) => state.movie);

  const handleMovieShowing = (movieId) => {
      navigate(`/movie/${movieId}`)
  }
  return (
    <div>
      {moviesShow?.map((movie) => {
        if (movie.maHeThongRap === movies?.maHeThongRap) {
          return (
            <div className="text-light ps-4" key={movie.maHeThongRap}>
              {movie.lstCumRap.map((cinemaName) => {
                if (cinemaName.tenCumRap === moviesList?.tenCumRap) {
                  return (
                    <div className="mb-3" key={cinemaName.maCumRap}>
                      {cinemaName.danhSachPhim.map((movieList) => {
                        return (
                          <div className="border-bottom py-3">
                            <button
                              onClick={() => handleMovieShowing(movieList.maPhim)}
                              style={{
                                backgroundColor: "transparent",
                                display: "flex",
                              }}
                              key={movieList.maPhim}
                              className="mb-3 movie-title"
                            >
                              <div>
                                <img
                                  className="cinema-logo rounded-3 me-3"
                                  src={movieList.hinhAnh}
                                  alt=""
                                />
                              </div>
                              <div className="text-start">
                                <p className="m-0">{movieList.tenPhim}</p>
                                <p className="m-0">{cinemaName.diaChi}</p>
                              </div>
                            </button>
                            {movieList.lstLichChieuTheoPhim.map((showTimes) => {
                              return (
                                <p className="showtimes d-inline-block w-50 " key={showTimes.maLichChieu}>
                                  {showTimes.ngayChieuGioChieu}
                                </p>
                              );
                            })}
                          </div>
                        );
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

export default MovieShowTime;
