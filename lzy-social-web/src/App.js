import React from 'react';
import './App.css';
import Welcome from './welcome/welcome';
import Main from './main/Main';
import Profile from './profile/Profile';
import { connect} from 'react-redux';

const App = ({location}) => {
  let currView;
  if (location==="main"){
    currView = <Main />;
  } else if (location==="profile"){
    currView = <Profile />
  } else {
    currView = <Welcome />
  }
  return(
    <div>
      {currView}
    </div>
  )
  
}

export default connect((state)=>{
  return {location: state.location}
})(App)