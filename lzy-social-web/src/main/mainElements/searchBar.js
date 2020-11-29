import React from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import "./mainElementsStyle.css"

export const SearchBar = ({posts,updateFilteredPosts}) => {
	const searchHandler =(searchInput) => {
		let postsCopy =[...posts];
		searchInput=searchInput.trim();
		let newFilteredPosts = [];
		if (searchInput.length>0){
            newFilteredPosts = postsCopy.filter(function(postCopy){ return (postCopy.text.indexOf(searchInput) != -1) || (postCopy.author.indexOf(searchInput)!=-1) });
            updateFilteredPosts(newFilteredPosts);
            console.log(newFilteredPosts);
		} else{
			updateFilteredPosts(postsCopy);
		}

	}
    return (
        <div id="searchDiv">
		    <input id="searchInput" type="text" placeholder="Search Here"></input>
		    <button id="mainSearchBtn" onClick={()=>{searchHandler(document.getElementById("searchInput").value)}}><FontAwesomeIcon icon={faSearch}/>Search</button>
		</div>
		)
}

const mapStateToProps = (state) => {
    return {
    	posts:state.userPosts,
        filteredPosts: state.filteredPosts
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        updateFilteredPosts: (posts) => dispatch({type:'FILTERED_POSTS',posts})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);