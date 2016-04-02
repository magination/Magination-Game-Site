var React = require('react');

var ListLinkElement = require('../../atoms/ListLinkElement.atom');
var NavigationStore = require('../../../stores/NavigationStore');

var links = [
	{
		id: 0,
		displayText: "Login",
		destination: "/login"
	},
	{
		id: 1,
		displayText: "Register",
		destination: "/register"
	}
];

var NavigationLoginState = React.createClass({
	getInitialState: function(){
		return {
			activeDestination: NavigationStore.getNavigationState().currentPath
		};
	},
	componentDidMount: function() {
		NavigationStore.addChangeListener(this.onNavigationStateChange);
	},
	componentWillUnmount: function() {
		NavigationStore.removeChangeListener(this.onNavigationStateChange);
	},
	render: function(){
		var component = this;
		var notLoggedInLinks = links.map(function(link) {
			var isActive = (link.destination == component.state.activeDestination);
      		return <ListLinkElement isActive={isActive} key={link.id} displayText={link.displayText} destination={link.destination}/>
    	});
		return( 
			<ul className="nav navbar-nav navbar-right">
				{notLoggedInLinks}
			</ul>
		);
	},
	onNavigationStateChange: function() {
		this.setState({
			activeDestination: NavigationStore.getNavigationState().currentPath
		});
	}
});

module.exports = NavigationLoginState;