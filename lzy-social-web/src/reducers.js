const Reducer = ( state={
    location : "welcome",
    user:{},
    profileUpdateMsg:"",
    profileUpdateWarning:""
    },action) => {
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
        default:
            return state;
    }
}

export default Reducer;