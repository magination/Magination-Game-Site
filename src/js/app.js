var React = require('react');
var ReactDOM = require('react-dom');

var Router = require('react-router').Router;
var Route = require('react-router').Route;
var browserHistory = require('react-router').browserHistory;

var NavigationAction = require('./actions/NavigationAction');

var Menu = require('./components/organisms/NavigationMenu.organism');
var LoginForm = require('./components/organisms/LoginForm.organism');
var RegisterForm = require('./components/organisms/RegisterForm.organism');
var StatusBar = require('./components/organisms/StatusBar.organism');
var ConfirmEmail = require('./components/organisms/ConfirmEmail.organism');
var VerificationSent = require('./components/organisms/VerificationSent.organism');

var GameForm = require('./components/organisms/GameForm.organism');
var BrowseGames = require('./components/organisms/BrowseGames.organism');

var reactApp = React.createClass({
	componentWillMount: function () {
		NavigationAction.setCurrentPath({
			destination: this.props.location.pathname
		});
	},
	render: function () {
		return (
			<div>
				<div className='container'>
					<Menu></Menu>
					<StatusBar />
					<div className='row'>{this.props.children}</div>
				</div>
			</div>
		);
	}
});

var mountNode = document.getElementById('react-container');

ReactDOM.render((
		<Router history={browserHistory}>
			<Route path='/' component={reactApp}>
				<Route path='/login' component={LoginForm}/>
				<Route path='/register' component={RegisterForm}/>
				<Route path='/upload' component={GameForm}/>
				<Route path='/browse' component={BrowseGames}/>
				<Route path='/confirmation/:id' component={ConfirmEmail}/>
				<Route path='/verificationsent' component={VerificationSent} />
				<Route path='*' component={BrowseGames}/>/*TODO make 404 component*/
			</Route>
		</Router>)
	, mountNode);
