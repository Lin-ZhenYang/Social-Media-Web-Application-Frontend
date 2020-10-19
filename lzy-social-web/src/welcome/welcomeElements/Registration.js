import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

export const Registration = ({goToMain, registerUser, registerErrorMsg,registerError }) => {
  const validateInfo =(uname, dob, email, phone, zipcode, pw1, pw2) => {
	var warning = "";
	var success = true;
    
    if (!uname || uname.value.length==0){
    	warning+="User name should not be empty. ";
    	success = false;
    } else{
    	var unameReg=/^([a-zA-Z]{1})([a-zA-Z0-9]{1})+$/;
    	if (!uname.value.match(unameReg)){
    		warning += "Wrong user name format: only letters and numbers allowed. First character has to be letter. ";
    	}
    }
    
    if (!dob || dob.value.length==0){
    	warning+="Date of birth should not be empty. ";
    	success = false;
    } else{
    	var dobInput = dob.value;
	    var dobFormat = /^[0-9]{2}-[0-9]{2}-[0-9]{4}$/;
	    if (!dobInput.match(dobFormat)){
			warning+="Birthday has wrong format! Example format: 02-11-1946 (MM-DD-YYYY) ";
			success=false;
		}
    }

	if (!email || email.value.length==0){
		warning +=" Email cannot be empty. ";
		success = false;
	} else {
		if (!(/\S+@\S+\.\S+/.test(email.value))){
			warning +="Email has wrong format. Example format: owls@rice.edu. ";
			success = false;
		} 
	}
    
 
    
	if (!phone || phone.value.length==0){
		warning+="Phone number cannot be empty. "
		success = false;
	} else{
		var phoneInput = phone.value;
	    var phoneFormat = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
		if (!phoneInput.match(phoneFormat)){
			warning+="Phone number has wrong format! Example format: 111-222-3333 ";
			success=false;
		}
	}


	if (!zipcode || zipcode.value.length==0){
		warning += "Zipcode cannot be empty. "
		success = false;
	} else {
		var zipInput = zipcode.value;
		var zipFormat = /^[0-9]{5}$/;
		if (!zipInput.match(zipFormat)){
			warning+="Zipcode has wrong format! Example format: 78705 ";
			success=false;
		}
	}
    
    if (!pw1 || pw1.value.length==0){
    	warning += "Password cannot be empty. "
		success = false;
    } 

    if (!pw2 || pw2.value.length==0){
    	warning += "Password confirmation cannot be empty. "
		success = false;
    }

    if (pw1 && pw2){
    	var pwd1Input = pw1.value;
		var pwd2Input =pw2.value ;
		if (pwd1Input!=pwd2Input){
			success = false;
			warning += "Passwords do not match! "
		} 
    }
	
	if (success){
		registerError("");
		return true;
	} else{
		registerError(warning);
		console.log(warning);
		return false;
	}
  }

  const submitBtnHandler = (uname,dob,email,phone,zipcode,pw1,pw2) => {
  	if (validateInfo(uname,dob,email,phone,zipcode,pw1,pw2)){
  		let newUser = {
  			username: uname.value,
  			dob: dob.value,
  			email: email.value,
  			phone: phone.value,
  			zipcode: zipcode.value,
  			password: pw1.value
  		}
  		registerUser(newUser);
  		goToMain();
  	} else{

  	}
  }

  let unameR;
  let dobR;
  let emailR;
  let phoneR;
  let zipcodeR;
  let pw1R;
  let pw2R;

  return (
	<div>
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
		      <td><input type="text" ref={(ele)=>unameR = ele} name="unameRGS" id="unameRGS" placeholder="jpowQQQ"></input></td>
		    </tr>
		    <tr>
		      <th scope="row">Date of Birth</th>
		      <td><input type="text" name="dobRGS" ref={(ele)=>dobR = ele} id="dobRGS" placeholder="02-04-1953"></input></td>
		    </tr>
		    <tr>
		      <th scope="row">Email Address</th>
		      <td><input type="text" name="emailRGS" ref={(ele)=>emailR = ele} id="emailRGS" placeholder="wsb@gmail.com"></input></td>
		    </tr>
		    <tr>
		      <th scope="row">Phone Number</th>
		      <td><input type="text" name="phoneRGS" ref={(ele)=>phoneR = ele} id="phoneRGS" placeholder="123-456-8888"></input></td>
		    </tr>
		    <tr>
		      <th scope="row">Zipcode</th>
		      <td><input type="text" name="zipcodeRGS" ref={(ele)=>zipcodeR = ele} id="zipcodeRGS" placeholder="78703"></input></td>
		    </tr>
		    <tr>
		      <th scope="row">Password</th>
		      <td><input type="password" name="pwd1RGS" ref={(ele)=>pw1R = ele} id="pwd1RGS"></input></td>
		    </tr>
		    <tr>
		      <th scope="row">Password Confirmation</th>
		      <td><input type="password" name="pwd2RGS" ref={(ele)=>pw2R = ele} id="pwd2RGS"></input></td>
		    </tr>
		    <tr>
		    	<td></td>
		    	<td><button onClick={()=>{submitBtnHandler(unameR,dobR,emailR,phoneR,zipcodeR,pw1R,pw2R)}} id="registerBtnRGS">Register</button></td>
		    </tr>
		  </tbody>
		</table>
        <div className="alert alert-warning" role="alert" id="failMsg">
             <strong></strong><span id = "failText">{registerErrorMsg}</span>
        </div>
	</div>
	);
}

const mapStateToProps = (state) => {
    return {
        registerErrorMsg: state.registerErrorMsg
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        goToMain: ()=> dispatch({type: 'TO_MAIN_PAGE'}),
        registerUser: (newUser)=> dispatch({type:'REGISTER_NEW_USER',newUser}),
        registerError: (errorMsg)=> dispatch({type:"REGISTER_ERROR",errorMsg})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Registration);