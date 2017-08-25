import React, { Component } from 'react'
import { connect } from 'react-redux'
import serializeForm from 'form-serialize'
import { showSnack } from 'react-redux-snackbar';

import {
  postPost
} from '../utils/api_thunk_wrapper.js'


class EditPost extends Component {

	showSnackBar = (id, label) => {
    this.props.dispatch(showSnack(id, {
      label: label,
      timeout: 3000,
      button: { label: 'OK' }
    }));
  }

  handleEditPost = (e) => {
    e.preventDefault()
    const values = serializeForm(e.target, { hash: true })
    const postEdit = {
      title: values.title,
      body: values.body,
    }
    //this.props.dispatch(editPost_wrapper(this.props.post.id, postEdit))
    window.location.href="/"
    this.showSnackBar(Math.random().toString(36).substr(-8), "Post added!")
  }

	render() {
		return (
        <div className="container">
          <div className="col-md-6">
            <form onSubmit={this.handleEditPost}>
              <div className="form-group">
                <label>Title</label>
                <input type="text" name="title" className="form-control" id="exampleInputEmail1" placeholder="Title" ref={(input) => { this.textInput = input; }}/>
              </div>
              <div className="form-group">
                <label>Post</label>
                <textarea name="body" className="form-control" rows="8" value={this.props.post[0]}></textarea>
              </div>
              <button className="btn btn-black">
                Done
              </button>
            </form>
          </div>
        </div>
    )
	}
}

function mapStateToProps ( { post }, ownProps ){
    return {
      post: post.filter(post => post.id === ownProps.postId)
    }
}

export default connect(mapStateToProps)(EditPost);