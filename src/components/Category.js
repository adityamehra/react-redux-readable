import React, { Component } from 'react'
import { connect } from 'react-redux'

import PostList from './PostList'

class Category extends Component {

  render() {
    return (
      <div className="container">
        <div className="row">
          <h2> <span className="glyphicon glyphicon-th-list"></span> Posts </h2>
          <h2><small><span className="glyphicon glyphicon-tag"></span> {this.props.categoryName } </small></h2>
          <PostList 
            dispatch = {this.props.dispatch}
            posts={this.props.posts}
            comments={this.props.comments}
          />
        </div>
      </div>
    )
  }
}

function mapStateToProps ( { post, comment }, ownProps ){
    return {
      posts: post.filter(post => post.category === ownProps.categoryName),
      comments:comment,
      categoryName: ownProps.categoryName
    }
}

export default connect(mapStateToProps)(Category);