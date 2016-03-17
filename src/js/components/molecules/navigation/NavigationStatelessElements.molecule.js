var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var NavigationStatelessElements = React.createClass({
	render: function(){
		return(
			<div>
				<div className="navbar-header">
					<a className="navbar-brand" href="/">Magination</a>
				</div>
				<ul className="nav navbar-nav">
					<li><Link to="upload">Upload Game</Link></li>
					<li><Link to="browse">Browse Games</Link></li>
				</ul>
			</div>
		);
	}
});

module.exports = NavigationStatelessElements;