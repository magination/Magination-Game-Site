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
var SettingsForm = require('./components/organisms/SettingsForm.organism');
var ForgotPassword = require('./components/organisms/ForgotPassword.organism');
var ConfirmForgotPassword = require('./components/organisms/ConfirmForgotPassword.organism');
var PATHS = require('./constants/NavigationConstants').PATHS;

var ReactRouter = React.createClass({
	render: function () {
		return (
			<div>
				<Router history={browserHistory}>
					<Route path='/' component={App}>
						<Route path='/login' component={LoginForm} />
						<Route path='/register' component={RegisterForm} />
						<Route path={PATHS.creategame} component={GameForm} />
						<Route path={PATHS.discover} component={BrowseGames} />
						<Route path='/confirmation/:id' component={ConfirmEmail} />
						<Route path='/verificationsent' component={VerificationSent} />
						<Route path='/game/:id' component={Game} />
						<Route path='/settings' component={SettingsForm}/>
						<Route path={PATHS.forgotpassword} component={ForgotPassword}/>
						<Route path={PATHS.confirmforgotpassword} component={ConfirmForgotPassword}/>
						<Route path='*' component={BrowseGames} />
					</Route>
				</Router>
			</div>
		);
	}
});

module.exports = ReactRouter;
