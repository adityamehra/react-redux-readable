import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { addPost, receiveCategories, receivePosts, receiveComments } from '../actions'

import * as API from '../utils/api'

class App extends Component {

  componentDidMount(){
    this.props.dispatch(fetchCategories())
    this.props.dispatch(fetchPostsAndComments()) 
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
    // console.log(this.state.comments)

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
              <button type="button" className="btn btn-default" onClick ={() => this.props.dispatch(addPost(this.post))}>
                Add a Post <span className="glyphicon glyphicon-pencil"></span>
              </button>
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
                    <div className="container" key={post.id}>
                      <div className="row">
                        <div className="col-md-6">
                          <h1>{post.title} <span className="badge">{post.voteScore}</span></h1>
                          <p className="lead">
                              by <a href="">{post.author}</a>
                          </p>
                          <hr />
                          <p><span className="glyphicon glyphicon-time"></span> Posted on {(new Date(post.timestamp)).toString()}</p>
                          <hr />
                          <p className="lead">{post.body}</p>
                          <hr />
                          <h4>Comments</h4>
                          <div className="well">
                            <h4>Leave a Comment:</h4>
                            <form>
                                <div className="form-group">
                                    <textarea className="form-control" rows="3"></textarea>
                                </div>
                                <button className="btn btn-primary">Submit</button>
                            </form>
                          </div>
                          <hr />
                          <ol>
                            {this.props.comment.map((comment) => {
                              if(comment.parentId === post.id){
                                return (
                                  <div className="media" key={comment.id}>
                                    <a className="pull-left" href="">
                                      <img className="media-object" src="http://placehold.it/64x64" alt="" />
                                    </a>
                                    <div className="media-body">
                                        <h4 className="media-heading">{comment.author}  <small>{(new Date(comment.timestamp)).toString()}</small>
                                        </h4>
                                        {comment.body}
                                    </div>
                                  </div>
                                )
                              }
                              return null;
                            })}
                          </ol>
                        </div>
                      </div>
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

// const categoryView = ({match}) => {
//   const category =  match.params.category

//   return (
//     <div>
//       <h2>
//        {category}
//       </h2>
//       <ol>
//         {this.props.post.map((post) => {
//           if(post.category === category){
//             return (<li key={post.id}>
//                       <h3>{post.title} <span className="label label-primary">{post.voteScore}</span></h3>
//                     </li>)
//           }
//           return null;
//         })}
//       </ol>
//     </div>
//   )
// }

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

const fetchCategories = () => dispatch => (
  API
    .getAllCategories()
    .then(categories => dispatch(receiveCategories(categories)))
);

const fetchPostsAndComments = () => dispatch => {
  return dispatch(
    fetchPosts()
  )
}

const fetchPosts = () => dispatch => (
  API
    .getAllPosts()
    .then((posts) => {
      Promise.all([
        dispatch(receivePosts(posts)),
        dispatch(fetchComments(posts))
      ])
    })
);

const fetchComments = (posts) => dispatch => {
  return posts.map((post) => API
    .getAllComments(post.id)
    .then(comments => dispatch(receiveComments(comments)))
  )
}

export default connect(mapStateToProps)(App);


