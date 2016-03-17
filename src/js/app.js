var React = require('react');
var ReactDOM = require('react-dom');

var Router = require('react-router').Router
var Route = require('react-router').Route
var Link = require('react-router').Link
var browserHistory = require('react-router').browserHistory;

var LoginStore = require('./stores/LoginStore');

var Menu = require('./components/organisms/NavigationMenu.organism');
var LoginForm = require('./components/organisms/LoginForm.organism');
var RegisterForm = require('./components/organisms/RegisterForm.organism');
var BrowseGames = require('./components/organisms/BrowseGames.organism');

var reactApp = React.createClass({
	render: function(){
		return(
			<div className="container">
				<Menu></Menu>
				<div className="row">{this.props.children}</div>
			</div>
		);
	}
});

var mountNode = document.getElementById('react-container');

ReactDOM.render((
		<Router history={browserHistory}>
			<Route path="/" component={reactApp}>
				<Route path="login" component={LoginForm}/>
				<Route path="register" component={RegisterForm}/>
				<Route path="browse" component={BrowseGames}/>
			</Route>
		</Router>)
	, mountNode);