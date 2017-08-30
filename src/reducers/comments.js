import {
	RECEIVE_COMMENTS,
	ADD_COMMENT, 
	EDIT_COMMENT,
	DELETE_COMMENT,
	UP_VOTE_COMMENT,
	DOWN_VOTE_COMMENT,
	SORT_BY_UP_VOTE_COMMENTS,
	SORT_BY_DOWN_VOTE_COMMENTS,
	SORT_BY_INC_TIME_COMMENTS,
	SORT_BY_DEC_TIME_COMMENTS,
} from '../actions'

import sortBy from 'sort-by'

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

export default comment