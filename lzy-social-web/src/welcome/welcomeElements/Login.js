import React from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';


export const Login = ({goToMain}) => {
  
  const onLogin = () => {
  	goToMain();
  }

  return (
    <div>
	  <div id="loginForm">
	    <form>
	      <span><FontAwesomeIcon icon={faUser}/></span><input type="text" id="loginUsr" name="loginUsr" placeholder="username"></input><br/>
	      <span><FontAwesomeIcon icon={faKey}/></span><input type="text" id="loginPwd" name="loginPwd" placeholder="password"></input><br/>
	      <button type="button" id="loginBtn" onClick={onLogin}>Login</button>
	    </form>
	  </div>
	</div>
  )

}

// export default connect (
// 	(dispatch) => ({ goToMain: ()=> dispatch({type: 'TO_MAIN_PAGE'})

// 					})
// 	)(Login)
const mapStateToProps = (state) => {
    return {
        
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        goToMain: ()=> dispatch({type: 'TO_MAIN_PAGE'})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);