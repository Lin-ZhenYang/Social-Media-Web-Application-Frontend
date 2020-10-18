import React from 'react';
import ReactDOM from 'react-dom';
import IndividualPost from './individualPost';

class posts extends React.Component {

  render() {
    return (
        <div>
		    <IndividualPost />
		    <IndividualPost />
		    <IndividualPost />
		    <IndividualPost />
		</div>
		)
  }
}

export default posts;