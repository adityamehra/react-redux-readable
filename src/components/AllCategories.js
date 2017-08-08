import React, { Component } from 'react';

class AllCategory extends Component {
	render() {
		return (
            <div className="col-md-3">
                <div className="thumbnail">
                    <img className="img-responsive" src="http://placehold.it/800x300" alt=""/>
                    <div className="caption-full">
                        <h4><a href="#">Category 1</a>
                        </h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
                    </div>
                </div>
                <div className="well">
                    <h3> 
                    	Posts
                    </h3>
                    <div className="row">
                        <div className="col-md-12">
                            <span className="pull-right">10 days ago</span>
                            <p>This product was great in terms of quality. I would definitely buy another!</p>
                        </div>
                    </div>
                </div>
            </div>

		)
	}
}

export default AllCategory