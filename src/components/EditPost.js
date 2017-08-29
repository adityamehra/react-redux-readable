import React, { Component } from 'react'
import { connect } from 'react-redux'
import serializeForm from 'form-serialize'
import { showSnack } from 'react-redux-snackbar';

import { editFormBodyPost, editFormTitlePost } from '../actions'
import { editPost } from '../utils/api'


class EditPost extends Component {

  componentWillReceiveProps(nextProps) {
    if(this.props.post.length !== nextProps.post.length){
      this.props.dispatch(editFormTitlePost({title: nextProps.post[0] ? nextProps.post[0].title:"loading"}))
      this.props.dispatch(editFormBodyPost({body: nextProps.post[0] ? nextProps.post[0].body:"loading"}))
    }
  }

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
    console.log(postEdit)
    editPost(this.props.post[0].id, postEdit)
    // window.location.href=`/post/${this.props.post[0].id}`
    this.showSnackBar(Math.random().toString(36).substr(-8), "Post Edit!")
  }

  setEditBodyFormPost = (e) => {
    const body = e.target.value
    this.props.dispatch(editFormBodyPost({body}))
  }

  setEditTitleFormPost = (e) => {
    const title = e.target.value
    this.props.dispatch(editFormTitlePost({title}))
  }

	render() {
		return (
        <div className="container">
          <div className="col-md-6">
            <p className="lead">
              Edit Post
            </p>
            <form onSubmit={this.handleEditPost}>
              <div className="form-group">
                <label>Title</label>
                <input name="title" type="text" className="form-control" value={this.props.editFormTitlePost ? this.props.editFormTitlePost.title:"loading..."} onChange={this.setEditTitleFormPost} />
              </div>
              <div className="form-group">
                <label>Post</label>
                <textarea name="body" className="form-control" rows="8" value={this.props.editFormBodyPost ? this.props.editFormBodyPost.body:"loading..."} onChange={this.setEditBodyFormPost}></textarea>
              </div>
              <button className="btn btn-black">
                Save Chages!
              </button>
            </form>
          </div>
        </div>
    )
	}
}

function mapStateToProps ( { post, editFormBodyPost, editFormTitlePost }, ownProps ){
    return {
      post: post.filter(post => post.id === ownProps.postId),
      editFormBodyPost,
      editFormTitlePost
    }
}

export default connect(mapStateToProps)(EditPost);