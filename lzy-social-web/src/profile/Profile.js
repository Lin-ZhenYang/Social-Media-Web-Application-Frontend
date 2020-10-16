import React from 'react';
import ReactDOM from 'react-dom';
import {withRouter} from "react-router-dom";

class Profile extends React.Component {
  onBackMain = () => {
  	this.props.history.push('/main');
  }

  render() {
    return (
        <div>
		  <h1>Profile</h1>
		  <button id="profileMainBtn" onClick = {this.onBackMain}>Main Page</button>
		</div>
		)
  }
}

export default withRouter(Profile);