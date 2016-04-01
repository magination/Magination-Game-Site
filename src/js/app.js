var React = require('react');
var ReactDOM = require('react-dom');

var Router = require('react-router').Router
var Route = require('react-router').Route
var browserHistory = require('react-router').browserHistory;

var LoginStore = require('./stores/LoginStore');
var NavigationAction = require('./actions/NavigationAction');
var NavigationStore = require('./stores/NavigationStore');

var Menu = require('./components/organisms/NavigationMenu.organism');
var LoginForm = require('./components/organisms/LoginForm.organism');
var RegisterForm = require('./components/organisms/RegisterForm.organism');
var StatusBar = require('./components/organisms/StatusBar.organism');

var GameForm = require('./components/organisms/GameForm.organism');
var BrowseGames = require('./components/organisms/BrowseGames.organism');

var reactApp = React.createClass({
	componentDidMount: function(){

	},
	componentWillReceiveProps: function(nextProps){
		var routeChanged = nextProps.location != this.props.location;
		if(routeChanged){
			NavigationAction.setCurrentPath({
			    destination: nextProps.location.pathname
			});
		}
	},
	render: function(){
		return(
			<div>
				<div className="container">
					<StatusBar />
					<Menu></Menu>
					<div className="row">{this.props.children}</div>
				</div>
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
				<Route path="upload" component={GameForm}/>
				<Route path="browse" component={BrowseGames}/>
			</Route>
		</Router>)
	, mountNode);