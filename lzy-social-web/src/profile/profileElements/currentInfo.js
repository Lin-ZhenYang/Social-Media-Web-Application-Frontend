import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';


class CurrentInfo extends React.Component{
	constructor(props) {
        super(props);
    }
    render(){
    	var user = this.props.user;
    	return (
	    <div >
	        <h3>Current Info</h3>
		    <table>
		       <tbody>
			       <tr>
			         <td>User Name</td><td>{user.username}</td>
			       </tr>
			       <tr>
			         <td>Date of Birth</td><td>{user.dob}</td>
			       </tr>
			       <tr>
			         <td>Email Address</td><td>{user.email}</td>
			       </tr>
			       <tr>
			         <td>Phone Number</td><td>{user.phone}</td>
			       </tr>
			       <tr>
			         <td>Zipcode</td><td>{user.zipcode}</td>
			       </tr>
			     </tbody>
		    </table>
		</div>
	    );
    }
}


export default connect(
    (state) => {
        return {
            user: state.user
        }
    },
    (dispatch) => {
        return {
        }
    }
)(CurrentInfo)