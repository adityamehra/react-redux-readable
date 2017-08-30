import React from 'react'

import AllCategories from './AllCategories'
import PostList from './PostList'

export default function CategoriesAndPosts(props) {
	return (
		<div className="container">
      <AllCategories 
        categories={props.categories}
        posts={props.posts} 
      />
      <h2> <span className="glyphicon glyphicon-th-list"></span> Posts </h2>
      <PostList 
        dispatch = {props.dispatch}
        posts={props.posts}
        comments={props.comments}
      />
    </div>
	)
}