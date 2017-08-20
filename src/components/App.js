import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { addPost, receiveCategories, receivePosts, receiveComments } from '../actions'
import './App.css'
import serializeForm from 'form-serialize'
import { Snackbar } from 'react-redux-snackbar';
import { showSnack, dismissSnack } from 'react-redux-snackbar';



import * as API from '../utils/api'

class App extends Component {

  componentDidMount() {
    this.props.dispatch(fetchCategories())
    this.props.dispatch(fetchPostsAndComments()) 
  }

  showSnackBar = (id, label) => {
    this.props.dispatch(showSnack(id, {
      label: label,
      timeout: 3000,
      button: { label: 'OK' }
    }));
  }

  handlePostSubmit = (e) => {
    e.preventDefault()
    const values = serializeForm(e.target, { hash: true })
    const post = {
      id: Math.random().toString(36).substr(-8),
      timestamp: Date.now(),
      title: values.title,
      body: values.body,
      author: values.author,
      category: values.category,
      voteScore: 1,
      deleted: false 
    }
    this.props.dispatch(postPost(post))
    this.showSnackBar(Math.random().toString(36).substr(-8), "Post added!")
  }

  handleCommentSubmit = (postId) => (e) => {
    e.preventDefault()
    const values = serializeForm(e.target, { hash: true })
    const comment = {
      id: Math.random().toString(36).substr(-8),
      parentId: postId,
      timestamp: Date.now(),
      body: values.comment,
      author: values.author,
      voteScore: 1,
      deleted: false,
      parentDeleted: false 
    }
    this.props.dispatch(postComment(comment))
  }

  handleDeletePost = (id) => {
    this.props.dispatch(deletePost(id))
  }
  

  render() {
    return (
      <div className="App">
        <Snackbar />
        <Route exact path='/' render={() => (
          <div className="container">
            <div className="row">
              <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                  <div className="navbar-header">
                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                      <span className="sr-only">Toggle navigation</span>
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                    </button>
                    <a className="navbar-brand" href="/">Readable</a>
                  </div>
                  <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul className="nav navbar-nav">
                      <li><a href="#">Link <span className="sr-only">(current)</span></a></li>
                      <li><a href="#">Link</a></li>
                      <li className="dropdown">
                        <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Categories<span className="caret"></span></a>
                        <ul className="dropdown-menu">
                          <li><a href="#">Action</a></li>
                          <li><a href="#">Another action</a></li>
                          <li><a href="#">Something else here</a></li>
                          <li role="separator" className="divider"></li>
                          <li><a href="#">Separated link</a></li>
                          <li role="separator" className="divider"></li>
                          <li><a href="#">One more separated link</a></li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
              <div className="col-md-6">
                  {this.props.category.map((category) => (
                    <div className="category-border" key={category.name}>
                      <h2>
                        <a href={`/${category.name}/posts`}>{category.name}</a>
                      </h2>
                      <a className="btn btn-success btn-xs" href={`/${category.name}/newPost`}> Write new post <span className="glyphicon glyphicon-pencil"></span> </a>
                      <ul>
                        {this.props.post.map((post) => {
                          if(post.category === category.name && !post.deleted){
                            return (<li key={post.id}>
                                      <h3><a href={`/post/${post.id}`}>{post.title}</a> <span className="label label-primary">{post.voteScore}</span></h3>
                                    </li>)
                          }
                          return null;
                        })}
                      </ul>
                    </div>
                  ))}
                <button className="btn btn-primary" onClick ={() => this.props.dispatch(addPost(this.post))}>
                  Test
                </button>
              </div>
            </div>
          </div>
        )}/>
        <Route path='/:category/posts'  render={({match}) => {
          const category =  match.params.category
          return (
            <div>
              <h2>
               {category}
              </h2>
              <a className="btn btn-success btn-xs" href={`/${category}/newPost`}> Write new post <span className="glyphicon glyphicon-pencil"></span></a>
              <ol>
                {this.props.post.map((post) => {
                  if(post.category === category){
                    return (<li key={post.id}>
                              <h3>{post.title} <span className="label label-primary">{post.voteScore}</span></h3>
                            </li>)
                  }
                  return null;
                })}
              </ol>
            </div>
          )
        }}/>
        <Route path='/post/:id' render={({match}) => {
          const postId =  match.params.id
          return (
            <div>
              {this.props.post.map((post) => {
                if(post.id === postId){
                  return (
                    <div className="container" key={post.id}>
                      <div className="row">
                        <div className="col-md-6">
                          <h1>{post.title}</h1>
                          <p className="lead">
                              by <a href="">{post.author}</a>
                          </p>
                          <hr />
                          <div>
                            Vote score <span className="badge"> {post.voteScore}</span>
                            <button type="button" className="btn btn-primary btn-xs">
                              Upvote | <span className="glyphicon glyphicon-plus"></span>
                            </button>
                            <button type="button" className="btn btn-primary btn-xs">
                              Downvote | <span className="glyphicon glyphicon-minus"></span>
                            </button>
                            <button type="button" className="btn btn-danger btn-xs pull-right">
                              Delete post |
                              <span className="glyphicon glyphicon-trash"></span>
                            </button>
                            <button type="button" className="btn btn-warning btn-xs pull-right">Edit post</button>  
                          </div>
                          <hr />
                          <p><span className="glyphicon glyphicon-time"></span> Posted on {(new Date(post.timestamp)).toString()}</p>
                          <hr />
                          <p className="lead">{post.body}</p>
                          <hr />
                          <h4>Comments</h4>
                          <div className="well">
                            <h4>Leave a Comment:</h4>
                            <form onSubmit={this.handleCommentSubmit(postId)}>
                                <div className="form-group">
                                     <input type="text" name="author" className="form-control" placeholder="Author" />
                                </div>
                                <div className="form-group">
                                    <textarea type="text" name="comment" className="form-control" rows="3" placeholder="Comment"></textarea>
                                </div>
    
                                <button className="btn btn-primary">Comment</button>
                            </form>
                          </div>
                          <hr />
                          <div>
                            {this.props.comment.map((comment) => {
                              if(comment.parentId === post.id){
                                return (
                                  <div className="media" key={comment.id}>
                                    <a className="pull-left" href="">
                                      <img className="media-object" src="http://placehold.it/64x64" alt="" />
                                    </a>
                                    <div className="media-body">
                                        <h4 className="media-heading">{comment.author}  <small>{(new Date(comment.timestamp)).toString()}</small>
                                        </h4>
                                        <p>{comment.body}</p>
                                        <a><span>Upvote</span> | <span>{comment.voteScore}</span></a>
                                        <button type="button" className="btn btn-danger btn-xs pull-right"><span className="glyphicon glyphicon-trash"></span></button>
                                        <button type="button" className="btn btn-warning btn-xs pull-right"> Edit </button>
                                    </div>
                                  </div>
                                )
                              }
                              return null;
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                }
                return null;
              })}
            </div>
          )
        }}/>
        <Route path='/:category/newPost' render={({match}) => {
          // const category = match.params.category
          return (
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <form onSubmit={this.handlePostSubmit}>
                    <div className="form-group">
                      <label>Title</label>
                      <input type="text" name="title" className="form-control" id="exampleInputEmail1" placeholder="Title" />
                    </div>
                    <div className="form-group">
                      <label>Author</label>
                      <input type="text" name="author" className="form-control" id="exampleInputPassword1" placeholder="Author" />
                    </div>
                    <div className="form-group">
                      <label>Category</label>
                      <select name="category" className="form-control">
                        {this.props.category.map(category => <option key={category.name}>{category.name}</option>)}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Post</label>
                      <textarea name="body" className="form-control" rows="8"></textarea>
                    </div>
                    <button className="btn btn-primary">
                      Add Post
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )
        }}/>
      </div>
    );
  }
}

function mapStateToProps ( { category, post, comment } ){
    
    return {
      category : Object.keys(category).map((name) => ({
        ...category[name]
      })),
      post : Object.keys(post).map((id) => ({
        ...post[id]
      })),
      comment : Object.keys(comment).map((id) => ({
        ...comment[id]
      }))
    }
}

const fetchCategories = () => dispatch => (
  API
    .getAllCategories()
    .then(categories => dispatch(receiveCategories(categories)))
);

const fetchPostsAndComments = () => dispatch => (
  dispatch(fetchPosts())
)

const fetchPosts = () => dispatch => (
  API
    .getAllPosts()
    .then((posts) => {
      Promise.all([
        dispatch(receivePosts(posts)),
        dispatch(fetchComments(posts))
      ])
    })
);

const fetchComments = (posts) => dispatch => (
  posts.map((post) => API
    .getAllComments(post.id)
    .then(comments => dispatch(receiveComments(comments)))
  )
);

const postPost = (post) => dispatch => (
  API
    .createPost(post)
    // .then(dispatch(fetchPosts()))
);

const postComment = (comment) => dispatch => (
  API
    .createComment(comment)
    .then(dispatch(fetchPosts()))
);

const deletePost = (id) => dispatch => (
  API
    .deletePost(id)
    .then(dispatch(fetchPosts()))
);

export default connect(mapStateToProps)(App);


