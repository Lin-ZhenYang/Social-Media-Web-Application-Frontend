import React from 'react';
import ReactDOM from 'react-dom';
//import IndividualFollower from './individualFollower';
import { connect } from 'react-redux';
import './mainElementsStyle.css';

class MainFollower extends React.Component {
  
    IndividualFollower = ({user}) => {
		const  removeFollower = (uid) => {
		  	var newFollowerList = this.props.followers;
		  	newFollowerList = newFollowerList.filter(follower => follower.id!=uid);
		  	this.props.addFollowerList(newFollowerList);
		}
	    return (
		    <div id="singleFollowerDiv">
			    <img width="200" height="200" src='https://www.sciencemag.org/sites/default/files/styles/article_main_large/public/cat_16x9.jpg?itok=1uV8V4Gl'/><br/>
			    <br/>
			    <span id="unameSpan">{user.name}</span>
			    <br/>
			    <span id="statusSpan">{user.status}</span>
			    <br/>
			    <button id="followerRmBtn" onClick={()=>removeFollower(user.id)}>Unfollow</button>
			</div>
		)

    }

    addFollower = (newFollower) =>{
  	    newFollower = newFollower.trim();
	  	    if (newFollower.length>0){
	  		var newFollower = {
	  		    name: newFollower,
	  		    status: "hello i am new follower"
	  	    }
	  	    var newFollowerList = this.props.followers;
	  	    newFollowerList.push(newFollower);
	  	    this.props.addFollowerList([...newFollowerList]);
  	    }
    }

    render() {
	    return (
	        <div id="followersDiv">
	          {this.props.followers.map((person,index) => (
	          	<this.IndividualFollower key={person.id} user={person} />
	          ))}
	          <br/>
	          <input id="newFollowerInput"></input>
	          <button id="addFollowerBtn" onClick={()=>this.addFollower(document.getElementById("newFollowerInput").value)}>Add</button>
	        </div>
	    )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        followers: state.followerList
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        addFollowerList: (followers) => dispatch({type:'ADD_FOLLOWER_LIST',followers})
    } 
};

export default connect(mapStateToProps, mapDispatchToProps)(MainFollower);

