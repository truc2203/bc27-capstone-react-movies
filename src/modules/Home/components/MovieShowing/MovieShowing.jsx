import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 4,
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
    <div className="m-container py-5">
      <Slider {...settings}>
        {movies?.map((movie) => {
          return (
            <div key={movie.maPhim}>
              <img
                className="rounded-2 movieShow "
                src={movie.hinhAnh}
                alt=""
              />
              <div className="text-start">
                <button
                  className="btn-style mt-3 w-75"
                  onClick={() => goToMovie(movie.maPhim)}
                >
                  Mua vé
                </button>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default MovieShowing;
