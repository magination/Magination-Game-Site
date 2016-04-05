var React = require('react');

var Router = require('react-router').Router;
var Route = require('react-router').Route;
var browserHistory = require('react-router').browserHistory;

var LoginForm = require('./components/organisms/LoginForm.organism');
var RegisterForm = require('./components/organisms/RegisterForm.organism');
var ConfirmEmail = require('./components/organisms/ConfirmEmail.organism');
var VerificationSent = require('./components/organisms/VerificationSent.organism');
var GameForm = require('./components/organisms/GameForm.organism');
var BrowseGames = require('./components/organisms/BrowseGames.organism');
var App = require('./App');

var ReactRouter = React.createClass({
	render: function () {
		return (
			<Router history={browserHistory}>
				<Route path='/' component={App}>
					<Route path='/login' component={LoginForm} />
					<Route path='/register' component={RegisterForm} />
					<Route path='/upload' component={GameForm} />
					<Route path='/browse' component={BrowseGames} />
					<Route path='/confirmation/:id' component={ConfirmEmail} />
					<Route path='/verificationsent' component={VerificationSent} />
					<Route path='*' component={BrowseGames} />/*TODO make 404 component*/
				</Route>
			</Router>
		);
	}
});

module.exports = ReactRouter;
