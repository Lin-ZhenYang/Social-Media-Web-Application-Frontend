import React from 'react';
import ReactDOM from 'react-dom';
import CurrentInfo from "./profileElements/currentInfo";
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
        <table>
          <tbody>
            <tr>
              <td><UserPicUpdate /></td>
              <td></td>
            </tr>
            <tr>
              <td><CurrentInfo /></td>
              <td><UpdateInfo /></td>
            </tr>
          </tbody>
        </table>
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