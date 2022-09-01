import React from "react";

import useRequest from "hooks/useRequest";
import movieAPI from "apis/movieAPI";

const Overview = ({ movieId }) => {
  const {
    data: movie,
    isLoading,
    error,
  } = useRequest(() => movieAPI.getMovieDetails(movieId));

  if (!movie) {
    return null;
  }

  return (
    <div>
      <h1>{movie.tenPhim}</h1>
    </div>
  );
};

export default Overview;
