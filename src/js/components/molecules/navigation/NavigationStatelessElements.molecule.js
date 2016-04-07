var React = require('react');

var NavigationStore = require('../../../stores/NavigationStore');

var ListLinkElement = require('../../atoms/ListLinkElement.atom');

var NavigationStatelessElements = React.createClass({
	getInitialState: function () {
		return {
			staticlinks: [
				{
					id: 0,
					displayText: 'Upload Game',
					destination: '/upload'
				},
				{
					id: 1,
					displayText: 'Browse Games',
					destination: '/browse'
				}
			],
			activeDestination: NavigationStore.getNavigationState().currentPath
		};
	},
	componentDidMount: function () {
		NavigationStore.addChangeListener(this.onNavigationStateChange);
	},
	componentWillUnmount: function () {
		NavigationStore.removeChangeListener(this.onNavigationStateChange);
	},
	render: function () {
		/* Checking if either of the element should render as active */
		var component = this;
		var staticLinks = this.state.staticlinks.map(function (link) {
			var isActive = (link.destination === component.state.activeDestination);
			return <ListLinkElement isActive={isActive} key={link.id} displayText={link.displayText} destination={link.destination}/>;
		});
		var imgStyle = {
			'maxWidth': '100%',
			'maxHeight': '100%'
		};
		return (
			<div>
				<div className='navbar-header'>
					<a className='navbar-brand' href='/'><img style={imgStyle} src='public/magination-logo.png' /></a>
				</div>
				<ul className='nav navbar-nav'>
					{staticLinks}
				</ul>
			</div>
		);
	},
	onNavigationStateChange: function () {
		this.setState({
			activeDestination: NavigationStore.getNavigationState().currentPath
		});
	}
});

module.exports = NavigationStatelessElements;
