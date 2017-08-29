import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
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
import serializeForm from 'form-serialize'
import { Snackbar } from 'react-redux-snackbar';
import { showSnack, dismissSnack } from 'react-redux-snackbar';
import * as API from '../utils/api'
import './App.css'
import sortBy from 'sort-by'

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

  handleSubmitPost = (e) => {
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
    // window.location.href="/"
    this.showSnackBar(Math.random().toString(36).substr(-8), "Post added!")
  }

  handleUpVotePost = (id) => {
    this.props.dispatch(upVotePost_wrapper(id))
  }

  handleDownVotePost = (id) => {
    this.props.dispatch(downVotePost_wrapper(id))
  }

  handleDeletePost = (id) => {
    this.props.dispatch(removePost(id))
    this.showSnackBar(Math.random().toString(36).substr(-8), "Post deleted!")
    window.location.href="/"
    // console.log("handleDeletePost" + id )
  }

  handleSubmitComment = (postId) => (e) => {
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
    this.showSnackBar(Math.random().toString(36).substr(-8), "Comment added!")
  }

  handleUpVoteComment = (id) => {
    this.props.dispatch(upVoteComment_wrapper(id))
  }

  handleDownVoteComment = (id) => {
    this.props.dispatch(downVoteComment_wrapper(id))
  }

  handleDeleteComment = (id) => {
    this.props.dispatch(removeComment(id))
    this.showSnackBar(Math.random().toString(36).substr(-8), "Comment deleted!")
    console.log("handleDeleteComment " + id )
  }

  openSortingMenu = (param) => (e) => {
    e.preventDefault()
    console.log(param)
    alert(e.pageX + ' , ' + e.pageY)
  }
  

  render() {
    console.log(this.props)
    return (
      <div className="App">
        <Snackbar />
        <Route exact path='/' render={() => (
          <div>
            <div className="container-fluid">
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
                          {this.props.category.map(category => <li key={category.name}><a href={`/${category.name}/posts`}>{category.name}</a></li>)}
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
            </div>
            <div className="container">
              <div className="col-md-8">
                {this.props.category.map((category) => (
                  <div className="category-box" key={category.name}>
                    <h2>
                      <a href={`/${category.name}/posts`}>{category.name}</a>
                    </h2>
                    <div>
                      <a className="btn btn-black btn-sm" href={`/${category.name}/newPost`}> Write new post <span className="glyphicon glyphicon-pencil"></span> </a>
                      <button type="button" className="btn btn-black btn-sm" onClick={this.openSortingMenu("hello")}>
                        <span className="glyphicon glyphicon-sort"></span>
                      </button>
                      <button type="button" className="btn btn-black btn-sm">
                        <span className="glyphicon glyphicon-time"></span>
                      </button>
                    </div>
                    <hr />
                    <ul>
                      {this.props.post.map((post) => {
                        if(post.category === category.name && !post.deleted) {
                          return (
                            <div key={post.id}>
                              <li>
                                <h3>
                                  <a href={`/post/${post.id}`}>{post.title}</a>
                                  <span className="label label-primary pull-right">{post.voteScore}</span>
                                </h3>
                                <div>
                                  <button type="button" className="btn btn-black btn-sm" onClick={() => this.handleUpVotePost(post.id)}>
                                    Upvote <span className="glyphicon glyphicon-thumbs-up"></span>
                                  </button>
                                  <button type="button" className="btn btn-black btn-sm" onClick={() => this.handleDownVotePost(post.id)}>
                                    Downvote <span className="glyphicon glyphicon-thumbs-down"></span>
                                  </button>
                                </div>
                              </li>
                              <hr />
                            </div>
                          )
                        }
                        return null;
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}/>
        <Route path='/:category/posts'  render={({match}) => {
          const category =  match.params.category
          return (
            <div>
              <div className="container-fluid">
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
                            {this.props.category.map(category => <li key={category.name}><a href={`/${category.name}/posts`}>{category.name}</a></li>)}
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>
                </nav>
              </div>
              <div className="container">
                <div className="col-md-6">
                  <h2>
                   {category}
                  </h2>
                  <a className="btn btn-black btn-xs" href={`/${category}/newPost`}> Write new post <span className="glyphicon glyphicon-pencil"></span></a>
                  <hr />
                  <ul>
                    {this.props.post.map((post) => {
                      if(post.category === category && !post.deleted) {
                        return (
                          <div key={post.id}>
                            <li>
                              <h3>
                                <a href={`/post/${post.id}`}>{post.title}</a>
                                <span className="label label-default pull-right">{post.voteScore}</span>
                              </h3>
                              <div>
                                <button type="button" onClick={() => this.handleUpVotePost(post.id)}>
                                  <span className="glyphicon glyphicon-thumbs-up"></span>
                                </button>
                                <button type="button" onClick={() => this.handleDownVotePost(post.id)}>
                                  <span className="glyphicon glyphicon-thumbs-down"></span>
                                </button>
                              </div>
                            </li>
                            <hr />
                          </div>
                        )
                      }
                      return null;
                    })}
                  </ul>
                </div>
              </div>
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
                    <div key={post.id}>
                      <div className="container-fluid">
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
                                    {this.props.category.map(category => <li key={category.name}><a href={`/${category.name}/posts`}>{category.name}</a></li>)}
                                  </ul>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </nav>
                      </div>
                      <div className="container">
                        <div className="col-md-6">
                          <h1>{post.title}</h1>
                          <p className="lead">
                              by <a href="">{post.author}</a>
                          </p>
                          <hr />
                          <div>
                            Vote score <span className="label label-default"> {post.voteScore}</span>
                            <button type="button" className="" onClick={() => this.handleUpVotePost(post.id)}>
                              <span className="glyphicon glyphicon-thumbs-up"></span>
                            </button>
                            <button type="button" className="" onClick={() => this.handleDownVotePost(post.id)}>
                              <span className="glyphicon glyphicon-thumbs-down"></span>
                            </button>
                            <button type="button" className="pull-right" onClick={() => this.handleDeletePost(post.id)}>
                              <span className="glyphicon glyphicon-trash"></span>
                            </button>
                            <button type="button" className="pull-right">
                              <span className="glyphicon glyphicon-edit"></span>
                            </button>  
                          </div>
                          <hr />
                          <p><span className="glyphicon glyphicon-time"></span> Posted on {(new Date(post.timestamp)).toString()}</p>
                          <hr />
                          <p className="lead">{post.body}</p>
                          <hr />
                          <h4>Comments</h4>
                          <div className="well">
                            <h4>Leave a Comment:</h4>
                            <form onSubmit={this.handleSubmitComment(postId)}>
                                <div className="form-group">
                                     <input type="text" name="author" className="form-control" placeholder="Author" />
                                </div>
                                <div className="form-group">
                                    <textarea type="text" name="comment" className="form-control" rows="3" placeholder="Comment"></textarea>
                                </div>
                                <button className="btn btn-black">Comment</button>
                            </form>
                          </div>
                          <hr />
                          <div>
                            {this.props.comment.map((comment) => {
                              if(comment.parentId === post.id && !comment.deleted) {
                                return (
                                  <div className="media" key={comment.id}>
                                    <a className="pull-left" href="">
                                      <img className="media-object" src="http://placehold.it/64x64" alt="" />
                                    </a>
                                    <div className="media-body">
                                        <h4 className="media-heading">{comment.author}  <small>{(new Date(comment.timestamp)).toString()}</small>
                                        </h4>
                                        <p>{comment.body}</p>
                                        <a>
                                          Vote score <span className="badge">{comment.voteScore}</span>
                                          <button type="button" className="btn btn-primary btn-xs" onClick={() => this.handleUpVoteComment(comment.id)}>
                                            <span className="glyphicon glyphicon-thumbs-up"></span>
                                          </button>
                                          <button type="button" className="btn btn-primary btn-xs" onClick={() => this.handleDownVoteComment(comment.id)}>
                                            <span className="glyphicon glyphicon-thumbs-down"></span>
                                          </button>
                                        </a>
                                        <button type="button" className="btn btn-danger btn-xs pull-right" onClick={() => this.handleDeleteComment(comment.id)}><span className="glyphicon glyphicon-trash"></span></button>
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
            <div>
              <div className="container-fluid">
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
                            {this.props.category.map(category => <li key={category.name}><a href={`/${category.name}/posts`}>{category.name}</a></li>)}
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>
                </nav>
              </div>
              <div className="container">
                <div className="col-md-6">
                  <form onSubmit={this.handleSubmitPost}>
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
                    <button className="btn btn-black">
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
    // .then(dispatch(fetchPosts()))
    .then(() => dispatch(addComment(comment)))
);

const upVotePost_wrapper = (id) => dispatch => (
  API
    .upVotePost(id)
    .then(() => dispatch(upVotePost({id})))
);

const downVotePost_wrapper = (id) => dispatch => (
  API
    .downVotePost(id)
    .then(() => dispatch(downVotePost({id})))
);

const removePost = (id) => dispatch => (
  API
    .deletePost(id)
    .then(id => dispatch(deletePost({ id })))
);

const removeComment = (id) => dispatch => (
  API
    .deleteComment(id)
    .then(() => dispatch(deleteComment({id})))
);

const upVoteComment_wrapper = (id) => dispatch => (
  API
    .upVoteComment(id)
    .then(() => dispatch(upVoteComment({id})))
);

const downVoteComment_wrapper = (id) => dispatch => (
  API
    .downVoteComment(id)
    .then(() => dispatch(downVoteComment({id})))
);

export default connect(mapStateToProps)(App);


