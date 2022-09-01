import React from "react";
import movieAPI from "apis/movieAPI";
import useRequest from "hooks/useRequest";
import { useSelector } from "react-redux";
const MovieShowTime = () => {
  const {
    data: moviesShow,
    isLoading,
    error,
  } = useRequest(() => movieAPI.showCinemasList());

  const { movies, moviesList } = useSelector((state) => state.movie);
  console.log(moviesList);
  return (
    <div>
      {moviesShow?.map((movie) => {
        if (movie.maHeThongRap === movies?.maHeThongRap) {
          return (
            <div className="text-light ps-4" key={movie.maHeThongRap}>
              {movie.lstCumRap.map((cinemaName) => {
                if (cinemaName.tenCumRap === moviesList.tenCumRap) {
                  return (
                    <div className="mb-3" key={cinemaName.maCumRap}>
                      {cinemaName.danhSachPhim.map((movieList) => {
                        return (
                          <button
                            style={{
                              backgroundColor: "transparent",
                              display: "block",
                            }}
                            key={movieList.maPhim}
                            className="mb-3 movie-title"
                          >
                            <img
                              className="cinema-logo rounded-3 me-3"
                              src={movieList.hinhAnh}
                              alt=""
                            />
                            <span>{movieList.tenPhim}</span>
                          </button>
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
