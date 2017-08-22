import { snackbarReducer } from 'react-redux-snackbar';
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
	DELETE_COMMENT,
	UP_VOTE_POST,
	DOWN_VOTE_POST,
	UP_VOTE_COMMENT,
	DOWN_VOTE_COMMENT 
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

	console.log(action)

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
		case UP_VOTE_POST:

			const upVoteScore = parseInt(state[id]['voteScore'], 10) + 1

			return {
				...state,
				[id]: {
					...state[id],
					voteScore: upVoteScore
				}
			}
		case DOWN_VOTE_POST:

			const downVoteScore = parseInt(state[id]['voteScore'], 10) - 1

			return {
				...state,
				[id]: {
					...state[id],
					voteScore: downVoteScore
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

function comment (state = {}, action) {

	const { id, parentId, timestamp, body, author, voteScore, deleted, parentDeleted, comments } = action

	switch(action.type) {
		case RECEIVE_COMMENTS:
			let result = comments.reduce((obj,item) => {
  							obj[item.id] = item; 
  							return obj;
						}, {});
			return {
				...state,
				...result
			}
		case ADD_COMMENT:
			return {
				...state,
				[id]:{
					id, 
					parentId, 
					timestamp, 
					body, 
					author, 
					voteScore, 
					deleted, 
					parentDeleted
				}

			}
		case UP_VOTE_COMMENT:

			const upVoteScore = parseInt(state[id]['voteScore'], 10) + 1

			return {
				...state,
				[id]: {
					...state[id],
					voteScore: upVoteScore
				}
			}
		case DOWN_VOTE_COMMENT:

			const downVoteScore = parseInt(state[id]['voteScore'], 10) - 1

			return {
				...state,
				[id]: {
					...state[id],
					voteScore: downVoteScore
				}
			}
		case EDIT_COMMENT:
			return {
				...state,
				[id]: {
					id,
					timestamp, 
					body, 
					author, 
					parentId, 
					voteScore, 
					deleted,
					parentDeleted
				}
			}
		case DELETE_COMMENT:
			return {
				...state,
				[id]: {
					...state[id],
					deleted: true
				}
			}
		default:
			return state;
	}
}

export default combineReducers({
	category,
	post,
	comment,
	snackbar: snackbarReducer
})
