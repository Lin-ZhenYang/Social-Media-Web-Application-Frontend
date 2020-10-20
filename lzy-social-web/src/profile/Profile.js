import React from 'react';
import ReactDOM from 'react-dom';
import UpdateInfo from "./profileElements/updateInfo";
import UserPicUpdate from "./profileElements/userPicUpdate";
import { connect } from 'react-redux';
import './profile.css';

class Profile extends React.Component{
  constructor(props) {
        super(props);
    }

  onBackMain = () => {
    this.props.goToMain();
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
        goToMain: ()=> dispatch({type: 'TO_MAIN_PAGE'})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);