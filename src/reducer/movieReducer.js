const initialState = {
  movies: null,
  moviesList: null,
  bookingList: [],
  movieId: null,
  movieInfo: null,
  theaterList: [],
  isBooking:true
};

const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case "location":
      return { ...state, movies: action.cinemaCode };
    case "movieList":
      return { ...state, moviesList: action.cinemaName };
    case "booking":
      const check = state.bookingList.findIndex(
        (chair) => chair.tenGhe === action.isBooking.tenGhe
      );
      if (check === -1) {
        const newChair = [...state.bookingList, { ...action.isBooking }];
        return { ...state, bookingList: newChair };
      }
      const newChair = state.bookingList.filter(
        (chair) => chair.tenGhe !== action.isBooking.tenGhe
      );
      return { ...state, bookingList: newChair };
    case "remove":
      return { ...state, bookingList: [] };
    case "getMovieId":
      return { ...state, movieId: action.movie };
    case "getMovieInfo":
      return { ...state, movieInfo: action.movie };
    case "theaterList":
      return { ...state, theaterList: action.theater };
    case 'bookingSuccess' : 
        return {...state,isBooking:action.isBookingDone}
    default:
      return state;
  }
};

export default movieReducer;
