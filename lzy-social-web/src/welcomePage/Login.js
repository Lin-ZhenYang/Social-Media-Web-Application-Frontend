import React from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import {withRouter} from "react-router-dom";

class Login extends React.Component {
  onLogin = () => {
  	this.props.history.push('/main');
  }

  render() {
    return (
        <div>
		  <div id="loginForm">
		    <form>
		      <span><FontAwesomeIcon icon={faUser}/></span><input type="text" id="loginUsr" name="loginUsr" placeholder="username"></input><br/>
		      <span><FontAwesomeIcon icon={faKey}/></span><input type="text" id="loginPwd" name="loginPwd" placeholder="password"></input><br/>
		      <button type="button" id="loginBtn" onClick={this.onLogin}>Login</button>
		    </form>
		  </div>
		</div>
		)
  }
}

export default withRouter(Login);