import React, { Component } from 'react'

import {
  upVotePost_wrapper,
  downVotePost_wrapper,
  deletePost_wrapper,
} from '../utils/api_thunk_wrapper.js'

import { sortByUpVotePosts, sortByDownVotePosts, sortByIncTimePosts, sortByDecTimePosts } from '../actions'

import './App.css'

class PostList  extends Component {

	handleDeletePost = (id) => {
    this.props.dispatch(deletePost_wrapper(id))
  }

	handleUpVotePost = (id) => {
    this.props.dispatch(upVotePost_wrapper(id))
  }

  handleDownVotePost = (id) => {
    this.props.dispatch(downVotePost_wrapper(id))
  }

	render() {
		return (
			<div>
				<hr />
        <a href={`/newPost`} className="btn btn-black" role="button">
          Write new post <span className="glyphicon glyphicon-pencil"></span>
        </a>
	      <div className="btn-group pull-right">	
          <button type="button" className="btn btn-black dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Sort by <span className="caret"></span>
          </button>
          <ul className="dropdown-menu">
            <li>
              <button type="button" className="btn btn-black btn-xs" onClick={() => this.props.dispatch(sortByUpVotePosts(this.props.comment))}>
                UpVotes
              </button>
            </li>
            <li role="separator" className="divider"></li>
            <li>
              <button type="button" className="btn btn-black btn-xs" onClick={() => this.props.dispatch(sortByDownVotePosts(this.props.comment))}>
                DownVotes
              </button>
            </li>
            <li role="separator" className="divider"></li>
            <li>
              <button type="button" className="btn btn-black btn-xs" onClick={() => this.props.dispatch(sortByIncTimePosts(this.props.comment))}>
                Inc Time
              </button>
            </li>
            <li role="separator" className="divider"></li>  
            <li>
              <button type="button" className="btn btn-black btn-xs" onClick={() => this.props.dispatch(sortByDecTimePosts(this.props.comment))}>
                Dec Time
              </button>
            </li>                  
          </ul>
        </div>
	      <hr />
				<ul>
	        {this.props.posts.map((post) => {
	          if(!post.deleted) {
	            return (
	              <div key={post.id}>
	                <li>
	                  <h3>
	                    <a href={`/post/${post.id}`}>{post.title}</a>
	                    <button className="btn btn-black btn-sm pull-right">Vote Score : {post.voteScore}</button>
	                  </h3>
	                  <p className="small">
                      <span className="glyphicon glyphicon-user"></span> {post.author} <span className="glyphicon glyphicon-time"></span> {(new Date(post.timestamp)).toString()}
                    </p>
	                  <div>
	                    <button type="button" className="btn btn-black btn-sm" onClick={() => this.handleUpVotePost(post.id)}>
	                      Upvote <span className="glyphicon glyphicon-thumbs-up"></span>
	                    </button>
	                    <button type="button" className="btn btn-black btn-sm" onClick={() => this.handleDownVotePost(post.id)}>
	                      Downvote <span className="glyphicon glyphicon-thumbs-down"></span>
	                    </button>
	                    <button type="button" className="btn btn-black btn-sm pull-right" onClick={() => this.handleDeletePost(post.id)}>
                        <span className="glyphicon glyphicon-trash"></span>
                      </button>
                      <a href={`/editPost/${post.id}`} className="btn btn-black btn-sm pull-right" role="button">
                        <span className="glyphicon glyphicon-edit"></span>                
                      </a> 
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
		)
	}
}	 

export default PostList