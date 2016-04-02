var React = require('react');

var NavigationStore = require('../../../stores/NavigationStore');

var ListLinkElement = require('../../atoms/ListLinkElement.atom');

var links = [
	{
		id: 0,
		displayText: "Upload Game",
		destination: "/upload",
	},
	{
		id: 1,
		displayText: "Browse Games",
		destination: "/browse"
	}
];

var NavigationStatelessElements = React.createClass({
	getInitialState: function(){
		return {
			activeDestination: NavigationStore.getNavigationState().currentPath
		};
	},
	componentDidMount: function(){
		NavigationStore.addChangeListener(this.onNavigationStateChange);
	},
	componentWillUnmount: function(){
		NavigationStore.removeChangeListener(this.onNavigationStateChange);
	},
	render: function(){
		var component = this;
		var staticLinks = links.map(function(link) {
			var isActive = (link.destination == component.state.activeDestination);
      		return <ListLinkElement isActive={isActive} key={link.id} displayText={link.displayText} destination={link.destination}/>
    	});
		return(
			<div>
				<div className="navbar-header">
					<a className="navbar-brand" href="/">Magination</a>
				</div>
				<ul className="nav navbar-nav">
					{staticLinks}
				</ul>
			</div>
		);
	},
	onNavigationStateChange: function(){
		console.log(NavigationStore.getNavigationState().currentPath);
		this.setState({
			activeDestination: NavigationStore.getNavigationState().currentPath
		});
	}
});

module.exports = NavigationStatelessElements;