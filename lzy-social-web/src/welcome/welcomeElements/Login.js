import React from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';


export const Login = ({goToMain, updateErrorMsg, loginErrorMsg,registerUser,addFollowerList,addPosts}) => {
  let loginUname;
  let loginPw;
  let loginError;

  const onLogin = (uname,pw) => {
    loginError = "";
    if (!uname || !pw ||!uname.value || !uname.value){
      loginError = "Username and password should not be empty.";
      updateErrorMsg(loginError);
      return false;
    } else{
      let jsonUsers = fetch("https://jsonplaceholder.typicode.com/users")
          .then(response => response.json())
          .then(data => {
            for (var user of data){
              if (user.username==uname.value && pw.value==user.address.street ){
                let newUser = {
                  username: user.username,
                  dob: user.dob,
                  email: user.email,
                  phone: user.phone,
                  zipcode: user.address.zipcode,
                  password: user.address.street,
                  status: user.company.catchPhrase,
                  userid: user.id
                }
                registerUser(newUser);
                getFollowerAndPosts(user.id, data);
                goToMain();
                return true;
              }
            }
      loginError = "Unregistered user or incorrect password";
      updateErrorMsg(loginError);
      return false;
    });
    }
    return true;
  }
  
  const getFollowerAndPosts = (uid, userdata) => {
    let followers =[];
    let posts=[];
    uid = parseInt(uid);
    let i;
    for (i= uid; i<uid+3; i++){
      let idx = parseInt(i%userdata.length);
      let follower = userdata[idx];
      follower.status = follower.company.catchPhrase;
      followers.push(follower);
    }
    addFollowerList(followers);
    let fetchPost = fetch("https://jsonplaceholder.typicode.com/posts") .then(response => response.json())
          .then(data => {
            posts=data.filter(post => post.userId == uid);
            let i = 0;
            for (i;i<posts.length;i++){
              posts[i].time = "Sun Aug 16 2015 08:37:51 GMT-0500 (Central Daylight Time)";
            }
            addPosts(posts);
            });
  }
  

  return (
    <div>
      <div id="loginForm">
        <form>
          <span><FontAwesomeIcon icon={faUser}/></span><input type="text" id="loginUsr" name="loginUsr" placeholder="username" ref={(ele)=>loginUname = ele}></input><br/>
          <span><FontAwesomeIcon icon={faKey}/></span><input type="text" id="loginPwd" name="loginPwd" placeholder="password" ref={(ele)=>loginPw = ele}></input><br/>
          <button type="button" id="loginBtn" onClick={()=>{onLogin(loginUname,loginPw)}}>Login</button>
        </form>
        <div className="alert alert-warning" role="alert" id="failMsg">
               <strong></strong><span id = "failText">{loginErrorMsg}</span>
        </div>
      </div>
    </div>
  )

}

const mapStateToProps = (state) => {
    return {
        loginErrorMsg: state.loginErrorMsg
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        goToMain: ()=> dispatch({type: 'TO_MAIN_PAGE'}),
        updateErrorMsg: (loginError) => dispatch({type:'LOGIN_ERROR',loginError}),
        registerUser: (newUser)=> dispatch({type:'REGISTER_NEW_USER',newUser}),
        addFollowerList: (followers) => dispatch({type:'ADD_FOLLOWER_LIST',followers}),
        addPosts: (posts) => dispatch({type:'UPDATE_POSTS',posts})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);