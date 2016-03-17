var React = require('react');
var Link = require('react-router').Link;
var browserHistory = require('react-router').browserHistory;

var NavigationLoginState = React.createClass({
	render: function(){
		return(
			<ul className="nav navbar-nav navbar-right">
				<li><Link to="login">Login</Link></li>
				<li><Link to="register">Register</Link></li>
			</ul>
		);
	}
});

module.exports = NavigationLoginState;