import React, { Component, PropTypes } from 'react';

import {Router, Route, browserHistory} from 'react-router';

/*
var FeedbackStore = require('./stores/FeedbackStore');
var LoginStore = require('./stores/LoginStore');
var NavigationStore = require('./stores/NavigationStore');
*/

import App from './App';
import LoginForm from './components/organisms/LoginForm.organism';
import FrontPage from './components/organisms/FrontPage.organism';
import NotFoundPage from './components/organisms/NotFoundPage.organism';
import RegisterForm from'./components/organisms/RegisterForm.organism';
import ConfirmEmail from './components/organisms/ConfirmEmail.organism';
import VerifyEmailChange from './components/organisms/VerifyEmailChange';
import VerificationSent from './components/organisms/VerificationSent.organism';
import CreateGame from './components/organisms/CreateGame.organism';
import BrowseGames from './components/organisms/BrowseGames.organism';
import Game from './components/organisms/Game.organism';
import SettingsForm from './components/organisms/SettingsForm.organism';
import ForgotPassword from './components/organisms/ForgotPassword.organism';
import MyGames from './components/organisms/MyGames.organism';
import ConfirmForgotPassword from'./components/organisms/ConfirmForgotPassword.organism';
import { PATHS } from './constants/NavigationConstants';
import Moderator from './components/organisms/ModeratorPage.organism';
import Admin from './components/organisms/AdminPage';

class ReactRouter extends Component {
	render() {
		return (
			<div>
				<Router history={browserHistory}>
					<Route path='/' component={App}>
						<Route path='/login' component={LoginForm} />
						<Route path='/home' component={FrontPage} />
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
						<Route path='/admin' component={Admin}/>
						<Route path='*' component={NotFoundPage} />
					</Route>
				</Router>
			</div>
		);
	}
}

module.exports = ReactRouter;
