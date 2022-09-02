import React from "react";
import movieAPI from "apis/movieAPI";
import useRequest from "hooks/useRequest";
import { useDispatch, useSelector } from "react-redux";
const CinemasList = () => {
  const dispatch = useDispatch();
  const handleShowMovieList = (cinemaName) => {
    dispatch({ type: "movieList", cinemaName });
  };
  const { movies } = useSelector((state) => state.movie);
  const {
    data: cinemas,
    isLoading,
    error,
  } = useRequest(() => movieAPI.showCinemasList());
  // console.log(movies);
  return (
    <div>
      {cinemas?.map((cinema) => {
        if (cinema.maHeThongRap === movies?.maHeThongRap) {
          return (
            <div className="ps-4" key={cinema.maHeThongRap}>
              {cinema.lstCumRap.map((cinemaName) => {
                return (
                  <button
                    onClick={() => handleShowMovieList(cinemaName)}
                    style={{ backgroundColor: "transparent", display: "block" }}
                    className="mb-3 movie-title"
                    key={cinemaName.maCumRap}
                  >
                    <img
                      className="rounded-3 cinema-logo me-3"
                      src={cinemaName.hinhAnh}
                      alt=""
                    />
                    <span className="fw-semibold">{cinemaName.tenCumRap}</span>
                  </button>
                );
              })}
            </div>
          );
        }
      })}
    </div>
  );
};

export default CinemasList;
