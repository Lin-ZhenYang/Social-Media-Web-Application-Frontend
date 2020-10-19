import React from 'react';
import ReactDOM from 'react-dom';
import UpdateInfo from "./profileElements/updateInfo";
import UserPicUpdate from "./profileElements/userPicUpdate";
import { connect } from 'react-redux';

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
        <button id="profileMainBtn" onClick={this.onBackMain} >Main Page</button>
        <br/>
        <UserPicUpdate />
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