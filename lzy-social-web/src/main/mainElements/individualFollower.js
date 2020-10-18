import React from 'react';
import ReactDOM from 'react-dom';

class IndividualFollower extends React.Component {

  render() {
    return (
        <div>
          <img width="200" height="200" src='https://www.sciencemag.org/sites/default/files/styles/article_main_large/public/cat_16x9.jpg?itok=1uV8V4Gl'/><br/>
          <br/>
          <span>follower name</span>
          <br/>
          <span>follower status</span>
          <br/>
          <button>Unfollow</button>
		</div>
		)
  }
}

export default IndividualFollower;