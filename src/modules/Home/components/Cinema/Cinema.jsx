import movieAPI from "apis/movieAPI";
import useRequest from "hooks/useRequest";
import MovieShowTime from "./component/MovieShowTime";
import CinemasList from "./component/CinemasList";
import { useDispatch } from "react-redux";
const Cinema = () => {
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
    <div className="m-container d-flex py-5 flex-lg-row flex-column">
      <div className="col-lg-1 border-end col-12 flex-row text-center">
        {cinema?.map((cinema) => {
          return (
            <button
              onClick={() => handleCinema(cinema)}
              className=" d-sm-inline d-lg-block cinema-logo mb-3 me-4 pe-lg-0 "
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
      <div className="col-lg-5 col-12 cinema border-end my-3 my-lg-0">
        <CinemasList />
      </div>
      <div className="col-lg-6 col-12 cinema">
        <MovieShowTime />
      </div>
    </div>
  );
};

export default Cinema;
