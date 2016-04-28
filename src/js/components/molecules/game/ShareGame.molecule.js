var React = require('react');

var NavigationStore = require('../../../stores/NavigationStore');
var ShareGame = React.createClass({
	render: function () {
		return (
			<div className='fb-share-button' data-href={NavigationStore.getNavigationState().currentPath} data-layout='button' data-mobile-iframe='true'></div>
		);
	}
});

module.exports = ShareGame;
