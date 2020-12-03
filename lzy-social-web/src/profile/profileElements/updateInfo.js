import React from 'react';
import { connect } from 'react-redux';
import './updateInfo.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class UpdateInfo extends React.Component{
	constructor(props) {
        super(props);
    }
    updateBtnHandler = (uname,dob,email,phone,zipcode,pw1,pw2) => {
		this.validateInfo(uname,dob,email,phone,zipcode,pw1,pw2);
	  }
    validateInfo =(uname, dob, email, phone, zipcode, pw1, pw2) => {
		var updateMsg = "";
		var warning = "";
		var success = true;
	    var newuser  = this.props.user;

	    // if (uname && uname.value.length!=0){
	    // 	var unameReg=/^([a-zA-Z]{1})([a-zA-Z0-9]{1})+$/;
	    // 	if (!uname.value.match(unameReg)){
	    // 		warning += "Wrong user name format: only letters and numbers allowed. First character has to be letter. ";
	    // 		success=false;
	    // 	} else{
	    // 		updateMsg+="Username updated. ";
	    // 		newuser.username = uname.value;
	    // 	}
	    // }
	    
	    if (dob && dob.value.length!=0){
	    	var dobInput = dob.value;
		    var dobFormat = /^[0-9]{2}-[0-9]{2}-[0-9]{4}$/;
		    if (!dobInput.match(dobFormat)){
				warning+="Birthday has wrong format! Example format: 02-11-1946 (MM-DD-YYYY) ";
				success=false;
			} else{
	    		updateMsg+="Date of birth updated. ";
	    		newuser.dob = dob.value;
	    		let dobUrl = "http://localhost:8000/dob";
	    		let dobData = {"dob":dob.value};
	    		let putPram={
		          headers:{"content-type":"application/json"},
		          body:JSON.stringify(dobData),
		          method:"PUT",
		          credentials:"include"
		        };
	    		fetch(dobUrl,putPram);
	    	}
	    }

		if (email && email.value.length!=0){
			if (!(/\S+@\S+\.\S+/.test(email.value))){
				warning +="Email has wrong format. Example format: owls@rice.edu. ";
				success = false;
			} else{
	    		updateMsg+="Email updated. ";
	    		newuser.email = email.value;
	    		let emailUrl = "http://localhost:8000/email";
	    		let emailData = {"email":email.value};
	    		let putPram={
		          headers:{"content-type":"application/json"},
		          body:JSON.stringify(emailData),
		          method:"PUT",
		          credentials:"include"
		        };
	    		fetch(emailUrl,putPram);
	    	}
		}
	    
	 
	     
		if (phone && phone.value.length!=0 ){
			var phoneInput = phone.value;
		    var phoneFormat = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
			if (!phoneInput.match(phoneFormat)){
				warning+="Phone number has wrong format! Example format: 111-222-3333 ";
				success=false;
			} else{
	    		updateMsg+="Phone number updated. ";
	    		newuser.phone = phone.value;
	    		let phoneUrl = "http://localhost:8000/phone";
	    		let phoneData = {"phone":phone.value};
	    		let putPram={
		          headers:{"content-type":"application/json"},
		          body:JSON.stringify(phoneData),
		          method:"PUT",
		          credentials:"include"
		        };
	    		fetch(phoneUrl,putPram);
	    	}
		}


		if (zipcode && zipcode.value.length!=0){
			var zipInput = zipcode.value;
			var zipFormat = /^[0-9]{5}$/;
			if (!zipInput.match(zipFormat)){
				warning+="Zipcode has wrong format! Example format: 78705 ";
				success=false; 
			} else{
	    		updateMsg+="Zipcode updated. ";
	    		newuser.zipcode = zipcode.value;
	    		let zipcodeUrl = "http://localhost:8000/zipcode";
	    		let zipcodeData = {"zipcode":zipcode.value};
	    		let putPram={
		          headers:{"content-type":"application/json"},
		          body:JSON.stringify(zipcodeData),
		          method:"PUT",
		          credentials:"include"
		        };
	    		fetch(zipcodeUrl,putPram);
	    	}
		}
	   
	    if (pw1 && pw2 && pw1.value.length!=0 && pw2.value.length!=0){
	    	var pwd1Input = pw1.value;
			var pwd2Input =pw2.value ;
			if (pwd1Input!=pwd2Input){
				success = false;
				warning += "Passwords do not match! ";
			} else{
	    		updateMsg+="Password updated. ";
	    		newuser.password = pw1.value;
	    		let pwUrl = "http://localhost:8000/password";
	    		let pwData = {"password":pw1.value};
	    		let putPram={
		          headers:{"content-type":"application/json"},
		          body:JSON.stringify(pwData),
		          method:"PUT",
		          credentials:"include"
		        };
	    		fetch(pwUrl,putPram);

	    	}
	    }

	    this.props.registerUser(Object.assign({},newuser));
		this.props.updateRegisterMsg(updateMsg);
		this.props.updateRegisterWarning(warning);
		// if (success){
		// 	this.props.registerUser(Object.assign({},newuser));
		// 	this.props.updateRegisterMsg(updateMsg);
		// 	this.props.updateRegisterWarning("");
		// 	return true;
		// } else{
		// 	this.props.updateRegisterWarning(warning);
		// 	this.props.updateRegisterMsg("");
		// 	return false;
		// }
	}


	render(){
	  	let unameU;
		let dobU;
		let emailU;
		let phoneU;
		let zipcodeU;
		let pw1U;
		let pw2U;
	  	return (
	    <div>
	        <div className='container rowC'>
		        <div className='container currInfo'>
				    <table className="table">
				       <thead>
					    <tr>
					      <th scope="col">Items</th>
					      <th scope="col">Current Info</th>
					    </tr>
					   </thead>
				       <tbody>
					       <tr>
					         <td>User Name</td><td>{this.props.user.username}</td>
					       </tr>
					       <tr>
					         <td>Date of Birth</td><td>{this.props.user.dob}</td>
					       </tr>
					       <tr>
					         <td>Email Address</td><td>{this.props.user.email}</td>
					       </tr>
					       <tr>
					         <td>Phone Number</td><td>{this.props.user.phone}</td>
					       </tr>
					       <tr>
					         <td>Zipcode</td><td>{this.props.user.zipcode}</td>
					       </tr>
					     </tbody>
				    </table>
			    </div>
		        <div className='container updateInfo'>
				    <table className="table">
					  <thead>
					    <tr>
					      <th scope="col">Items</th>
					      <th scope="col">New Values</th>
					    </tr>
					  </thead>
					  <tbody>
					  	<tr>
					      <th scope="row">User Name</th>
					      <td><input type="text" ref={(ele)=>unameU = ele} name="unameUpd" id="unameUpd" disabled></input></td>
					    </tr>
					    <tr>
					      <th scope="row">Date of Birth</th>
					      <td><input type="text" name="dobUpd" ref={(ele)=>dobU = ele} id="dobUpd"></input></td>
					    </tr>
					    <tr>
					      <th scope="row">Email Address</th>
					      <td><input type="text" name="emailUpd" ref={(ele)=>emailU = ele} id="emailUpd" ></input></td>
					    </tr>
					    <tr>
					      <th scope="row">Phone Number</th>
					      <td><input type="text" name="phoneUpd" ref={(ele)=>phoneU = ele} id="phoneUpd" ></input></td>
					    </tr>
					    <tr>
					      <th scope="row">Zipcode</th>
					      <td><input type="text" name="zipcodeUpd" ref={(ele)=>zipcodeU = ele} id="zipcodeUpd" ></input></td>
					    </tr>
					    <tr>
					      <th scope="row">Password</th>
					      <td><input type="password" name="pwd1Upd" ref={(ele)=>pw1U = ele} ></input></td>
					    </tr>
					    <tr>
					      <th scope="row">Password Confirmation</th>
					      <td><input type="password" name="pwd2Upd" ref={(ele)=>pw2U = ele} ></input></td>
					    </tr>
					    <tr>
					    	<td></td>
					    	<td><button className="updateBtn" onClick={()=>{this.updateBtnHandler(unameU,dobU,emailU,phoneU,zipcodeU,pw1U,pw2U)}} id="profileUpdateBtn">Update</button></td>
					    </tr>
					  </tbody>
					</table>
                    <div className="alert alert-success" role="alert" id="successMsg" >
			             <strong></strong><span id = "successText">{this.props.profileUpdateMsg}</span>
			        </div>
			        <div className="alert alert-warning" role="alert" id="failMsg">
			             <strong></strong><span id = "failText">{this.props.profileUpdateWarning}</span>
			        </div>
			    </div>
		    </div>
		</div>
		)
	  }
	  

	} 

const mapStateToProps = (state) => {
    return {
        user: state.user,
        profileUpdateMsg: state.profileUpdateMsg,
        profileUpdateWarning: state.profileUpdateWarning
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
    	updateRegisterMsg: (msg)=> dispatch({type:'PROFILE_UPDATE_MSG',msg}),
    	updateRegisterWarning:(pWarning)=> dispatch({type:'PROFILE_UPDATE_WARNING',pWarning}),
    	registerUser: (newUser)=> dispatch({type:'REGISTER_NEW_USER',newUser})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateInfo);

