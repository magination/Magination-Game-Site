var React = require('react');

var Colors = require('../../../styles/Colors');

var GameCreatorAction = require('../../../actions/GameCreatorAction');

var GameCreatorListElement = React.createClass({
	getInitialState: function () {
		return {
			xIsHovered: false,
			isHovered: false
		};
	},
	render: function () {
		var name = this.props.gameCreator.title;
		if (!name) {
			name = 'No Title';
		}
		var listElementStyle = {
			color: Colors.blue,
			textAlign: 'center',
			padding: '5px',
			borderRadius: '5',
			cursor: 'pointer',
			position: 'relative'
		};
		if (this.props.currentSelected === this.props.gameCreator._id) {
			listElementStyle['backgroundColor'] = Colors.blueLight;
			listElementStyle['color'] = 'white';
		}
		else if (this.state.isHovered) {
			listElementStyle['backgroundColor'] = Colors.blueTransparent;
		}
		var xStyle = {
			position: 'absolute',
			top: '5px',
			right: '5px',
			paddingRight: '5px',
			paddingLeft: '5px',
			borderRadius: '5'
		};
		if (this.state.xIsHovered) {
			xStyle.backgroundColor = Colors.red;
			xStyle.color = 'white';
		}
		return (
			<div key={this.props.gameCreator._id}>
				<div style={listElementStyle} onMouseLeave={this.onMouseLeaveElement} onMouseEnter={this.onMouseEnterElement} onClick={this.onGameCreatorClicked}>
					<div style={{paddingRight: '10px', paddingLeft: '10px'}}>{name}</div>
					<div onMouseEnter={this.onMouseEnterX} onMouseLeave={this.onMouseLeaveX} onClick={this.onMouseClickX} style={xStyle}>&times;</div>
				</div>
				<hr style={{padding: '0', margin: '0'}}/>
			</div>
		);
	},
	onMouseLeaveX: function () {
		this.setState({
			xIsHovered: false
		});
	},
	onMouseEnterX: function () {
		this.setState({
			xIsHovered: true
		});
	},
	onMouseClickX: function (e) {
		GameCreatorAction.deleteGameCreator({
			gameCreatorId: this.props.gameCreator._id
		});
		e.stopPropagation();
	},
	onMouseEnterElement: function () {
		this.setState({
			isHovered: true
		});
	},
	onMouseLeaveElement: function () {
		this.setState({
			isHovered: false
		});
	},
	onGameCreatorClicked: function () {
		GameCreatorAction.loadCreatorId({
			gameCreatorId: this.props.gameCreator._id
		});
	}
});

module.exports = GameCreatorListElement;
