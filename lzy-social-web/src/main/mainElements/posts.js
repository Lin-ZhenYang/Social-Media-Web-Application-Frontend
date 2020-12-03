import React from 'react';
import { connect } from 'react-redux';
import './newPost.css';

class Posts extends React.Component {
    IndividualPost = ({post,index}) => {
    	
    	this.handleShowHide = (postId) =>{
    		if(document.getElementById(postId).style.display==="block"){
    			document.getElementById(postId).style.display="none";
    		} else{
                document.getElementById(postId).style.display="block";
    		}
    	}

    	this.handleEditBtn = (postId) => {
    		let editId = postId + "edit";
    		if(document.getElementById(editId).style.display==="block"){
    			document.getElementById(editId).style.display="none";
    		} else{
                document.getElementById(editId).style.display="block";
    		}
    	}

    	this.handleCommentBtn = (postId) => {
    		let cmtId = postId+"comment";
    		if(document.getElementById(cmtId).style.display==="block"){
    			document.getElementById(cmtId).style.display="none";
    		} else{
                document.getElementById(cmtId).style.display="block";
    		}
    	}

    	this.handleEditSubmitBtn = (postId,index) => {
    		let commentNumber = document.getElementById(postId+"num").value;
    		let newContent = document.getElementById(postId+"text").value;
    		newContent = newContent.trim();
    		let contentType = document.getElementById(postId+"type").value;
    		let eMsgId = postId + "emsg";
    		let post = this.props.filteredPosts[index];

    		if (!newContent){
    				document.getElementById(eMsgId).innerHTML = "Empty content not allowed.";
    				return;
    			}

            let putArticleUrl = "http://localhost:8000/articles/" + post._id;
    		if (contentType == "toEditArticle") {
    			if (this.props.user.username != post.author){
    				document.getElementById(eMsgId).innerHTML = "You do not own this article.";
    				return;
    			}
    			let dataA = {"text":newContent};
    			let putPramA = {
    				headers:{"content-type":"application/json"},
    				body:JSON.stringify(dataA),
    				method:"PUT",
    				credentials:"include"
    			};
    			fetch(putArticleUrl,putPramA).then(response => response.json()).
    		    then(data => {
                    let newPost = data.articles[0];
                    post.text = newPost.text;
                    this.props.updateFilteredPosts([...this.props.filteredPosts]);
                    const found = this.props.posts.find(element => element._id == postId);
                    found.text = newPost.text;
                    this.props.addPosts([...this.props.posts]);
                    document.getElementById(eMsgId).innerHTML = "Updated."
                });

    		} else {
    			if (!commentNumber){
    				document.getElementById(eMsgId).innerHTML = "Enter index of comment.";
    				return;
    			}
    			if (commentNumber > post.comments.length || commentNumber<0){
    				document.getElementById(eMsgId).innerHTML = "Invalid index.";
    				return;
    			}
    		    if (post.comments[commentNumber-1].author != this.props.user.username){
    		    	document.getElementById(eMsgId).innerHTML = "You do not own this comment.";
    		    	return;
    		    }
    		    let dataC = {
    		    	"commentId":post.comments[commentNumber-1]._id,
    		    	"text": newContent};
    		    let putPramC = {
    		    	headers:{"content-type":"application/json"},
    		    	body:JSON.stringify(dataC),
    		    	method:"PUT",
    		    	credentials:"include"
    		    };
    		    fetch(putArticleUrl,putPramC).then(response => response.json()).
    		    then(data => {
                    let newPost = data.articles[0];
                    post.comments = newPost.comments;
                    this.props.updateFilteredPosts([...this.props.filteredPosts]);
                    const found = this.props.posts.find(element => element._id == postId);
                    found.comments = newPost.comments;
                    this.props.addPosts([...this.props.posts]);
                    document.getElementById(eMsgId).innerHTML = "Updated."
                });
    		}

    	}

    	this.handleCommentSubmitBtn = (postId,index) => {
    		let commentInputId = postId + "commentText";
    		let newComment = document.getElementById(commentInputId).value;
    		let cMsgId = postId + "cmsg";
    		let post = this.props.filteredPosts[index];
            let newFilteredPosts = this.props.filteredPosts;
    		newComment = newComment.trim();
    		let putArticleUrl = "http://localhost:8000/articles/" + post._id;
    		if (newComment){
    			let data = {
    				"commentId":-1,
    				"text": newComment
    			};
    			let putPram = {
    				headers:{"content-type":"application/json"},
    				body:JSON.stringify(data),
    				method:"PUT",
    				credentials:"include"
    		    };
    		    fetch(putArticleUrl,putPram).then(response => response.json()).
    		    then(data => {
    		    	let newPost = data.articles[0];
                    post.comments = newPost.comments;
                    this.props.updateFilteredPosts([...this.props.filteredPosts]);
                    const found = this.props.posts.find(element => element._id == postId);
                    found.comments = newPost.comments;
                    this.props.addPosts([...this.props.posts]);
                    document.getElementById(cMsgId).innerHTML = "Updated."
    		    });
    		} else {
    			document.getElementById(cMsgId).innerHTML = "Empty content not allowed.";
    			return;
    		}
    		
    	}

    	
        return (
	        <div id='eachPostDiv'>
	            <span style={{color:"blue"}}>Author: {post.author}</span><br/>
                <span style={{color:"blue"}}>Time : {post.date.substring(0,10)} {post.date.substring(11,19)} </span><br/>
                <img width="200" height="200" src={post.image} className="center" style={{display: (post.image ? 'block' : 'none')}}/><br/>
                <br/>
                <span>{post.text}</span>
                <br/>
                <br/>
                <button id='editBtn' onClick={()=>{this.handleEditBtn(post._id)}}>Edit</button>
                <button id='commentBtn' onClick={()=>{this.handleCommentBtn(post._id)}}>Comment</button>
                <br/>
                <button id='showHideCommentBtn' onClick={()=>{this.handleShowHide(post._id)}}>Show/Hide Comments</button>
                <div id={post._id+"edit"} style={{display: "none", backgroundColor:"#d5e8f5"}}>
                    <br/>
                    <span>Select Which to Edit: </span>
                    <select name="whichToEdit" id={post._id+"type"}>
                      <option value="toEditArticle">Article</option>
                      <option value="toEditComment">Comment</option>
                    </select>
                    <br/>
                    <br/>
                    <span>New Content: </span><br/>
                    <textarea id={post._id+"text"}/><br/>
                    <span>Comment Index (For Comment Editing Only): </span><br/>
                    <input type="number" id={post._id+"num"}/><br/>
                    <button onClick={() => {this.handleEditSubmitBtn(post._id,index)}}>Make Edit</button>
                    <br/>
                    <span style={{color:"red"}} id={post._id+"emsg"}></span>
                </div>
                <div id={post._id+"comment"} style={{display: "none", backgroundColor:"#e4d9fa"}}>
                    <br/>
                    <input type="textarea" id={post._id+"commentText"}/><button onClick={() => {this.handleCommentSubmitBtn(post._id,index)}}>Comment</button><br/>
                    <span style={{color:"red"}} id={post._id+"cmsg"}></span>
                    <br/>
                </div>
                <div id={post._id} style={{display: "block"}}>
                    <ol>
                        {post.comments.map(comment => {
                            return (
                                <li key={comment._id}>{comment.author} :  {comment.body}</li>
                            );
                        })}
                    </ol>
                </div>
			</div>
		);
    }

    render() {
	    return (
	        <div id="postsDiv">
                {this.props.filteredPosts.map((post,index) => (
                    <this.IndividualPost key={post._id} post={post} index={index}/>
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
        updateFilteredPosts: (posts) => dispatch({type:'FILTERED_POSTS',posts}),
        addPosts: (posts) => dispatch({type:'UPDATE_POSTS',posts})
    } 
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);

