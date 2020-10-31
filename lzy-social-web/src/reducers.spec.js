import Reducer from "./reducers";

describe("Test states in reducers", ()=>{
	it ("navigate to main page", ()=>{
		expect(Reducer(undefined,{type:"TO_MAIN_PAGE"}).location).toBe("main");
	});
	it ("navigate to welcome page", ()=>{
		expect(Reducer({},{type:"TO_WELCOME_PAGE"}).location).toBe("welcome");
	});
	it ("navigate to profile page", ()=>{
		expect(Reducer({},{type:"TO_PROFILE_PAGE"}).location).toBe("profile");
	});
	it ("login new user", ()=>{
		expect(Reducer({},{type:"REGISTER_NEW_USER",newUser:{id:399,username:"xom"}}).user).toMatchObject({id:399,username:"xom"});
	});
	it ("login failure, update error message", ()=>{
		expect(Reducer({},{type:"LOGIN_ERROR",loginError:"login error"}).loginErrorMsg).toBe("login error")
	});
	it ("register failure (existing user), update error message", ()=>{
		expect(Reducer({},{type:"LOGIN_ERROR",loginError:"Existed User"}).loginErrorMsg).toBe("Existed User")
	});
	it ("after log out, user state is cleared", ()=>{
		let initialState = {
		    location : "welcome",
		    user:{id:2020, username:"aaww"},
		    profileUpdateMsg:"",
		    profileUpdateWarning:"",
		    registerErrorMsg: "",
		    loginErrorMsg:"",
		    followerList:[],
		    userPosts:[],
		    filteredPosts:[],
		    headlines:[]
	    };
	    expect(Reducer(initialState,{type:"LOG_OUT"}).user).toMatchObject({});

	});
	it ("username is updated after profile is updated", ()=>{
		let initialState = {
		    location : "welcome",
		    user:{id:2020, username:"aaww"},
		    profileUpdateMsg:"",
		    profileUpdateWarning:"",
		    registerErrorMsg: "",
		    loginErrorMsg:"",
		    followerList:[],
		    userPosts:[],
		    filteredPosts:[],
		    headlines:[]
	    };
	    expect(Reducer(initialState,{type:"REGISTER_NEW_USER",newUser:{id:399,username:"rds"}}).user.username).toBe("rds");

	});
	it ("filtered posts are updated (search)", ()=>{
		let initialState = {
		    location : "welcome",
		    user:{id:2020, username:"aaww"},
		    profileUpdateMsg:"",
		    profileUpdateWarning:"",
		    registerErrorMsg: "",
		    loginErrorMsg:"",
		    followerList:[],
		    userPosts:[],
		    filteredPosts:[{id:1,content:"post1"},{id:2,content:"post2"}],
		    headlines:[]
	    };
	    expect(Reducer(initialState,{type:"FILTERED_POSTS",posts:[{id:1,content:"post1"}]}).filteredPosts).toMatchObject([{id:1,content:"post1"}])
	});
    it ("posts are added to state", () =>{
    	let initialState = {
		    location : "welcome",
		    user:{id:2020, username:"aaww"},
		    profileUpdateMsg:"",
		    profileUpdateWarning:"",
		    registerErrorMsg: "",
		    loginErrorMsg:"",
		    followerList:[],
		    userPosts:[],
		    filteredPosts:[],
		    headlines:[]
	    };
	    expect(Reducer(initialState,{type:"UPDATE_POSTS",posts:[{id:1,content:"post1"}]}).userPosts).toMatchObject([{id:1,content:"post1"}])
    });
    it ("check headlines state is updated", () => {
    	let initialState = {
		    location : "welcome",
		    user:{id:2020, username:"aaww"},
		    profileUpdateMsg:"",
		    profileUpdateWarning:"",
		    registerErrorMsg: "",
		    loginErrorMsg:"",
		    followerList:[],
		    userPosts:[],
		    filteredPosts:[],
		    headlines:{u1:"i am user 1", u2:"i am user 2"}
	    };
	    expect(Reducer(initialState,{type:"UPDATE_HEADLINE",newHeadlines:{u1:"i am user 1", u2:"LOL"}}).headlines["u2"]).toBe("LOL");
    });
    it ("check follower list is set", () => {
    	expect(Reducer({},{type:"ADD_FOLLOWER_LIST",followers:[1,2,3,4,5]}).followerList).toMatchObject([1,2,3,4,5])
    });
    it ("update posts when adding new follower", () => {
    	let initialState = {
		    location : "welcome",
		    user:{id:2020, username:"aaww"},
		    profileUpdateMsg:"",
		    profileUpdateWarning:"",
		    registerErrorMsg: "",
		    loginErrorMsg:"",
		    followerList:[],
		    userPosts:[{id:1, uid:1,content:"post1"},{id:2, uid:2, content:"post2"}],
		    filteredPosts:[],
		    headlines:{}
	    };
	    expect(Reducer(initialState,{type:"UPDATE_POSTS",posts:[{id:1, uid:1,content:"post1"},{id:2, uid:2, content:"post2"},{id:3,uid:3,content:"new post 3"}]}).userPosts).
	    toMatchObject([{id:1, uid:1,content:"post1"},{id:2, uid:2, content:"post2"},{id:3,uid:3,content:"new post 3"}]);
    });
    it ("update posts when deleting follower", () => {
    	let initialState = {
		    location : "welcome",
		    user:{id:2020, username:"aaww"},
		    profileUpdateMsg:"",
		    profileUpdateWarning:"",
		    registerErrorMsg: "",
		    loginErrorMsg:"",
		    followerList:[],
		    userPosts:[{id:1, uid:1,content:"post1"},{id:2, uid:2, content:"post2"},{id:3,uid:3,content:"new post 3"}],
		    filteredPosts:[],
		    headlines:{}
	    };
	    expect(Reducer(initialState,{type:"UPDATE_POSTS",posts:[{id:1, uid:1,content:"post1"},{id:2, uid:2, content:"post2"}]}).userPosts).
	    toMatchObject([{id:1, uid:1,content:"post1"},{id:2, uid:2, content:"post2"}]);
    });
    it ("check if register error is set", () =>{
    	expect(Reducer({},{type:"REGISTER_ERROR",errorMsg:"Registration Error"}).registerErrorMsg).toBe("Registration Error");
    })
})