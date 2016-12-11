import React, { Component, PropTypes } from 'react';
import NavigationAction from './actions/NavigationAction';
import LoginAction from './actions/LoginAction';
import LoginStore from './stores/LoginStore'// eslint-disable-line no-unused-vars
import GameCreatorAction from'./actions/GameCreatorAction';
import FrontPage from './components/organisms/FrontPage.organism';
import config from './config/config';
const URLS = config.urls;

import Menu from './components/organisms/NavigationMenu.organism';
import StatusBar from './components/organisms/StatusBar.organism';
import Footer from './components/organisms/Footer';

class App extends Component {
	componentWillMount() {
		NavigationAction.setCurrentPath({
			destination: this.props.location.pathname
		});
		LoginAction.checkAutoLogin();
	}

	componentDidMount() {
		$.ajaxSetup({
			timeout: (1000 * 10) /* milliseconds*/
		});
		$.ajaxPrefilter(function (options, originalOptions, jqXHR) {
			originalOptions._error = originalOptions.error;
			// overwrite error handler for current request
			options.error = function (_jqXHR, _textStatus, _errorThrown) {
				if (_jqXHR.status === 401) {
					if (originalOptions.url === URLS.api.refresh) {
						console.error('Error fetching new accessToken with refreshToken, calling logout()');
						LoginAction.logoutSuccess();
						return;
					}
					if (!originalOptions.headers || !originalOptions.headers['Authorization']) {
						/* this means fetching token will not help authorizing the request*/
						return;
					}
					if (LoginStore.getLoginState().isLoggedIn) {
						console.info('401 while state indicated logged in status. Assuming token has expired; fetching new token');
						LoginAction.appendLastUnsuccessfulRequestOptions({lastRequestOptions: originalOptions});
					}
					LoginAction.checkAutoLogin();
				}
			};
		});
		GameCreatorAction.setListeners();
	}

	componentWillUnmount() {
		GameCreatorAction.removeListeners();
	}

	componentWillReceiveProps(nextProps) {
		/* 	TODO: should be done in another way. componentWillReceiveProps happens every time a navigation in react-router is done.
			Redundant action with NavigationAction.navigate()
			Maybe figure a way to make react-router call NavigationAction.navigate() on back button press(?)
		*/
		NavigationAction.setCurrentPath({
			destination: nextProps.location.pathname
		});
		$.get('/analytics?path='+nextProps.location.pathname);
	}

	render() {
		return (
			<div className='container'>
				<Menu />
				<StatusBar />
				<div className='row' style={{'minHeight': '500px'}}>{this.props.children !== null ? this.props.children : <FrontPage />}</div>
				<Footer />
			</div>
		);
	}
}

module.exports = App;
