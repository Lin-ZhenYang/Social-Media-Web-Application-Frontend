import React from 'react';
import ReactDOM from 'react-dom';
//import IndividualPost from './individualPost';
import { connect } from 'react-redux';

class Posts extends React.Component {
    constructor(props) {
        super(props);
    }

    IndividualPost = ({post}) => {
        return (
	        <div>
	            <span>Author: {this.props.user.username}</span><br/>
	            <span>Time : {post.time}</span><br/>
		        <img width="200" height="200" src='https://www.nationalgeographic.com/content/dam/news/2018/05/17/you-can-train-your-cat/02-cat-training-NationalGeographic_1484324.ngsversion.1526587209178.adapt.1900.1.jpg'/><br/>
	            <br/>
	            <span>{post.body}</span>
	            <br/>
	            <button>Edit</button>
	            <button>Comment</button>
			</div>
		)
    }

    render() {
	    return (
	        <div>
			    {this.props.posts.map((post,index) => (
			    	<this.IndividualPost key={post.id} post={post}/>
			    ))}
			</div>
			)
    }
}

const mapStateToProps = (state) => {
    return {
        posts:state.userPosts,
        user:state.user
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        
    } 
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);

