import React from 'react';
import ReactDOM from 'react-dom';
import './updateInfo.css';

class UserPicUpdate extends React.Component {

  render() {
    return (
        <div id="profilePicDiv">
          <img  width="200" height="200" src='https://static.toiimg.com/thumb/msid-67586673,width-800,height-600,resizemode-75,imgsize-3918697,pt-32,y_pad-40/67586673.jpg'/><br/>
		  <input id="profilePicUpload" type="file" /><br/>
		  <button id="profilePicUpBtn">Upload New Picture</button>
		</div>
		)
  }
}

export default UserPicUpdate;