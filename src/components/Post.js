import React, { Component } from 'react'
import serializeForm from 'form-serialize'
import { showSnack, dismissSnack } from 'react-redux-snackbar';
import { Link } from 'react-router-dom'

import {
  fetchComments,
  upVotePost_wrapper,
  downVotePost_wrapper,
  deletePost_wrapper,
  postComment,
  upVoteComment_wrapper,
  downVoteComment_wrapper,
  deleteComment_wrapper
} from '../utils/api_thunk_wrapper.js'

import { sortByUpVoteComments, sortByDownVoteComments, sortByIncTimeComments, sortByDecTimeComments } from '../actions'

import './App.css'

class Post extends Component {

  componentDidMount() {
    this.props.dispatch(fetchComments(this.props.postId))
  }

  showSnackBar = (id, label) => {
    this.props.dispatch(showSnack(id, {
      label: label,
      timeout: 3000,
      button: { label: 'OK' }
    }));
  }

  handleUpVotePost = (id) => {
      this.props.dispatch(upVotePost_wrapper(id))
  }

  handleDownVotePost = (id) => {
      this.props.dispatch(downVotePost_wrapper(id))
  } 

  handleDeletePost = (id) => {
    this.props.dispatch(deletePost_wrapper(id))
    this.showSnackBar(Math.random().toString(36).substr(-8), "Post deleted!")
    window.location.href="/"
  }

  handleSubmitComment = (postId) => (e) => {
    console.log()
    console.log()
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
    e.target.comment.value = ""
    e.target.author.value = ""
  }

  handleUpVoteComment = (id, parentId) => {
    console.log(parentId)
    this.props.dispatch(upVoteComment_wrapper(id, parentId))
  }

  handleDownVoteComment = (id, parentId) => {
    this.props.dispatch(downVoteComment_wrapper(id, parentId))
  }

  handleDeleteComment = (id, parentId) => {
    this.props.dispatch(deleteComment_wrapper(id, parentId))
    this.showSnackBar(Math.random().toString(36).substr(-8), "Comment deleted!")
  }

	render() {
        const postId = this.props.postId
        return (
            <div>
              {this.props.post.map((post) => {
                if(post.id === postId){
                  if(!post.deleted){
                    return (
                    <div key={post.id}>
                      <div className="container">
                        <div className="col-md-7">
                          <h1>{post.title}</h1>
                          <h4>
                            <span className="pull-right"><span className="glyphicon glyphicon-tag"></span> {post.category}</span>
                            <span className="glyphicon glyphicon-comment"></span> {this.props.comment.hasOwnProperty(postId) ? this.props.comment[postId].length : 0}
                          </h4>
                          <hr />
                          <p className="lead">
                            <span className="glyphicon glyphicon-user"></span> {post.author} 
                            <span className=" pull-right"><span className="glyphicon glyphicon-time"></span>  {(new Date(post.timestamp)).toLocaleString()} </span> 
                          </p>
                          <hr />
                          <div>
                            <button type="button" className="btn btn-black btn-xs">
                              Vote Score : {post.voteScore}
                            </button>
                            <button type="button" className="btn btn-black btn-xs" onClick={() => this.handleUpVotePost(post.id)}>
                              <span className="glyphicon glyphicon-thumbs-up"></span>
                            </button>
                            <button type="button" className="btn btn-black btn-xs" onClick={() => this.handleDownVotePost(post.id)}>
                              <span className="glyphicon glyphicon-thumbs-down"></span>
                            </button>
                            <button type="button" className="btn btn-black btn-xs pull-right" onClick={() => this.handleDeletePost(post.id)}>
                              <span className="glyphicon glyphicon-trash"></span>
                            </button>
                            <a href={`/editPost/${post.id}`} type="button" className="btn btn-black btn-xs pull-right">
                              <span className="glyphicon glyphicon-edit"></span>
                            </a>
                          </div>
                          <hr />
                          <p className="lead">{post.body}</p>
                          <hr />
                          <div className="my-box">
                            <h4>Leave a Comment:</h4>
                            <form onSubmit={this.handleSubmitComment(postId)}>
                                <div className="form-group">
                                     <input type="text" name="author" className="form-control" placeholder="Author" />
                                </div>
                                <div className="form-group">
                                    <textarea type="text" name="comment" className="form-control" rows="3" placeholder="Add a Comment..."></textarea>
                                </div>
                                <button className="btn btn-black">Comment</button>
                            </form>
                          </div>
                        </div>
                        <div className="col-md-5">
                          <h3 className="make-block-inline">
                            Comments
                          </h3>
                          <div className="btn-group pull-right">
                            <button type="button" className="btn btn-black dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              Sort by <span className="caret"></span>
                            </button>
                            <ul className="dropdown-menu">
                              <li>
                                <button type="button" className="btn btn-black btn-xs" onClick={() => this.props.dispatch(sortByUpVoteComments({parentId: post.id}))}>
                                  UpVotes
                                </button>
                              </li>
                              <li role="separator" className="divider"></li>
                              <li>
                                <button type="button" className="btn btn-black btn-xs" onClick={() => this.props.dispatch(sortByDownVoteComments({parentId: post.id}))}>
                                  DownVotes
                                </button>
                              </li>
                              <li role="separator" className="divider"></li>
                              <li>
                                <button type="button" className="btn btn-black btn-xs" onClick={() => this.props.dispatch(sortByIncTimeComments({parentId: post.id}))}>
                                  Inc Time
                                </button>
                              </li>
                              <li role="separator" className="divider"></li>  
                              <li>
                                <button type="button" className="btn btn-black btn-xs" onClick={() => this.props.dispatch(sortByDecTimeComments({parentId: post.id}))}>
                                  Dec Time
                                </button>
                              </li>                  
                            </ul>
                          </div>         
                          <hr />
                          <div>
                            {this.props.comment[postId] && this.props.comment[postId].map((comment) => {
                              if(!comment.deleted) {
                                return (
                                  <div className="media" key={comment.id}>
                                    <a className="pull-left" href="">
                                      <img className="media-object" src="http://placehold.it/64x64" alt="" />
                                    </a>
                                    <div className="media-body">
                                        <h4 className="media-heading">
                                          {comment.author}  <small className="pull-right">{(new Date(comment.timestamp)).toLocaleString()}</small>
                                        </h4>
                                        <p>{comment.body}</p>
                                        <button type="button" className="btn btn-black btn-xs">
                                          Vote Score : {comment.voteScore}
                                        </button>
                                        <button type="button" className="btn btn-black btn-xs" onClick={() => this.handleUpVoteComment(comment.id, postId)}>
                                          <span className="glyphicon glyphicon-thumbs-up"></span>
                                        </button>
                                        <button type="button" className="btn btn-black btn-xs" onClick={() => this.handleDownVoteComment(comment.id, postId)}>
                                          <span className="glyphicon glyphicon-thumbs-down"></span>
                                        </button>
                                        <button type="button" className="btn btn-danger btn-xs pull-right" onClick={() => this.handleDeleteComment(comment.id, postId)}><span className="glyphicon glyphicon-trash"></span></button>
                                        <a href={`/editComment/${comment.id}`} type="button" className="btn btn-black btn-xs pull-right">
                                          <span className="glyphicon glyphicon-edit"></span>
                                        </a>
                                    </div>
                                    <hr />
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
                  }else{
                    return (
                      <div className="container">
                        <div className="col-md-7">
                          <p className="lead bg-danger">Post is Deleted!</p>
                        </div>
                      </div>
                    )
                  }
                }
              })}
            </div>
        )
	}
}

export default Post