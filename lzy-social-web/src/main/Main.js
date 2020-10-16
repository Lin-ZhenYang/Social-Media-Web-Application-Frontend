import React from 'react';
import ReactDOM from 'react-dom';
import {withRouter} from "react-router-dom";

class Main extends React.Component {
  onLogout = () => {
  	this.props.history.push('/');
  }

  onProfile = () => {
  	this.props.history.push('/profile');
  }

  render() {
    return (
        <div>
		  <h1>MAIN</h1>
		  <button id="mainLogoutBtn" onClick = {this.onLogout}>Log Out</button>
		  <button id="mainProfileBtn" onClick = {this.onProfile}>Profile</button>
		</div>
		)
  }
}

export default withRouter(Main);