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
var FrontPage = require('./components/organisms/FrontPage.organism');
var RegisterForm = require('./components/organisms/RegisterForm.organism');
var ConfirmEmail = require('./components/organisms/ConfirmEmail.organism');
var VerifyEmailChange = require('./components/organisms/VerifyEmailChange');
var VerificationSent = require('./components/organisms/VerificationSent.organism');
var CreateGame = require('./components/organisms/CreateGame.organism');
var BrowseGames = require('./components/organisms/BrowseGames.organism');
var Game = require('./components/organisms/Game.organism');
var SettingsForm = require('./components/organisms/SettingsForm.organism');
var ForgotPassword = require('./components/organisms/ForgotPassword.organism');
var MyGames = require('./components/organisms/MyGames.organism');
var ConfirmForgotPassword = require('./components/organisms/ConfirmForgotPassword.organism');
var PATHS = require('./constants/NavigationConstants').PATHS;
var Moderator = require('./components/organisms/ModeratorPage.organism');
var ReactRouter = React.createClass({
	render: function () {
		return (
			<div>
				<Router history={browserHistory}>
					<Route path='/' component={App}>
						<Route path='/login' component={LoginForm} />
						<Route path='/register' component={RegisterForm} />
						<Route path='/mygames' component={MyGames} />
						<Route path={PATHS.creategame} component={CreateGame} />
						<Route path={PATHS.discover} component={BrowseGames} />
						<Route path='/confirmation/:id' component={ConfirmEmail} />
						<Route path='/verificationsent' component={VerificationSent} />
						<Route path='/verifyEmailChange/:id' component={VerifyEmailChange} />
						<Route path='/game/:id' component={Game} />
						<Route path='/settings' component={SettingsForm}/>
						<Route path={PATHS.forgotpassword} component={ForgotPassword}/>
						<Route path={PATHS.confirmforgotpassword} component={ConfirmForgotPassword}/>
						<Route path='/moderator' component={Moderator}/>
						<Route path='*' component={FrontPage} />
					</Route>
				</Router>
			</div>
		);
	}
});

module.exports = ReactRouter;
