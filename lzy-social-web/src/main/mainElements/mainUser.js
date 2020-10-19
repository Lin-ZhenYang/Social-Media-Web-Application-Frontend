import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

class MainUser extends React.Component{
    constructor(props) {
      super(props);
    }
    onLogout = () => {
      this.props.goToWelcome();
    }

    onProfile = () => {
      this.props.goToProfile();
    }
    onUpdate = (newStatus) => {
      let userUpdated = this.props.user;
      if (newStatus){
        userUpdated.status = newStatus;
        this.setState({user : userUpdated});
        this.props.registerUser(userUpdated);
      }
    }
    render(){
      let newStatus;
      return (
      <div>
        <button id="mainLogoutBtn" onClick={this.onLogout}>Log Out</button>
        <button id="mainProfileBtn" onClick={this.onProfile}>Profile</button><br/>
        <img width="200" height="200" src='https://static.toiimg.com/thumb/msid-67586673,width-800,height-600,resizemode-75,imgsize-3918697,pt-32,y_pad-40/67586673.jpg'/><br/>
        <span><b>{this.props.user.username}</b></span><br/>
        <span>{this.props.user.status}</span><br/>
        <input type="text" id="mainNewStatus" placeholder="New Status" name="newStatus" ref={(ele)=>newStatus = ele}></input>
        <button id="mainStatusUpdBtn" onClick={()=>{this.onUpdate(document.getElementById('mainNewStatus').value)}}>Update</button>
      </div>
      )
    }
}


const mapStateToProps = (state) => {
    return {
        user: state.user
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        goToWelcome: ()=> dispatch({type: 'TO_WELCOME_PAGE'}),
        goToProfile: ()=> dispatch({type: 'TO_PROFILE_PAGE'}),
        registerUser: (newUser)=> dispatch({type:'REGISTER_NEW_USER',newUser})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MainUser);
