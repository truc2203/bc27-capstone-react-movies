import React from "react";
import movieAPI from "apis/movieAPI";
import { useDispatch } from "react-redux";
import useRequest from "hooks/useRequest";
import CinemaFromMovie from "./component/CinemaFromMovie/CinemaFromMovie";
import TimeFromMovie from "./component/TimeFromMovie/TimeFromMovie";
const Showtimes = ({ movieId }) => {
  // useRequest call API lấy lịch chiếu
  const dispatch = useDispatch();
  const handleCinema = (cinemaCode) => {
    dispatch({ type: "location", cinemaCode });
  };
  const {
    data: cinema,
    isLoading,
    error,
  } = useRequest(() => movieAPI.getCinema());

  return (
    <div className="d-flex flex-lg-row flex-column">
      <div className="col-lg-1 border-end col-12 flex-row text-center">
        {cinema?.map((cinema) => {
          return (
            <button
              onClick={() => handleCinema(cinema)}
              className="d-sm-inline d-lg-block cinema-logo mb-3 me-4 pe-lg-0"
              key={cinema.maHeThongRap}
            >
              <img
                className="w-100 cinema-scale"
                src={cinema.logo}
                alt={cinema.tenHeThongRap}
              />
            </button>
          );
        })}
      </div>
      <div className="col-11 d-flex flex-lg-row flex-column">
        <div className="col-lg-6 col-12 cinema my-3 my-lg-0">
        <CinemaFromMovie movieId={movieId}/>
        </div>
        <div className="col-lg-6 col-12 cinema">
        <TimeFromMovie  movieId={movieId}/>
        </div>
      </div>
    </div>
  );
};

export default Showtimes;
