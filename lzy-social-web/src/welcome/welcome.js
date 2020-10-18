import React from 'react';
import './welcome.css';
import Login from './welcomeElements/Login';
import Registration from './welcomeElements/Registration';

class Welcome extends React.Component {
    render() {
        return (
          <div>
              <h1>welcomepage</h1>
              <div  className='rowC'>
                  <Login />
                  <Registration />
              </div>
            </div>
        );
    }
}

export default Welcome;
