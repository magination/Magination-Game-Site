var React = require('react');

var Color = require('../../../styles/Colors');
var Glyphicon = require('react-bootstrap').Glyphicon;
var OverlayTrigger = require('react-bootstrap').OverlayTrigger;
var Col = require('react-bootstrap').Col;

var LeftButton = {
	marginTop: '20px',
	height: '80px',
	textAlign: 'center',
	border: ('1px solid ' + Color.blue),
	backgroundColor: 'white',
	borderRadius: '5'
};
var toggledLeftButton = {
	marginTop: '20px',
	height: '80px',
	textAlign: 'center',
	border: ('1px solid ' + Color.blue),
	backgroundColor: Color.blue,
	borderRadius: '5'
};
var LeftGlyphiconStyle = {
	marginTop: '20px',
	fontSize: '40px',
	color: Color.blue
};
var toggledLeftGlyphiconStyle = {
	marginTop: '20px',
	fontSize: '40px',
	color: 'white'
};
var LeftCogStyle = {
	fontSize: '20px',
	color: Color.blue
};
var toggledLeftCogStyle = {
	fontSize: '20px',
	color: 'white'
};
var cogLeftDivStyle = {
	position: 'absolute',
	right: '5px',
	top: '5px'
};

var CustomGameCreatorElement = React.createClass({
	propTypes: {
		glyph: React.PropTypes.any
	},
	render: function () {
		var settings = <div></div>;
		if (this.props.settingsComponent) {
			settings = (<div style={cogLeftDivStyle}><OverlayTrigger trigger='click' rootClose placement='right' overlay={this.props.settingsComponent}><p onClick={this.onSettingsClicked}><Glyphicon style={(this.props.isToggled) ? toggledLeftCogStyle : LeftCogStyle} glyph='cog'/></p></OverlayTrigger></div>);
		}
		return (
			<div>
				<Col md={12} style={(this.props.isToggled) ? toggledLeftButton : LeftButton}>
					<Glyphicon style={(this.props.isToggled) ? toggledLeftGlyphiconStyle : LeftGlyphiconStyle} glyph='pencil'/>
					{settings}
				</Col>
			</div>
		);
	},
	onSettingsClicked: function (e) {
		e.stopPropagation();
	}
});

module.exports = CustomGameCreatorElement;
