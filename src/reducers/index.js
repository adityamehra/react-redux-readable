import { combineReducers } from 'redux'

import {
	RECEIVE_CATEGORY,
	RECEIVE_POSTS, 
	RECEIVE_COMMENTS,
	ADD_POST,
	ADD_COMMENT, 
	EDIT_POST,
	EDIT_COMMENT,
	DELETE_POST, 
	DELETE_COMMENT 
} from '../actions'

function category (state = {}, action) {

	const { categories } = action

	switch(action.type){
		case RECEIVE_CATEGORY:
			
			let result = categories['categories'].reduce((obj,item) => {
							obj[item.name] = item; 
							return obj;
					}, {});
				
			return {
				...state,
				...result
			}
			
		default:
			return state;
	}
}

/** 
 * Post
 * id			String	Unique identifier
 * timestamp	Integer	Time created - default data tracks this in Unix time. You can use Date.now() to get this number
 * title		String	Post title
 * body			String	Post body
 * author		String	Post author
 * category		String	Should be one of the categories provided by the server
 * voteScore	Integer	Net votes the post has received (default: 1)
 * deleted		Boolean	Flag if post has been 'deleted' (inaccessible by the front end), (default: false) 
 */

function post (state = {}, action) {

	const { id, timestamp, title, body, author, category, voteScore, deleted, posts } = action

	switch(action.type){
		case RECEIVE_POSTS:

			let result = posts.reduce((obj,item) => {
  							obj[item.id] = item; 
  							return obj;
						}, {});
			return {
				...state,
				...result
			}
		case ADD_POST:
			return {
				...state,
				[id]: {
					id,
					timestamp, 
					title, 
					body, 
					author, 
					category, 
					voteScore, 
					deleted
				}
			}
		case EDIT_POST:
			return {
				...state,
				[id]: {
					id,
					timestamp, 
					title, 
					body, 
					author, 
					category, 
					voteScore, 
					deleted
				}
			}
		case DELETE_POST:
			return {
				...state,
				[id]: {
					...state[id],
					[deleted]: true
				}
			}
		default:
			return state;
	}

}

/**
 * Attribute	 Type	 Description
 * id			 String	 Unique identifier
 * parentId		 String	 id of the parent post
 * timestamp	 Integer Time created - default data tracks this in Unix time. You can use Date.now() to get this number
 * body			 String	 Comment body
 * author		 String	 Comment author
 * voteScore	 Integer Net votes the post has received (default: 1)
 * deleted		 Boolean Flag if comment has been 'deleted' (inaccessible by the front end), (default: false)
 * parentDeleted Boolean Flag for when the the parent post was deleted, but the comment itself was not.
 */

const initialComments = {
  "894tuq4ut84ut8v4t8wun89g": {
    id: '894tuq4ut84ut8v4t8wun89g',
    parentId: "8xf0y6ziyjabvozdd253nd",
    timestamp: 1468166872634,
    body: 'Hi there! I am a COMMENT.',
    author: 'thingtwo',
    voteScore: 6,
    deleted: false,
    parentDeleted: false 
  },
  "8tu4bsun805n8un48ve89": {
    id: '8tu4bsun805n8un48ve89',
    parentId: "8xf0y6ziyjabvozdd253nd",
    timestamp: 1469479767190,
    body: 'Comments. Are. Cool.',
    author: 'thingone',
    voteScore: -5,
    deleted: false,
    parentDeleted: false
  }
}

function comment (state = initialComments, action) {

	// const { id, parentId, timestamp, body, author, voteScore, deleted, parentDeleted } = action

	switch(action.type){
		case RECEIVE_COMMENTS:
			return state
		case ADD_COMMENT:
			return state
		case EDIT_COMMENT:
			return state
		case DELETE_COMMENT:
			return state
		default:
			return state;
	}
}

export default combineReducers({
	category,
	post,
	comment
})
