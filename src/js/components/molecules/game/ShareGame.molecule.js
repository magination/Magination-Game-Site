var React = require('react');

var NavigationStore = require('../../../stores/NavigationStore');
var config = require('../../../config/config');

var socialWrapDivStyle = {
	width: '100%',
	textAlign: 'center',
	color: 'white',
	padding: '5px',
	paddingTop: '10px',
	border: '1px solid transparent',
	borderRadius: '4px'
};
var facebookButtonStyle = {
	fontSize: '14px',
	width: '65%',
	padding: '5px',
	borderColor: '#2D5073',
	borderRadius: '4px',
	backgroundColor: '#3B5998',
	backgroundImage: 'url(http:///icons/iconarchive.com/icons/danleech/simple/512/facebook-icon.png)'
};

var ShareGame = React.createClass({
	componentDidMount: function () {
		window.fbAsyncInit = function () {
			FB.init({// eslint-disable-line no-undef
				appId: '288671844806887',
				xfbml: true,
				version: 'v2.6'
			});
		};
		(function (d, s, id) {
			var fjs;
			var js = fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) { return; }
			js = d.createElement(s); js.id = id;
			js.src = '//connect.facebook.net/en_US/sdk.js';
			fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));
	},
	render: function () {
		return (
			<div style={socialWrapDivStyle}><button style={facebookButtonStyle} onClick={this.onShareFBClick}>Share on facebook</button></div>
		);
	},
	onShareFBClick: function () {
		FB.ui({ // eslint-disable-line no-undef
			method: 'share_open_graph',
			action_type: 'og.shares',
			action_properties: JSON.stringify({
				object: {
					'og:url': config.urls.frontend.root + NavigationStore.getNavigationState().currentPath,
					'og:title': this.props.game.title,
					'og:description': this.props.game.shortDescription,
					'og:image': this.props.game.images[0]
				}
			})
		});
	}
});

module.exports = ShareGame;
