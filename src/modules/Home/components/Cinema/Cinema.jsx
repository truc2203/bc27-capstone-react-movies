import movieAPI from "apis/movieAPI";
import useRequest from "hooks/useRequest";
import { useNavigate } from "react-router-dom";
import MovieShowTime from "./component/MovieShowTime";
import CinemasList from "./component/CinemasList";
import { useDispatch } from "react-redux";
const Cinema = () => {
  const navigate = useNavigate();
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
    <div className="m-container d-flex ">
      <div className="col-1">
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
      <div className="col-5">
        <CinemasList />
      </div>
      <div className="col-6">
        <MovieShowTime />
      </div>
    </div>
  );
};

export default Cinema;
