import React, { Component } from 'react'
import sortBy from 'sort-by'
import serializeForm from 'form-serialize'
import { showSnack, dismissSnack } from 'react-redux-snackbar';

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

import { sortByUpVoteComments, sortByDownVoteComments } from '../actions'

import './App.css'

class Post extends Component {

  componentDidMount() {
    this.props.dispatch(fetchComments(this.props.postId))
    this.sortComments()
    // this.props.dispatch(this.sortComments())
  }

  componentWillReceiveProps() {

    
  }

  sortComments = () => {
    // console.log("sort comments")
    this.props.dispatch(sortByUpVoteComments(this.props.comment))
    // console.log(this.props.comment)
  }

  downSortComments = () => {
    // console.log("sort comments")
    this.props.dispatch(sortByDownVoteComments(this.props.comment))
    // console.log(this.props.comment)
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
    this.props.dispatch(deleteComment_wrapper(id))
    this.showSnackBar(Math.random().toString(36).substr(-8), "Comment deleted!")
    console.log("handleDeleteComment " + id )
  }

	render() {
        // console.log(this.props)
        const postId = this.props.postId
        return (
            <div>
              {this.props.post.map((post) => {
                if(post.id === postId){
                  return (
                    <div key={post.id}>
                      <div className="container">
                        <div className="col-md-7">
                          <h1>{post.title}</h1>
                          <p className="lead">
                              by <a href="">{post.author}</a>
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
                            <button type="button" className="btn btn-black btn-xs pull-right">
                              <span className="glyphicon glyphicon-edit"></span>
                            </button>  
                          </div>
                          <hr />
                          <p><span className="glyphicon glyphicon-time"></span> Posted on {(new Date(post.timestamp)).toString()}</p>
                          {console.log(new Date(post.timestamp))}
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
                                    <textarea type="text" name="comment" className="form-control" rows="3" placeholder="Comment"></textarea>
                                </div>
                                <button className="btn btn-black">Comment</button>
                            </form>
                          </div>
                        </div>
                        <h4>Comments</h4>
                        <hr />
                        <div className="col-md-5">
                          <div className="btn-group">
                            <button type="button" className="btn btn-black dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              Sort by <span className="caret"></span>
                            </button>
                            <ul className="dropdown-menu">
                              <li onClick={() => this.props.dispatch(sortByUpVoteComments(this.props.comment))}>
                                <button type="button" className="btn btn-black btn-xs" >
                                  UpVotes
                                </button>
                              </li>
                              <li role="separator" className="divider"></li>
                              <li>
                                <button type="button" className="btn btn-black btn-xs" onClick={() => this.props.dispatch(sortByDownVoteComments(this.props.comment))}>
                                  DownVotes
                                </button>
                              </li>                
                            </ul>
                          </div>         
                          <hr />
                          <div>
                            {this.props.comment.map((comment) => {
                              if(!comment.deleted) {
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
                                          <button type="button" className="btn btn-black btn-xs">
                                            Vote Score : {comment.voteScore}
                                          </button>
                                          <button type="button" className="btn btn-black btn-xs" onClick={() => this.handleUpVoteComment(comment.id)}>
                                            <span className="glyphicon glyphicon-thumbs-up"></span>
                                          </button>
                                          <button type="button" className="btn btn-black btn-xs" onClick={() => this.handleDownVoteComment(comment.id)}>
                                            <span className="glyphicon glyphicon-thumbs-down"></span>
                                          </button>
                                        </a>
                                        <button type="button" className="btn btn-danger btn-xs pull-right" onClick={() => this.handleDeleteComment(comment.id)}><span className="glyphicon glyphicon-trash"></span></button>
                                        <button type="button" className="btn btn-black btn-xs pull-right"> Edit </button>
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
	}
}

export default Post