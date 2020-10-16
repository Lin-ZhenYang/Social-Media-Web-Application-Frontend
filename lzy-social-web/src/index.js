import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { createStore } from 'redux';
import './index.css';

import App from './App';
import * as serviceWorker from './serviceWorker';
import Main from './main/Main';
import Profile from './profile/Profile';



ReactDOM.render(
  <React.StrictMode>
      <Router>
          <Switch>
              <Route exact path={"/"}>
                  <App />
              </Route>
              <Route exact path={"/main"}>
                  <Main />
              </Route>
              <Route exact path={"/profile"}>
                  <Profile />
              </Route>
          </Switch>
      </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
