var React = require('react');

var Collapse = require('react-bootstrap').Collapse;

var GameCreatorAction = require('../../../actions/GameCreatorAction');

var imgStyle = {
	maxHeight: '100%',
	maxWidth: '100%',
	width: '50%',
	height: '50%'
};
var imgDivStyle = {
	textAlign: 'center'
};

var PieceOverview = React.createClass({
	render: function () {
		return (
			<div onClick={this.onClick} style={imgDivStyle}>
				<img src={this.props.piece.url} style={imgStyle}/>
				<Collapse in={this.props.isSelected}>
					<div>hello</div>
				</Collapse>
				<hr />
			</div>
		);
	},
	onClick: function () {
		GameCreatorAction.setSelectedObjectIndex({
			index: this.props.index
		});
	}
});

module.exports = PieceOverview;