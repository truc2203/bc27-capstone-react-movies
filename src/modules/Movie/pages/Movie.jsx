import React from "react";
import { useParams } from "react-router-dom";

import Overview from "../components/Overview";
import Showtimes from "../components/Showtimes";

const Movie = () => {
  // useParams là hook để lấy giá trị params trên url
  const { movieId } = useParams();

  return (
    <div className=" m-container d-flex py-5 flex-column"> 
      <div className="col-12">
      <Overview movieId={movieId}/>
      </div>
      <div className="col-12 py-5">
        <Showtimes movieId={movieId}/>
      </div>
    </div>
  )
};

export default Movie;
