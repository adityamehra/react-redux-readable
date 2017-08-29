import React, { Component } from 'react'
import { connect } from 'react-redux'
import serializeForm from 'form-serialize'
import { showSnack } from 'react-redux-snackbar';

import { editFormBodyComment } from '../actions'
import { editComment } from '../utils/api'
import { receiveSingleComment_wrapper } from '../utils/api_thunk_wrapper'


class EditPost extends Component {

  componentDidMount() {
    this.props.dispatch(receiveSingleComment_wrapper(this.props.commentId))
  }

	showSnackBar = (id, label) => {
    this.props.dispatch(showSnack(id, {
      label: label,
      timeout: 3000,
      button: { label: 'OK' }
    }));
  }

  handleEditComment = (e) => {
    e.preventDefault()
    const values = serializeForm(e.target, { hash: true })
    const commentEdit = {
      timeStamp: Date.now(),
      body: values.comment,
    }
    console.log(commentEdit)
    editComment(this.props.commentId, commentEdit)
    // window.location.href="/"
    this.showSnackBar(Math.random().toString(36).substr(-8), "Comment Edit!")
  }

  setEditBodyFormComment = (e) => {
    const body = e.target.value
    this.props.dispatch(editFormBodyComment({body}))
  }

	render() {
		return (
        <div className="container">
          <div className="col-md-6">
            <p className="lead">
              Edit Comment
            </p>
            <form onSubmit={this.handleEditComment}>
              <div className="form-group">
                <label>Comment</label>
                <textarea type="text" name="comment" className="form-control" rows="3" value={this.props.comment.body} onChange={this.setEditBodyFormComment}></textarea>
              </div>
              <button className="btn btn-black">
                Save Changes!
              </button>
            </form>
          </div>
        </div>
    )
	}
}

function mapStateToProps ( { singleComment }, ownProps ){

    return {
      comment: singleComment,
      commentId: ownProps.commentId
    }
}

export default connect(mapStateToProps)(EditPost);