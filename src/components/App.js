import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Snackbar } from 'react-redux-snackbar';

import {
  fetchCategories,
  fetchPostsAndComments,
  fetchPosts,
} from '../utils/api_thunk_wrapper.js'

import './App.css'
import Post from './Post'
import Nav from './Nav'
import Category from './Category'
import NewPost from './NewPost'
import EditPost from './EditPost'
import CategoriesAndPosts from './CategoriesAndPosts'
import EditComment from './EditComment'

class App extends Component {

  componentDidMount() {
    this.props.dispatch(fetchCategories())
    this.props.dispatch(fetchPostsAndComments())
  }

  render() {
    // console.log(this.props)
    return (
      <div className="App">
        <Snackbar />
        <Nav category={this.props.category} />
        <Route exact path='/' render={() => (
          <CategoriesAndPosts
            dispatch = {this.props.dispatch}
            categories={this.props.category}
            posts={this.props.post}
            comments={this.props.comment}
          /> 
        )}/>
        <Route path='/:category/posts'  render={({match}) => (
          <Category 
            categoryName={match.params.category}
          />
        )}/>
        <Route path='/post/:id' render = {({match}) => (
          <Post 
            dispatch = {this.props.dispatch}
            postId = {match.params.id}
            post = {this.props.post}
            comment = {this.props.comment}
          />
        )}/>
        <Route path='/newPost' render={({match}) => (
          <NewPost 
            dispatch={this.props.dispatch}
            categories={this.props.category}
          />
        )}/>
        <Route path='/editPost/:id' render={({match}) => (
          <EditPost
            postId={match.params.id}
          />
        )}/>
        <Route path='/editComment/:id' render={({match}) => (
          <EditComment
            commentId={match.params.id}
          />
        )}/>
      </div>
    );
  }
}

function mapStateToProps ( { category, post, comment } ){
    
    return {
      category : Object.keys(category).map((name) => ({
        ...category[name]
      })),
      post,
      comment
    }
}

export default connect(mapStateToProps)(App);


