import React from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import './loginAndRegisStyle.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export const Login = ({goToMain, updateErrorMsg, loginErrorMsg,registerUser,addFollowerList,addPosts,initializeFilteredPosts,updateHeadlines,headlines}) => {
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
                let newHeadlines = headlines;
                if (!headlines[user.username]){
                  newHeadlines[user.username] = user.company.catchPhrase;
                  updateHeadlines(Object.assign({},newHeadlines));  
                }
                getFollowerAndPosts(user.id, data,user.username);
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
  
  const getFollowerAndPosts = (uid, userdata,uname) => {
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
              posts[i].username = uname;
              posts[i].comments = [{author:"MANGO",content:"Fake Comment!"},{author:"DVA",content:"LOL"}];

            }

            let postsF=[];
            postsF=data.filter(post => post.userId == followers[0].id);
            i = 0;
            for (i;i<postsF.length;i++){
              postsF[i].time = "Mon Aug 03 2020 01:27:52 GMT-0500 (Central Daylight Time)";
              postsF[i].username = followers[0].username;
              postsF[i].comments = [{author:"MANGO",content:"Fake Comment!"},{author:"DVA",content:"LOL"}];
              
            }
            Array.prototype.push.apply(posts,postsF); 

            postsF=data.filter(post => post.userId == followers[1].id);
            i = 0;
            for (i;i<postsF.length;i++){
              postsF[i].time = "Wed Oct 17 2018 13:17:52 GMT-0500 (Central Daylight Time)";
              postsF[i].username = followers[1].username;
              postsF[i].comments = [{author:"MANGO",content:"Fake Comment!"},{author:"DVA",content:"LOL"}];
             
            }
            Array.prototype.push.apply(posts,postsF); 

            postsF=data.filter(post => post.userId == followers[2].id);
            i = 0;
            for (i;i<postsF.length;i++){
              postsF[i].time = "Sun Sep 13 2020 11:31:21 GMT-0500 (Central Daylight Time)";
              postsF[i].username = followers[2].username;
              postsF[i].comments = [{author:"MANGO",content:"Fake Comment!"},{author:"DVA",content:"LOL"}];
              
            }
            Array.prototype.push.apply(posts,postsF); 

            posts.sort(function(a,b){
              return new Date(b.time) - new Date(a.time);
            });


            addPosts(posts);
            let postsCopy = [...posts];
            initializeFilteredPosts(postsCopy);
            });
  }
  

  return (
    <div className='container'>
      <div id="loginForm">
        <table className="table">
          <tbody>
            <tr>
              <td><FontAwesomeIcon icon={faUser}/></td>
              <td><input type="text" id="loginUsr" name="loginUsr" placeholder="username" ref={(ele)=>loginUname = ele}></input></td>
            </tr>
            <tr>
              <td><FontAwesomeIcon icon={faKey}/></td>
              <td><input type="password" id="loginPwd" name="loginPwd" placeholder="password" ref={(ele)=>loginPw = ele}></input></td>
            </tr>
            <tr>
              <td></td>
              <td><button type="button" id="loginBtn" onClick={()=>{onLogin(loginUname,loginPw)}}>Login</button></td>
            </tr>
          </tbody>
        </table>
        <div className="alert alert-warning" role="alert" id="failMsg">
               <strong></strong><span id = "failText">{loginErrorMsg}</span>
        </div>
      </div>
    </div>
  )

}

const mapStateToProps = (state) => {
    return {
        loginErrorMsg: state.loginErrorMsg,
        headlines: state.headlines
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        goToMain: ()=> dispatch({type: 'TO_MAIN_PAGE'}),
        updateErrorMsg: (loginError) => dispatch({type:'LOGIN_ERROR',loginError}),
        registerUser: (newUser)=> dispatch({type:'REGISTER_NEW_USER',newUser}),
        addFollowerList: (followers) => dispatch({type:'ADD_FOLLOWER_LIST',followers}),
        addPosts: (posts) => dispatch({type:'UPDATE_POSTS',posts}),
        initializeFilteredPosts: (posts) => dispatch({type:'FILTERED_POSTS',posts}),
        updateHeadlines: (newHeadlines) => dispatch({type:'UPDATE_HEADLINE',newHeadlines})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);