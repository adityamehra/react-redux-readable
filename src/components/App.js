import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { addPost } from '../actions'
import './App.css'

import * as API from '../utils/api'

import AllCategory from './AllCategories'
import Post from './Post'

class App extends Component {

  state = {
    categories : null,
    posts : null
  }

  componentDidMount(){
    API.getAllCategories().then(categories => {
      this.setState({ categories : categories })
    })

    API.getAllPosts().then(posts => {
      this.setState({ posts })
    })
  }

  post = {
      type: 'ADD_POST',
      id: '8xf0y6ziyjabvozdd253am',
      timestamp: 1467166872634,
      title: 'Udacity is the best place to learn React',
      body: 'Everyone says so after all.',
      author: 'thingtwo',
      category: 'react',
      voteScore: 6,
      deleted: false 
    }

  render() {
    console.log(this.props)
    // console.log(this.state.categories)
    // console.log(this.state.posts)

    return (
      <div className="App">
        <button onClick ={() => this.props.dispatch(addPost(this.post))}>
          test
        </button>
        <ol>
          {this.props.post.map((post) => (
            <li key={post.id}>
              <p>{post.title}</p>
              <p>{post.body}</p>
              <p>{post.author}</p>
              <p>{post.category}</p>
              <p>{post.voteScore}</p>
            </li>
          ))}
        </ol>
      </div>
    );
  }
}

function mapStateToProps ( { post, comment } ){
    
    return {
      post : Object.keys(post).map((id) => ({
        ...post[id]
      })),
      comment : Object.keys(comment).map((id) => ({
        ...comment[id]
      }))
    }
}


export default connect(mapStateToProps)(App);
