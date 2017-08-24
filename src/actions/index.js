export const ADD_POST = 'ADD_POST'
export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_POST = 'EDIT_POST'
export const EDIT_COMMENT = 'EDIT_COMMMENT'
export const DELETE_POST = 'DELETE_POST'
export const DELETE_COMMENT = 'DELETE_COMMMENT'
export const RECEIVE_CATEGORY = 'RECEIVE_CATEGORY'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const UP_VOTE_POST = 'UP_VOTE_POST'
export const DOWN_VOTE_POST = 'DOWN_VOTE_POST'
export const UP_VOTE_COMMENT = 'UP_VOTE_COMMENT'
export const DOWN_VOTE_COMMENT = 'DOWN_VOTE_COMMENT'
export const SORT_BY_UP_VOTE = 'SORT_BY_UP_VOTE'
export const SORT_BY_DOWN_VOTE = 'SORT_BY_DOWN_VOTE'

export function receiveCategories( categories ) {
	return {
		type : RECEIVE_CATEGORY,
		categories
	}
}

export function receivePosts( posts ) {
	return {
		type : RECEIVE_POSTS,
		posts
	}
}

export function addPost({ id, timestamp, title, body, author, category, voteScore, deleted }) {
	return {
		type : ADD_POST,
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

export function upVotePost({ id }) {
	return {
		type : UP_VOTE_POST,
		id
	}
}

export function downVotePost({ id }) {
	return {
		type : DOWN_VOTE_POST,
		id
	}
}

export function editPost({ id, timestamp, title, body, author, category, voteScore, deleted }) {
	return {
		type : EDIT_POST,
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

export function deletePost({ id }) {
	return {
		type : DELETE_POST,
		id
	}
}

export function receiveComments( comments ){
	return {
		type : RECEIVE_COMMENTS,
		comments
	}
}

export function addComment({ id, parentId, timestamp, body, author, voteScore, deleted, parentDeleted }) {
	return {
		type : ADD_COMMENT,
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

export function upVoteComment({ id }) {
	return {
		type : UP_VOTE_COMMENT,
		id
	}
}

export function downVoteComment({ id }) {
	return {
		type : DOWN_VOTE_COMMENT,
		id
	}
}

export function editComment({ id, parentId, timestamp, body, author, voteScore, deleted, parentDeleted }) {
	return {
		type : EDIT_COMMENT,
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

export function sortByUpVoteComments( comments ){
	return {
		type : SORT_BY_UP_VOTE,
		comments
	}
}

export function sortByDownVoteComments( comments ){
	return {
		type : SORT_BY_DOWN_VOTE,
		comments
	}
}

export function deleteComment({ id }) {
	return {
		type : DELETE_COMMENT,
		id
	}
}


