var React = require('react');

var Collapse = require('react-bootstrap').Collapse;
var Button = require('react-bootstrap').Button;

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
					<div>
						<Button onClick={this.onDeleteClick}>X</Button>
					</div>
				</Collapse>
				<hr />
			</div>
		);
	},
	onClick: function () {
		var index = (this.props.isSelected) ? -1 : this.props.index;
		GameCreatorAction.setSelectedObjectIndex({
			index: index
		});
	},
	onDeleteClick: function () {
		if (this.props.isSelected) {
			GameCreatorAction.deleteCurrentSelectedPiece();
		}
	}
});

module.exports = PieceOverview;
