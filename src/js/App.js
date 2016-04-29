var React = require('react');

var NavigationAction = require('./actions/NavigationAction');
var LoginAction = require('./actions/LoginAction');
var LoginStore = require('./stores/LoginStore');// eslint-disable-line no-unused-vars

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
			error: function () { console.log('an error'); }
		});
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
				<div className='row'>{this.props.children}</div>
			</div>
		);
	}
});

module.exports = App;
