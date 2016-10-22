var React = require('react');
var Hr = {
	color: 'black'
}

var FooterContainer = {
	'position': 'absolute',
	'margin': '10px 0',
	'left': 0,
	'right': 0,
	'width': '100%',
	'textAlign': 'center'
}

var Footer = React.createClass({
	render: function () {
		return (
			<div style={FooterContainer}>
				<hr style={Hr} />
				Get in touch on
				<a href="http://www.facebook.com/maginationgame" target="_blank">
					&nbsp;Facebook
				</a>
				,
				<a href="http://www.twitter.com/maginationgame" target="_blank">
					&nbsp;Twitter
				</a>
				&nbsp;or by
				<a href="mailto:contact@maginationgame.com" target="_blank">
					&nbsp;Mail
				</a>
				<br />
				<p>Copyright © 2016 Magination. All Rights Reserved.</p>
			</div>
		);
	}
});

module.exports = Footer;
