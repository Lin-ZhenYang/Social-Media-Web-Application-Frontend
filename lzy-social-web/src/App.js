import React from 'react';
import './App.css';
import Login from './welcomePage/Login';
import Registration from './welcomePage/Registration';
import {withRouter} from "react-router-dom";

class App extends React.Component {
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

export default withRouter(App);
