import React from 'react';
import ReactDOM from 'react-dom';
import IndividualFollower from './individualFollower';

class mainFollower extends React.Component {

  render() {
    return (
        <div>
          <IndividualFollower />
          <IndividualFollower />
          <IndividualFollower />
        </div>
    )
  }
}

export default mainFollower;