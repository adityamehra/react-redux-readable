import * as API from '../utils/api'

import { 
  receiveCategories,
  receivePosts,
  addPost, 
  upVotePost, 
  downVotePost,
  deletePost,
  addComment,
  upVoteComment, 
  downVoteComment,  
  deleteComment, 
  receiveComments 
} from '../actions'

export const fetchCategories = () => dispatch => (
  API
    .getAllCategories()
    .then(categories => dispatch(receiveCategories(categories)))
);

export const fetchPosts = () => dispatch => (
  API
    .getAllPosts()
    .then((posts) => dispatch(receivePosts(posts)))
);

/**
export const fetchPostsAndComments = () => dispatch => (
  dispatch(fetchPosts())
)

export const fetchPosts = () => dispatch => (
  API
    .getAllPosts()
    .then((posts) => {
      Promise.all([
        dispatch(receivePosts(posts)),
        // dispatch(fetchComments(posts))
      ])
    })
);

export const fetchComments = (posts) => dispatch => (
  posts.map((post) => API
    .getAllComments(post.id)
    .then(comments => dispatch(receiveComments(comments)))
  )
);
*/

export const fetchComments = (id) => dispatch => (
  API
    .getAllComments(id)
    .then((comments) => dispatch(receiveComments(comments)))
);

export const postPost = (post) => dispatch => (
  API
    .createPost(post)
    // .then(dispatch(fetchPosts()))
);

export const postComment = (comment) => dispatch => (
  API
    .createComment(comment)
    // .then(dispatch(fetchPosts()))
    .then(() => dispatch(addComment(comment)))
);

export const upVotePost_wrapper = (id) => dispatch => (
  API
    .upVotePost(id)
    .then(() => dispatch(upVotePost({id})))
);

export const downVotePost_wrapper = (id) => dispatch => (
  API
    .downVotePost(id)
    .then(() => dispatch(downVotePost({id})))
);

export const deletePost_wrapper = (id) => dispatch => (
  API
    .deletePost(id)
    .then(id => dispatch(deletePost({ id })))
);

export const deleteComment_wrapper = (id) => dispatch => (
  API
    .deleteComment(id)
    .then(() => dispatch(deleteComment({id})))
);

export const upVoteComment_wrapper = (id) => dispatch => (
  API
    .upVoteComment(id)
    .then(() => dispatch(upVoteComment({id})))
);

export const downVoteComment_wrapper = (id) => dispatch => (
  API
    .downVoteComment(id)
    .then(() => dispatch(downVoteComment({id})))
);