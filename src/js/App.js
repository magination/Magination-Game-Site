var React = require('react');

var NavigationAction = require('./actions/NavigationAction');
var LoginAction = require('./actions/LoginAction');
var LoginStore = require('./stores/LoginStore');// eslint-disable-line no-unused-vars
var GameCreatorStore = require('./stores/GameCreatorStore'); // eslint-disable-line no-unused-vars
var GameCreatorAction = require('./actions/GameCreatorAction');
var GameStore = require('./stores/GameStore'); // eslint-disable-line no-unused-vars
var MyGamesStore = require('./stores/MyGamesStore'); // eslint-disable-line no-unused-vars
var URLS = require('./config/config').urls;
var FrontPage = require('./components/organisms/FrontPage.organism');

var Menu = require('./components/organisms/NavigationMenu.organism');
var StatusBar = require('./components/organisms/StatusBar.organism');

var App = React.createClass({
	componentWillMount: function () {
		NavigationAction.setCurrentPath({
			destination: this.props.location.pathname
		});
		LoginAction.checkAutoLogin();
	},
	componentDidMount: function () {
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
					if (LoginStore.getLoginState().isLoggedIn) {
						console.info('401 while state indicated logged in status. Assuming token has expired; fetching new token');
						LoginAction.appendLastUnsuccessfulRequestOptions({lastRequestOptions: originalOptions});
					}
					LoginAction.checkAutoLogin();
				}
			};
		});
		GameCreatorAction.setListeners();
	},
	componentWillUnmount: function () {
		GameCreatorAction.removeListeners();
	},
	componentWillReceiveProps: function (nextProps) {
		/* 	TODO: should be done in another way. componentWillReceiveProps happens every time a navigation in react-router is done.
			Redundant action with NavigationAction.navigate()
			Maybe figure a way to make react-router call NavigationAction.navigate() on back button press(?)
		*/
		NavigationAction.setCurrentPath({
			destination: nextProps.location.pathname
		});
	},
	render: function () {
		return (
			<div className='container'>
				<Menu></Menu>
				<StatusBar />
				<div className='row'>{this.props.children !== null ? this.props.children : <FrontPage/>}</div>
			</div>
		);
	}
});

module.exports = App;
