import React from 'react'

export default function Nav(props) {
	return (
		<div className="container-fluid">
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="/">
              <span className="glyphicon glyphicon-book"></span> Readable
            </a>
          </div>
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li><a href="/">Link <span className="sr-only">(current)</span></a></li>
              <li><a href="/">Link</a></li>
              <li className="dropdown">
                <a href="/" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Categories<span className="caret"></span></a>
                <ul className="dropdown-menu">
                  {props.category.map(category => <li key={category.name}><a href={`/${category.name}/posts`}>{category.name}</a></li>)}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
	)
}