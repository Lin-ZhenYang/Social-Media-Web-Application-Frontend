import React from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import './loginAndRegisStyle.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export const Login = ({goToMain, updateErrorMsg, loginErrorMsg,registerUser,addFollowerList,addPosts,initializeFilteredPosts,updateHeadlines,headlines,avatars,updateAvatars}) => {
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
      const loginUrl = "http://localhost:8000/login";
      let loginUser = {
          username: uname.value,
          password: pw.value
      }
      let otherPram={
          headers:{"content-type":"application/json"},
          body:JSON.stringify(loginUser),
          method:"POST",
          credentials:"include"
      }

      fetch(loginUrl,otherPram).then(response => {
        if (response.status == 401){
          loginError = "Unregistered user or incorrect password";
          updateErrorMsg(loginError);
        } else {
          loginError = "Login Success";
          updateErrorMsg(loginError);
          initializeData();
        }
      });
    }
    return true;
  }

  async function initializeData (){
      let username;
      let dob;
      let email;
      let phone;
      let zipcode;
      let status;
      let userid;
      let avatar;

      dob = await fetch ("http://localhost:8000/dob",{credentials:"include"}).then(response => response.json()).
      then(data => {
          username = data.username;
          return data.dob;
      });
      email = await fetch ("http://localhost:8000/email",{credentials:"include"}).then(response => response.json()).
      then(data => {return data.email;});
      phone = await fetch ("http://localhost:8000/phone",{credentials:"include"}).then(response => response.json()).
      then(data => {return data.phone;});
      zipcode = await fetch ("http://localhost:8000/zipcode",{credentials:"include"}).then(response => response.json()).
      then(data => {return data.zipcode;});
      status = await fetch ("http://localhost:8000/headline",{credentials:"include"}).then(response => response.json()).
      then(data => {return data.headline;});
      avatar = await fetch ("http://localhost:8000/avatar",{credentials:"include"}).then(response => response.json()).
      then(data => {return data.avatar;});
      let newUser = {
        username: username,
        dob: dob,
        email: email,
        phone: phone,
        zipcode: zipcode,
        status: status,
        avatar: avatar
      }
      registerUser(newUser);

      let followers = await fetch ("http://localhost:8000/following",{credentials:"include"}).then(response => response.json()).
      then(data => {return data.following;});
      addFollowerList(followers);

      let posts = await fetch ("http://localhost:8000/articles",{credentials:"include"}).then(response => response.json()).
      then(data => {return data.articles;});

      headlines[username]=status;
      avatars[username] = avatar;
      const initializeHeadlinesAndAvatars = async() => {
        for (const follower of followers){
          let followerHeadlineUrl = "http://localhost:8000/headline/"+follower;
          let followerHeadline = await fetch (followerHeadlineUrl,{credentials:"include"}).then(response => response.json()).
          then(data => {return data.headline;});
          let followerAvatarUrl = "http://localhost:8000/avatar/"+follower;
          let followerAvatar = await fetch(followerAvatarUrl,{credentials:"include"}).then(response => response.json()).
          then (data => {return data.avatar});
          headlines[follower]=followerHeadline;
          avatars[follower]=followerAvatar;
        }
      }

      
      await initializeHeadlinesAndAvatars();
      addPosts(posts);
      updateHeadlines(Object.assign({},headlines));
      updateAvatars(Object.assign({},avatars));
      initializeFilteredPosts([...posts]);
      goToMain();

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
        headlines: state.headlines,
        avatars: state.avatars
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
        updateHeadlines: (newHeadlines) => dispatch({type:'UPDATE_HEADLINE',newHeadlines}),
        updateAvatars: (newAvatars) => dispatch({type:'UPDATE_AVATARS',newAvatars})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);