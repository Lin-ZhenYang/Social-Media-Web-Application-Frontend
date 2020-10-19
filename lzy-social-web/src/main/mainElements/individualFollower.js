import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

const IndividualFollower = ({user}) => {
  const  removeFollower = (uid) => {
    console.log(self.state);
  }
  return (
      <div>
        <img width="200" height="200" src='https://www.sciencemag.org/sites/default/files/styles/article_main_large/public/cat_16x9.jpg?itok=1uV8V4Gl'/><br/>
        <br/>
        <span>{user.name}</span>
        <br/>
        <span>{user.status}</span>
        <br/>
        <button id="followerRmBtn" onClick={()=>removeFollower(user.id)}>Unfollow</button>
	</div>
	)

}

const mapStateToProps = (state) => {
    return {
        followers: state.followerList
    }
};
const mapDispatchToProps = (dispatch) => {
    return {

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(IndividualFollower);
