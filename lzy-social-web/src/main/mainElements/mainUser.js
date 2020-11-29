import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import './mainElementsStyle.css';

class MainUser extends React.Component{
    constructor(props) {
      super(props);
    }
    onLogout = () => {
      this.props.goToWelcome();
      this.props.logOut();
      this.props.registerError("");
      this.props.updateErrorMsg("");
    }

    onProfile = () => {
      this.props.goToProfile();
    }
    onUpdate = (newStatus) => {    
      if (newStatus){
        let newHeadlines = this.props.headlines;
        newHeadlines[this.props.user.username] = newStatus;
        this.props.updateHeadlines(Object.assign({},newHeadlines));  
        let headlineUrl = "http://localhost:8000/headline";
        let headlineData = {"headline":newStatus};
        let putPram={
              headers:{"content-type":"application/json"},
              body:JSON.stringify(headlineData),
              method:"PUT",
              credentials:"include"
            };
        fetch(headlineUrl,putPram);
      } 
    }
    render(){
      let newStatus;
      return (
      <div id="mainUserDiv">
        <button className="navBtn" id="mainLogoutBtn" onClick={this.onLogout}>Log Out</button>
        <button className="navBtn" id="mainProfileBtn" onClick={this.onProfile}>Profile</button><br/>
        <img width="200" height="200" src='https://static.toiimg.com/thumb/msid-67586673,width-800,height-600,resizemode-75,imgsize-3918697,pt-32,y_pad-40/67586673.jpg'/><br/>
        <span><b>{this.props.user.username}</b></span><br/>
        <span>{this.props.headlines[this.props.user.username]}</span><br/>
        <input type="text" id="mainNewStatus" placeholder="New Status" name="newStatus" ref={(ele)=>newStatus = ele}></input>
        <button id="mainStatusUpdBtn" onClick={()=>{this.onUpdate(document.getElementById('mainNewStatus').value)}}>Update</button>
      </div>
      )
    }
}


const mapStateToProps = (state) => {
    return {
        user: state.user,
        headlines: state.headlines
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        goToWelcome: ()=> dispatch({type: 'TO_WELCOME_PAGE'}),
        goToProfile: ()=> dispatch({type: 'TO_PROFILE_PAGE'}),
        updateHeadlines: (newHeadlines) => dispatch({type:'UPDATE_HEADLINE',newHeadlines}),
        logOut: ()=> dispatch({type: 'LOG_OUT'}),
        updateErrorMsg: (loginError) => dispatch({type:'LOGIN_ERROR',loginError}),
        registerError: (errorMsg)=> dispatch({type:"REGISTER_ERROR",errorMsg})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MainUser);
