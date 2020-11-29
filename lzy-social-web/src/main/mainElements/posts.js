import React from 'react';
import ReactDOM from 'react-dom';
//import IndividualPost from './individualPost';
import { connect } from 'react-redux';
import './newPost.css';

class Posts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            commentDisplay: "block",
        };
    }
    
    

    IndividualPost = ({post}) => {
    	
    	this.handleShowHide = (postId) =>{
    		if(document.getElementById(postId).style.display=="block"){
    			document.getElementById(postId).style.display="none";
    		} else{
                document.getElementById(postId).style.display="block";
    		}
    	}

        return (
	        <div id='eachPostDiv'>
	            <span>Author: {post.author}</span><br/>
	            <span>Time : {post.date.substring(0,10)} {post.date.substring(11,19)} </span><br/>
		        <img width="200" height="200" src='https://www.nationalgeographic.com/content/dam/news/2018/05/17/you-can-train-your-cat/02-cat-training-NationalGeographic_1484324.ngsversion.1526587209178.adapt.1900.1.jpg'/><br/>
	            <br/>
	            <span>{post.text}</span>
	            <br/>
	            <button id='editBtn'>Edit</button>
	            <button id='commentBtn'>Comment</button>
	            <br/>
	            <button id='showHideCommentBtn' onClick={()=>{this.handleShowHide(post._id)}}>Show/Hide Comments</button>
	            <div id={post._id} style={{display: "block"}}>
	                {post.comments.map(comment => {
	                	return (
	                		<li>{comment.author} :  {comment.body}</li>
	                    );
	                })}
	            </div>
			</div>
		);
    }

    render() {
	    return (
	        <div id="postsDiv">
			    {this.props.filteredPosts.map((post,index) => (
			    	<this.IndividualPost key={post.id} post={post}/>
			    ))}
			</div>
			)
    }
}

const mapStateToProps = (state) => {
    return {
        posts:state.userPosts,
        user:state.user,
        filteredPosts: state.filteredPosts
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        
    } 
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);

