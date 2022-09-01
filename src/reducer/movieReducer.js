const initialState = {
     movies:null,
     moviesList:null
}

const movieReducer = (state = initialState,action) => {
    switch (action.type) {
        case 'location':
            return {...state,movies:action.cinemaCode}            
        case 'movieList' : 
            return {...state,moviesList:action.cinemaName}
        default:
            return state;
    }
}

export default movieReducer