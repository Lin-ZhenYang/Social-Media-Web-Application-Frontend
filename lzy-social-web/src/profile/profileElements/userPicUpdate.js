import React from 'react';
import './updateInfo.css';
import { connect } from 'react-redux';

class UserPicUpdate extends React.Component {

	onUploadHandler = () => {
		const picUrl = "https://lzy-social-backend.herokuapp.com/image";
		var picFile = document.getElementById("profilePicUpload").files[0]; 
		if (picFile){
			var formData = new FormData();
	        formData.append("title","");
	        formData.append("image",picFile);

	        let postPram={
	            body:formData,
	            method:"POST",
	            credentials:"include"
	        }
	        fetch(picUrl,postPram).then(response => response.json()).then(data => {
	        	var updatedUser = this.props.user;
	        	updatedUser.avatar = data.url;
	        	this.props.registerUser(Object.assign({},updatedUser));

	        	let avatarPutUrl = "https://lzy-social-backend.herokuapp.com/avatar";
	        	let avatarData = {avatar:data.url};
	        	let putPram ={
	        		headers:{"content-type":"application/json"},
			        body:JSON.stringify(avatarData),
			        method:"PUT",
			        credentials:"include"
	        	}
	        	fetch(avatarPutUrl,putPram);
	        });
		} else {
			console.log("empty");
		}
	}

    render() {
	    return (
	        <div id="profilePicDiv">
	          <img  width="200" height="200" src={this.props.user.avatar}/><br/>
			  <input id="profilePicUpload" type="file" /><br/>
			  <button id="profilePicUpBtn" onClick={()=>{this.onUploadHandler()}}>Upload New Picture</button>
			</div>
		)
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.user
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
    	registerUser: (newUser)=> dispatch({type:'REGISTER_NEW_USER',newUser})
    } 
};
export default connect(mapStateToProps, mapDispatchToProps)(UserPicUpdate);