import React from 'react';
import ReactDOM from 'react-dom';
//import IndividualFollower from './individualFollower';
import { connect } from 'react-redux';
import './mainElementsStyle.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class MainFollower extends React.Component {
  
    IndividualFollower = ({username,headline}) => {
		const  removeFollower = (username) => {
		  	var newFollowerList = this.props.followers;
		  	newFollowerList = newFollowerList.filter(follower => follower!=username);
            this.props.addFollowerList(newFollowerList);
            let deleteFollowerUrl = "http://localhost:8000/following/"+username;
            let deletePram={
              headers:{"content-type":"application/json"},
              method:"DELETE",
              credentials:"include"
            };
            fetch(deleteFollowerUrl,deletePram);
            let newPosts=[];
            newPosts=this.props.posts.filter(post => post.author != username);
            this.props.updatePosts(newPosts);
            this.props.updateFilteredPosts([...newPosts]);
		}
	    return (
		    <div id="singleFollowerDiv">
			    <img width="200" height="200" src={this.props.avatars[username]}/><br/>
			    <br/>
			    <span id="unameSpan">{username}</span>
			    <br/>
			    <span id="statusSpan">{headline}</span>
			    <br/>
			    <button id="followerRmBtn" onClick={()=>removeFollower(username)}>Unfollow</button>
			</div>
		)

    }

    async addFollower(newFollower){
  	    newFollower = newFollower.trim();
        if (newFollower.length>0){
            if (this.props.followers.includes(newFollower)){
                document.getElementById("addFailText").innerHTML = "Already followed!";
                console.log(this.props.followers);
            } else if (newFollower == this.props.user.username) {
                document.getElementById("addFailText").innerHTML = "Can't follow yourself!";
            } else {
                let addFollowerUrl = "http://localhost:8000/following/"+newFollower;
                let putPram={
                  headers:{"content-type":"application/json"},
                  method:"PUT",
                  credentials:"include"
                };
                await fetch(addFollowerUrl,putPram).then(response => response.json()).
                then(data => {
                    if (data.notfound && data.notfound=="notfound"){
                        document.getElementById("addFailText").innerHTML = "User "+newFollower+" does not exist!";
                    } else if (data.following) {
                        let updatedFollowers = data.following;
                        this.props.addFollowerList(updatedFollowers);
                        document.getElementById("addFailText").innerHTML = "User "+newFollower+" followed!";
                        let followerPostsUrl = "http://localhost:8000/articles/"+newFollower;
                        fetch(followerPostsUrl,{credentials:"include"}).then(response => response.json()).
                        then(data => {
                            let updatedPosts = this.props.posts;
                            updatedPosts = updatedPosts.concat(data.articles);
                            updatedPosts.sort(function(a,b){
                              return new Date(b.date) - new Date(a.date);
                            });
                            this.props.updatePosts([...updatedPosts]);
                            this.props.updateFilteredPosts([...updatedPosts]);
                        });
                        let followerAvatarUrl = "http://localhost:8000/avatar/"+newFollower;
                        fetch(followerAvatarUrl,{credentials:"include"}).then(response => response.json()).
                        then(data => {
                            let newAvatars = this.props.avatars;
                            newAvatars[newFollower]=data.avatar;
                            this.props.updateAvatars(Object.assign({},newAvatars));
                        });
                        let headlineUrl = "http://localhost:8000/headline/"+newFollower;
                        fetch(headlineUrl,{credentials:"include"}).then(response => response.json()).
                        then(data => {
                            let newHeadlines = this.props.headlines;
                            newHeadlines[newFollower]=data.headline;
                            this.props.updateHeadlines(Object.assign({},newHeadlines));
                        });
                    }
                });
            }
        }
    }

    render() {
	    return (
	        <div id="followersDiv">
	          {this.props.followers.map((person,index) => (
	          	<this.IndividualFollower key={person.id} username={person} headline={this.props.headlines[person]} />
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
        posts:state.userPosts,
        headlines: state.headlines,
        avatars:state.avatars
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        addFollowerList: (followers) => dispatch({type:'ADD_FOLLOWER_LIST',followers}),
        updatePosts: (posts) => dispatch({type:'UPDATE_POSTS',posts}),
        updateFilteredPosts: (posts) => dispatch({type:'FILTERED_POSTS',posts}),
        updateAvatars: (newAvatars) => dispatch({type:'UPDATE_AVATARS',newAvatars}),
        updateHeadlines: (newHeadlines) => dispatch({type:'UPDATE_HEADLINE',newHeadlines})
    } 
};

export default connect(mapStateToProps, mapDispatchToProps)(MainFollower);

