import React from 'react';
import ReactDOM from 'react-dom';
import './newPost.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import './newPost.css';

class NewPost extends React.Component {
    constructor(props) {
        super(props);
    }

    onCancelHandler = () => {
        document.getElementById("newPostTextInput").value = null;
        document.getElementById("newPostImageInput").value = null;
    }

    onPostHandler = (postText)=>{
        postText = postText.trim();
        if (postText.length>0){
            var newPost ={
                userId: this.props.user.userid,
                id: 1000,
                body: postText,
                time: Date().toLocaleString(),
                username:this.props.user.username,
                comments:[]

            }
            let posts = [...this.props.posts];
            console.log(posts);
            posts.unshift(newPost);
            this.props.updatePosts(posts);
            this.props.updateFilteredPosts([...posts]);
        }
    }
    render() {
        return (
            <div id='newPostDiv'>
                <h3>Want to post something?</h3>
		            <div>
                    <textarea id="newPostTextInput" type="text" placeholder="Enter text for new post here: " /><br/>
                    <span><FontAwesomeIcon icon={faImage}/>Upload Picture Here: </span><input id="newPostImageInput" type="file"/>
                </div><br />
                    <div className='flexrow'>
                    <button className="newPostBtn" id="newPostClearBtn" onClick={()=>{this.onCancelHandler()}}>Cancel</button>
                    <button className="newPostBtn" id="newPostPostBtn" onClick={()=>{this.onPostHandler(document.getElementById("newPostTextInput").value)}} >Post</button>
                </div>
		        </div>
		  )
  }
}

const mapStateToProps = (state) => {
    return {
        posts: state.userPosts,
        user: state.user
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        updatePosts: (posts) => dispatch({type:'UPDATE_POSTS',posts}),
        updateFilteredPosts: (posts) => dispatch({type:'FILTERED_POSTS',posts})
    } 
};

export default connect(mapStateToProps, mapDispatchToProps)(NewPost);

