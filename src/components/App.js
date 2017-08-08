import React, { Component } from 'react'
import { Route } from 'react-router-dom'

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

  render() {
    return (
      <div className="App">
        <Route exact path='/' render={() => (
          <div className="container">
            <div className="row">
              <AllCategory />
              <AllCategory />
              <AllCategory />
              <AllCategory />
            </div>
          </div>
        )}/>
        <Route path='/posts' render={() => (
          <Post />
        )}/>
      </div>
    );
  }
}

export default App;
