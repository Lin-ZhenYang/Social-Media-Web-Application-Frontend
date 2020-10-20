import React from 'react';
import ReactDOM from 'react-dom';
import MainUser from './mainElements/mainUser';
import MainFollower from './mainElements/mainFollower';
import NewPost from './mainElements/newPost';
import SearchBar from './mainElements/searchBar';
import Posts from './mainElements/posts';

class Main extends React.Component {
  constructor(props) {
        super(props);
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
               <tr valign='top'>
                   <td width="25%"><MainFollower /></td>
                   <td width="50%"><Posts /></td>
               </tr>
             </tbody>
          </table>
		</div>
		)
  }
}

export default Main;