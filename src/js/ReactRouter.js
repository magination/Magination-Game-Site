var React = require('react');

var Router = require('react-router').Router;
var Route = require('react-router').Route;
var browserHistory = require('react-router').browserHistory;

/*
var FeedbackStore = require('./stores/FeedbackStore');
var LoginStore = require('./stores/LoginStore');
var NavigationStore = require('./stores/NavigationStore');
*/

var App = require('./App');
var LoginForm = require('./components/organisms/LoginForm.organism');
var RegisterForm = require('./components/organisms/RegisterForm.organism');
var ConfirmEmail = require('./components/organisms/ConfirmEmail.organism');
var VerificationSent = require('./components/organisms/VerificationSent.organism');
var GameForm = require('./components/organisms/GameForm.organism');
var BrowseGames = require('./components/organisms/BrowseGames.organism');
var Game = require('./components/organisms/Game.organism');

var ReactRouter = React.createClass({
	render: function () {
		return (
			<div>
				<Router history={browserHistory}>
					<Route path='/' component={App}>
						<Route path='/login' component={LoginForm} />
						<Route path='/register' component={RegisterForm} />
						<Route path='/upload' component={GameForm} />
						<Route path='/browse' component={BrowseGames} />
						<Route path='/confirmation/:id' component={ConfirmEmail} />
						<Route path='/verificationsent' component={VerificationSent} />
						<Route path='/game/:id' component={Game} />
						<Route path='*' component={BrowseGames} />
					</Route>
				</Router>
			</div>
		);
	}
});

module.exports = ReactRouter;
