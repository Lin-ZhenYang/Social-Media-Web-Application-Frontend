import React from 'react';
import './welcome.css';
import Login from './welcomeElements/Login';
import Registration from './welcomeElements/Registration';

class Welcome extends React.Component {
    render() {
        return (
          <div>
              <h1 className="bigHeader">Welcome to HTX Social Club</h1>
              <div  className='container rowC'>
                  <div id="loginSection" className = 'container'>
                      <Login />
                  </div>
                  <div id="regisSection" className = 'container'>
                      <Registration />
                  </div>
              </div>
          </div>
        );
    }
}

export default Welcome;
