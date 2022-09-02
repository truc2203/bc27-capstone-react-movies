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
    <div className="d-flex">
      <div className="col-1 border-end">
        {cinema?.map((cinema) => {
          return (
            <button
              onClick={() => handleCinema(cinema)}
              className="d-block cinema-logo mb-3"
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
      <div className="col-11 d-flex">
        <div className="col-6 cinema">
        <CinemaFromMovie movieId={movieId}/>
        </div>
        <div className="col-6 cinema">
        <TimeFromMovie  movieId={movieId}/>
        </div>
      </div>
    </div>
  );
};

export default Showtimes;
