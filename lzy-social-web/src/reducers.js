const initialState = {
    location : "welcome",
    user:{},
    profileUpdateMsg:"",
    profileUpdateWarning:"",
    registerErrorMsg: "",
    loginErrorMsg:"",
    followerList:[],
    userPosts:[],
    filteredPosts:[]
};

const Reducer = ( state=initialState,action) => {
    switch (action.type){
        case 'TO_WELCOME_PAGE':
            return {...state, location: "welcome" }
        case 'TO_MAIN_PAGE':
            return {...state, location: "main" }
        case 'TO_PROFILE_PAGE':
            return {...state, location: "profile" }
        case 'REGISTER_NEW_USER':
            return {...state, user: action.newUser}
        case 'PROFILE_UPDATE_MSG':
            return {...state, profileUpdateMsg: action.msg}
        case 'PROFILE_UPDATE_WARNING':
            return {...state, profileUpdateWarning: action.pWarning}
        case 'REGISTER_ERROR':
            return {...state, registerErrorMsg: action.errorMsg}
        case 'LOGIN_ERROR':
            return {...state, loginErrorMsg: action.loginError}
        case 'ADD_FOLLOWER_LIST':
            return {...state, followerList: action.followers}
        case 'UPDATE_POSTS':
            return {...state, userPosts: action.posts}
        case 'FILTERED_POSTS':
            return {...state, filteredPosts: action.posts}
        default:
            return state;
    }
}

export default Reducer;