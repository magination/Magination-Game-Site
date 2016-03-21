var React = require('react');

var LoginStore = require('../../stores/LoginStore');
var NavigationStore = require('../../stores/NavigationStore');

var NavigationStatelessElements = require('../molecules/navigation/NavigationStatelessElements.molecule');
var NavigationLoginState = require('../molecules/navigation/NavigationLoginState.molecule');
var NavigationLoggedInState = require('../molecules/navigation/NavigationLoggedInState.molecule');

function getLoginState() {
  return LoginStore.getLoginState();
}

var Menu = React.createClass({
	getInitialState: function(){
		return {
			isLoggedIn: getLoginState()
		};
	},
	componentDidMount: function(){
		LoginStore.addChangeListener(this.onLoginStateChanged);
	},
	componentWillUnmount: function(){
		LoginStore.removeChangeListener(this.onLoginStateChanged);
	},
	render: function(){
		var navigationStateElement;
		if(this.state.isLoggedIn){
			navigationStateElement = <NavigationLoggedInState />;
		}
		else {
			navigationStateElement = <NavigationLoginState />;
		}
		
		return (
			<div>
				<nav className="navbar navbar-default">
					<div className="container-fluid">
						<NavigationStatelessElements />
						{navigationStateElement}
					</div>
				</nav>
			</div>
		);
	},
	onLoginStateChanged: function(){

		this.setState({
			isLoggedIn: getLoginState(),
		});

	}
});

module.exports = Menu;