import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { addPost, receivePosts, receiveCategories } from '../actions'

import * as API from '../utils/api'

// import AllCategory from './AllCategories'
// import Post from './Post'

class App extends Component {

  componentDidMount(){
    this.props.dispatch(fetchCategories())
    this.props.dispatch(fetchPosts())
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

    return (
      <div className="App">
        <Route exact path='/' render={() => (
          <div>
            <ol>
              {this.props.category.map((category) => (
                <li key={category.name}>
                  <h2>
                    <a href={`/${category.name}/posts`}>{category.name}</a>
                  </h2>
                  <ol>
                    {this.props.post.map((post) => {
                      if(post.category === category.name){
                        return (<li key={post.id}>
                                  <h3><a href={`/post/${post.id}`}>{post.title}</a> <span className="label label-primary">{post.voteScore}</span></h3>
                                </li>)
                      }
                      return null;
                    })}
                  </ol>
                </li>
              ))}
            </ol>
            <button onClick ={() => this.props.dispatch(addPost(this.post))}>
              test
            </button>
          </div>
        )}/>
        <Route path='/:category/posts'  render={({match}) => {
          const category =  match.params.category

          return (
            <div>
              <h2>
               {category}
              </h2>
              <ol>
                {this.props.post.map((post) => {
                  if(post.category === category){
                    return (<li key={post.id}>
                              <h3>{post.title} <span className="label label-primary">{post.voteScore}</span></h3>
                            </li>)
                  }
                  return null;
                })}
              </ol>
              <button> Add a post </button>
            </div>
          )
        }}/>
        <Route path='/post/:id' render={({match}) => {
          const postId =  match.params.id

          return (
            <div>
                {this.props.post.map((post) => {
                  if(post.id === postId){
                    return (
                          <div>
                            <h3>{post.title} <span className="label label-primary">{post.voteScore}</span></h3>
                            <p>{post.category}</p>
                            <p>{post.author}</p>
                            <p>{post.body}</p>
                          </div>
                          )
                  }
                  return null;
                })}
            </div>
          )
        }}/>
      </div>
    );
  }
}

const categoryView = ({match}) => {
  const category =  match.params.category

  return (
    <div>
      <h2>
       {category}
      </h2>
      <ol>
        {this.props.post.map((post) => {
          if(post.category === category){
            return (<li key={post.id}>
                      <h3>{post.title} <span className="label label-primary">{post.voteScore}</span></h3>
                    </li>)
          }
          return null;
        })}
      </ol>
    </div>
  )
}

function mapStateToProps ( { category, post, comment } ){
    
    return {
      category : Object.keys(category).map((name) => ({
        ...category[name]
      })),
      post : Object.keys(post).map((id) => ({
        ...post[id]
      })),
      comment : Object.keys(comment).map((id) => ({
        ...comment[id]
      }))
    }
}

const fetchPosts = () => dispatch => (
  API
    .getAllPosts()
    .then(posts => dispatch(receivePosts(posts)))
);

const fetchCategories = () => dispatch => (
  API
    .getAllCategories()
    .then(categories => dispatch(receiveCategories(categories)))
);


export default connect(mapStateToProps)(App);
