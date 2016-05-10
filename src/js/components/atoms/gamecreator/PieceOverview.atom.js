var React = require('react');

var Collapse = require('react-bootstrap').Collapse;
var Button = require('react-bootstrap').Button;
var Color = require('../../../styles/Colors');
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
var innerCollapseDivStyle = {
	padding: '10px',
	paddingTop: '20px',
	paddingBottom: '0px'
};

var PieceOverview = React.createClass({
	render: function () {
		return (
			<div onClick={this.onClick} style={imgDivStyle}>
				<img src={this.props.piece.url} style={imgStyle}/>
				<div style={innerCollapseDivStyle}>
					<Collapse in={this.props.isSelected}>
						<div>
							<Button></Button>
						</div>
						<div>
							<Button style={{backgroundColor: Color.redLight, width: '100%'}} onClick={this.onDeleteClick}><strong style={{color: 'white'}}>Delete</strong></Button>
						</div>
					</Collapse>
				</div>
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
