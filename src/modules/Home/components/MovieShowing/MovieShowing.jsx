import { useNavigate } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";

import useRequest from "hooks/useRequest";
import movieAPI from "apis/movieAPI";

const MovieShowing = () => {
  // useNavigate là một hook dùng để điều hướng url
  const navigate = useNavigate();

  const {
    data: movies,
    isLoading,
    error,
  } = useRequest(() => movieAPI.getMovies());

  const goToMovie = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    // <ul>
    //   {movies?.map((movie) => {
    //     return (
    //       <li key={movie.maPhim}>
    //         <span>{movie.tenPhim}</span>
    //         <button onClick={() => goToMovie(movie.maPhim)}>Chi tiết</button>
    //       </li>
    //     );
    //   })}
    // </ul>
    <Carousel>
      <div className="d-flex flex-wrap">
        {movies?.map((movie) => {
          return (
            <div className="col-3 px-3" key={movie.maPhim}>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={movie.hinhAnh}
                  alt=" "
                />
                <Carousel.Caption>
                <button onClick={() => goToMovie(movie.maPhim)}>Chi tiết</button>
                </Carousel.Caption>
                <span>{movie.tenPhim}</span>
              </Carousel.Item>
            </div>
          );
        })}
      </div>
    </Carousel>
  );
};

export default MovieShowing;
