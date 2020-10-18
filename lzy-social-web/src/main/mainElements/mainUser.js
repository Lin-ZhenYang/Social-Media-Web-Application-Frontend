import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

export const MainUser = ({goToWelcome, goToProfile}) => {

  const onLogout = () => {
    goToWelcome();
  }

  const onProfile = () => {
    goToProfile();
  }
  return (
      <div>
        <button id="mainLogoutBtn" onClick={onLogout}>Log Out</button>
        <button id="mainProfileBtn" onClick={onProfile}>Profile</button><br/>
        <img width="200" height="200" src='https://static.toiimg.com/thumb/msid-67586673,width-800,height-600,resizemode-75,imgsize-3918697,pt-32,y_pad-40/67586673.jpg'/><br/>
        <span><b>ORANGE CAT</b></span><br/>
        <span>meow meow meow</span><br/>
        <input type="text" placeholder="New Status" /><button id="mainStatusUpdBtn">Update</button>
	    </div>
	)
}

const mapStateToProps = (state) => {
    return {
        
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        goToWelcome: ()=> dispatch({type: 'TO_WELCOME_PAGE'}),
        goToProfile: ()=> dispatch({type: 'TO_PROFILE_PAGE'})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MainUser);