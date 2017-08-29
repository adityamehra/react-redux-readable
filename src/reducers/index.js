import { snackbarReducer } from 'react-redux-snackbar';
import { combineReducers } from 'redux'
import sortBy from 'sort-by'

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
	DOWN_VOTE_COMMENT,
	SORT_BY_UP_VOTE_POSTS,
	SORT_BY_DOWN_VOTE_POSTS,
	SORT_BY_INC_TIME_POSTS,
	SORT_BY_DEC_TIME_POSTS,
	SORT_BY_UP_VOTE_COMMENTS,
	SORT_BY_DOWN_VOTE_COMMENTS,
	SORT_BY_INC_TIME_COMMENTS,
	SORT_BY_DEC_TIME_COMMENTS,
	EDIT_FORM_BODY_POST,
	EDIT_FORM_TITLE_POST,
	EDIT_FORM_BODY_COMMENT,
	RECEIVE_SINGLE_COMMENT  
} from '../actions'

function category (state = {}, action) {
	const { categories } = action
	switch(action.type) {
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

function post (state = [], action) {

	const { id, timestamp, title, body, author, category, voteScore, deleted, posts } = action

	switch(action.type) {
		case RECEIVE_POSTS:
			let result = posts.reduce((obj,item) => {
  							obj.push(item); 
  							return obj;
						}, []);
			return state.concat(result)
		case ADD_POST:
			return (state.concat([{
					id,
					timestamp, 
					title, 
					body, 
					author, 
					category, 
					voteScore, 
					deleted
				}]))
		case UP_VOTE_POST:
			return (state.map(post => {
				if(post.id === id) {
					post['voteScore'] = parseInt(post['voteScore'], 10) + 1
				}
				return post 	
			}))
		case DOWN_VOTE_POST:
			return (state.map(post => {
				if(post.id === id) {
					post['voteScore'] = parseInt(post['voteScore'], 10) - 1
				}
				return post
			}))
		case EDIT_POST:
			return state.filter(post => post.id !== id).concat(
				[{
					id,
					timestamp, 
					title, 
					body, 
					author, 
					category, 
					voteScore, 
					deleted
				}]
			)
		case DELETE_POST:
			return state.map(post => { 
				if(post.id === id) {
					post.deleted = true
				}
				return post
			})
		case SORT_BY_UP_VOTE_POSTS:
			return [...state.sort(sortBy('voteScore'))]
		case SORT_BY_DOWN_VOTE_POSTS:
			return [...state.sort(sortBy('-voteScore'))]
		case SORT_BY_INC_TIME_POSTS:
			return [...state.sort(sortBy('timestamp'))]
		case SORT_BY_DEC_TIME_POSTS:
			return [...state.sort(sortBy('-timestamp'))]
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
	let newCommentsArray = []
	switch(action.type) {
		case RECEIVE_COMMENTS:
			let result = comments.reduce((obj,item) => {
							if(!obj.hasOwnProperty(item.parentId)){
								obj[item.parentId] = [item]
							}else{
								obj[item.parentId].push(item)
							}
  							
  							return obj;
						}, {});
			return {
				...state,
				...result
			}
		case ADD_COMMENT:
			if(state.hasOwnProperty(parentId)) {
				return {
					...state,
					[parentId]: state[parentId].concat([{
						id, 
						parentId, 
						timestamp, 
						body, 
						author, 
						voteScore, 
						deleted, 
						parentDeleted
					}])
				}
			}else {
				return {
					...state,
					[parentId]: [{
						id, 
						parentId, 
						timestamp, 
						body, 
						author, 
						voteScore, 
						deleted, 
						parentDeleted
					}]
				}
			}
		case UP_VOTE_COMMENT:
			newCommentsArray = state[parentId].map(comment => {
									if(comment.id === id) {
										comment['voteScore'] = parseInt(comment['voteScore'], 10) + 1
									}
									return comment	
								})

			return {
				...state,
				[parentId]: newCommentsArray
			}
		case DOWN_VOTE_COMMENT:
			return {
				...state,
				[parentId]: state[parentId].map(comment => {
				if(comment.id === id) {
					comment['voteScore'] = parseInt(comment['voteScore'], 10) - 1
				}
				return comment	
			})
			}
		case EDIT_COMMENT:
			return state.filter(comment => comment.id !== id).concat(
				[{
					id,
					timestamp, 
					body, 
					author, 
					parentId, 
					voteScore, 
					deleted,
					parentDeleted
				}]
			)
		case DELETE_COMMENT:
			return {
				...state,
				[parentId]: state[parentId].map(comment => {
				if(comment.id === id) {
					comment['deleted'] = true
				}
				return comment	
			})
			}
		case SORT_BY_UP_VOTE_COMMENTS:
			return {
					...state,
					[parentId]: [...state[parentId].sort(sortBy('voteScore'))]
				}
		case SORT_BY_DOWN_VOTE_COMMENTS:
			return {
					...state,
					[parentId]: [...state[parentId].sort(sortBy('-voteScore'))]
				}
		case SORT_BY_INC_TIME_COMMENTS:
			return {
					...state,
					[parentId]: [...state[parentId].sort(sortBy('timestamp'))]
				}
		case SORT_BY_DEC_TIME_COMMENTS:
			return {
					...state,
					[parentId]: [...state[parentId].sort(sortBy('-timestamp'))]
				}
		default:
			return state;
	}
}

function editFormTitlePost(state = {}, action) {

	const {title} = action 

	switch(action.type) {
		case EDIT_FORM_TITLE_POST:
			return {
				...state,
				title
			}
		default:
			return state
	}
}

function editFormBodyPost(state = {}, action) {

	const {body} = action 

	switch(action.type) {
		case EDIT_FORM_BODY_POST:
			return {
				...state,
				body
			}
		default:
			return state
	}
}

function editFormBodyComment(state = {}, action) {

	const {body} = action

	switch(action.type) {
		case EDIT_FORM_BODY_COMMENT:
			return {
				...state,
				body
			}
		default:
			return state
	}
}

function singleComment(state = {}, action) {

	const { id, parentId, timestamp, body, author, voteScore, deleted, parentDeleted, comment } = action

	switch(action.type) {
		case RECEIVE_SINGLE_COMMENT:
			return {
				...state,
				...comment
			}
		case EDIT_FORM_BODY_COMMENT:
			return {
				...state,
				'body': body
			}
		default:
			return state
	}
}

export default combineReducers({
	category,
	post,
	comment,
	editFormBodyPost,
  editFormTitlePost,
  editFormBodyComment,
  singleComment,
	snackbar: snackbarReducer
})
