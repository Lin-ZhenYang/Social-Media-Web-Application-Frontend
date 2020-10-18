import React from 'react';
import ReactDOM from 'react-dom';
import {withRouter} from "react-router-dom";
import MainUser from './mainElements/mainUser';
import MainFollower from './mainElements/mainFollower';
import NewPost from './mainElements/newPost';
import SearchBar from './mainElements/searchBar';
import Posts from './mainElements/posts';

class Main extends React.Component {
  onLogout = () => {
  	this.props.history.push('/');
  }

  onProfile = () => {
  	this.props.history.push('/profile');
  }

  render() {
    return (
        <div>
          <table>
             <tbody>
               <tr>
                   <td><MainUser /></td>
                   <td><NewPost /></td>
               </tr>
               <tr>
                    <td></td>
                    <td><SearchBar /></td>
               </tr>
               <tr>
                   <td><MainFollower /></td>
                   <td><Posts /></td>
               </tr>
             </tbody>
          </table>
		</div>
		)
  }
}

export default Main;