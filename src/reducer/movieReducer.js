const initialState = {
     movies:null,
     moviesList:null,
     bookingList:[]
}

const movieReducer = (state = initialState,action) => {
    switch (action.type) {
        case 'location':
            return {...state,movies:action.cinemaCode}            
        case 'movieList' : 
            return {...state,moviesList:action.cinemaName}
        case 'booking' : 
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
          
        default:
            return state;
    }
}

export default movieReducer