import React from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

class searchBar extends React.Component {

  render() {
    return (
        <div>
		    <form>
		      <input type="text" placeholder="Search Here"></input>
		      <button id="mainSearchBtn"><FontAwesomeIcon icon={faSearch}/>Search</button>
		    </form>
		</div>
		)
  }
}

export default searchBar;