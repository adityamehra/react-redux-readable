

const api = "http://localhost:5001"


// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)
// localStorage.removeItem('token')

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const getAllCategories = () => 
	fetch(`${api}/categories`, { headers })
		.then(res => res.json())

export const getAllPosts = () => 
	fetch(`${api}/posts`, { headers })
		.then(res => res.json())

export const getAllComments = (id) => 
	fetch(`${api}/posts/${id}/comments`, { headers })
		.then(res => res.json())

export const createPost = (body) =>
	fetch(`${api}/posts`, {
		method: 'POST',
		headers: {
			...headers,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	}).then(res => res.json)

export const createComment = (body) =>
	fetch(`${api}/comments`, {
		method: 'POST',
		headers: {
			...headers,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	}).then(res => res.json)