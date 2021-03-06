import React from 'react';
import UpdateInfo from "./profileElements/updateInfo";
import UserPicUpdate from "./profileElements/userPicUpdate";
import { connect } from 'react-redux';
import './profile.css';

class Profile extends React.Component{
  onBackMain = () => {
    this.props.goToMain();
    this.props.updateRegisterWarning("");
    this.props.updateRegisterMsg("");
  }
  render() {
    return (
      <div >
        <h1 className="bigHeader">Profile Page</h1><br/>
        <button id="profileMainBtn" onClick={this.onBackMain} >Main Page</button>
        <br/>
        <div id='userPic'>
            <UserPicUpdate />
        </div>
        <br/>
        <UpdateInfo />
      </div>
    );
  }
}



const mapStateToProps = (state) => {
    return {
        user: state.user
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        goToMain: ()=> dispatch({type: 'TO_MAIN_PAGE'}),
        updateRegisterWarning:(pWarning)=> dispatch({type:'PROFILE_UPDATE_WARNING',pWarning}),
        updateRegisterMsg: (msg)=> dispatch({type:'PROFILE_UPDATE_MSG',msg})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);