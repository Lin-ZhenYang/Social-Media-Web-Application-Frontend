import React from 'react';
import ReactDOM from 'react-dom';
//import IndividualFollower from './individualFollower';
import { connect } from 'react-redux';
import './mainElementsStyle.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class MainFollower extends React.Component {
  
    IndividualFollower = ({user}) => {
		const  removeFollower = (uid) => {
		  	var newFollowerList = this.props.followers;
		  	newFollowerList = newFollowerList.filter(follower => follower.id!=uid);
            this.removePosts(uid);
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

    removePosts = (uid) => {
    	let newPosts=[];
    	newPosts=this.props.posts.filter(post => post.userId != uid);
        this.props.updatePosts(newPosts);
        this.props.updateFilteredPosts([...newPosts]);
    }

    async addFollower(newFollower){
  	    newFollower = newFollower.trim();
	    if (newFollower.length>0){
	    	let validFollower = await this.checkValidFollower(newFollower);
	  		if (validFollower){
  		    	var newFollowerList = this.props.followers;
		  	    newFollowerList.push(validFollower);
		  	    this.props.addFollowerList([...newFollowerList]);
		  	    this.addNewFollowerPosts(validFollower.id,validFollower.username);
		  	    document.getElementById("addFailText").innerHTML = "New following added!";
	  		} else{
	  			document.getElementById("addFailText").innerHTML = "User does not exist!";
	  		}
  	    }
    }

    async checkValidFollower(newFollower){
    	let found = await fetch("https://jsonplaceholder.typicode.com/users")
            .then(response => response.json())
            .then(data => {
                for (var user of data){
                    if (user.username==newFollower){ 
                    	user["status"]= user.company.catchPhrase;
                        return user;     
                    }
                }
                return false;
        });
        return found;
    }

    addNewFollowerPosts = (uid,uname) => {
    	let newPosts=[];
        let fetchPost = fetch("https://jsonplaceholder.typicode.com/posts") .then(response => response.json())
            .then(data => {            	
	            newPosts=data.filter(post => post.userId == uid);
	            let i = 0;
	            for (i;i<newPosts.length;i++){
	              newPosts[i].time = "Fri May 04 2018 09:17:41 GMT-0500 (Central Daylight Time)";
	              newPosts[i].username = uname;
	              newPosts[i].comments = [{author:"Donaldinho",content:"QQQ 300"},{author:"Pumperino",content:"SPY 400"}];
	              
	            }	          
	            Array.prototype.push.apply(newPosts,this.props.posts); 
	            newPosts.sort(function(a,b){
                    return new Date(b.time) - new Date(a.time);
                });
	            this.props.updatePosts(newPosts);
                this.props.updateFilteredPosts([...newPosts]);
            });
    }

    render() {
	    return (
	        <div id="followersDiv">
	          {this.props.followers.map((person,index) => (
	          	<this.IndividualFollower key={person.id} user={person} />
	          ))}
	          <br/>
	          <input id="newFollowerInput"></input>
	          <button id="addFollowerBtn" onClick={()=>this.addFollower(document.getElementById("newFollowerInput").value)}>Add</button><br/>
	          <br/>
	          <div className="alert alert-warning" role="alert" id="failMsg">
                <strong></strong><span id = "addFailText"></span>
              </div>
	        </div>
	    )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        followers: state.followerList,
        posts:state.userPosts
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        addFollowerList: (followers) => dispatch({type:'ADD_FOLLOWER_LIST',followers}),
        updatePosts: (posts) => dispatch({type:'UPDATE_POSTS',posts}),
        updateFilteredPosts: (posts) => dispatch({type:'FILTERED_POSTS',posts})
    } 
};

export default connect(mapStateToProps, mapDispatchToProps)(MainFollower);

