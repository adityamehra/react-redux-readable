import React from 'react'
import { Link } from 'react-router-dom'

export default function AllCategories(props) {
  return (
    <div className="row">
      <h2><span className="glyphicon glyphicon-th"></span> Categories</h2>
      <hr />
      {props.categories.map(category => (
        <div className="col-sm-6 col-md-4" key={category.name}>
          <div className="thumbnail">
            <div className="caption">
              <h3>{category.name}</h3>
                <p>
                  <a href={`/${category.name}/posts`} className="btn btn-black" role="button">
                    See more posts <span className="glyphicon glyphicon-eye-open"></span>
                  </a> 
                  <a href={`/newPost`} className="btn btn-black" role="button">
                    Write new post <span className="glyphicon glyphicon-pencil"></span>
                  </a>
                </p>
              </div>
            </div>
        </div>
      ))}
    </div>
  )
}