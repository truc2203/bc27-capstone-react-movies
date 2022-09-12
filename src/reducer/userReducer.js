const initialState={
    userInfo:null
}

const userReducer = (state = initialState,action) => {
    switch (action.type) {
        case 'userInfo':
            return {...state,userInfo:action.userr}
        default:
            return state
    }
}

export default userReducer