import React from 'react';
import ReactDOM from 'react-dom';
import './newPost.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';

class newPost extends React.Component {

  render() {
    return (
        <div>
            <h3>Want to post something?</h3>
		    <div>
              <input type="text" placeholder="Enter text for new post here: " /><br/>
              <span><FontAwesomeIcon icon={faImage}/>Upload Picture Here: </span><input type="file"/>
            </div><br />
            <div className='flexrow'>
              <button id="mainCancelBtn">Cancel</button>
              <button id="mainPostBtn">Post</button>
            </div>
		</div>
		)
  }
}

export default newPost;