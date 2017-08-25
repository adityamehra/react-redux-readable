import React, { Component } from 'react'

import serializeForm from 'form-serialize'
import { showSnack } from 'react-redux-snackbar';

import {
  postPost
} from '../utils/api_thunk_wrapper.js'


class NewPost extends Component {

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
    window.location.href="/"
    this.showSnackBar(Math.random().toString(36).substr(-8), "Post added!")
  }

	render() {
		return (
      <div>
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
                  {this.props.categories.map(category => <option key={category.name}>{category.name}</option>)}
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
	}
}

export default NewPost