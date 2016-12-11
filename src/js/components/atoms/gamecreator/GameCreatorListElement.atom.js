import React, { Component, PropTypes } from 'react';
import Colors from '../../../styles/Colors';
import GameCreatorAction from '../../../actions/GameCreatorAction';

class GameCreatorListElement extends Component {
	constructor(props) {
		super(props);
		this.onMouseLeaveX = this.onMouseLeaveX.bind(this);
		this.onMouseEnterX = this.onMouseEnterX.bind(this);
		this.onMouseClickX = this.onMouseClickX.bind(this);
		this.onMouseEnterElement = this.onMouseEnterElement.bind(this);
		this.onMouseLeaveElement = this.onMouseLeaveElement.bind(this);
		this.onGameCreatorClicked = this.onGameCreatorClicked.bind(this);
		this.state = {
			xIsHovered: false,
			isHovered: false
		};
	}

	render() {
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
	}

	onMouseLeaveX() {
		this.setState({
			xIsHovered: false
		});
	}

	onMouseEnterX() {
		this.setState({
			xIsHovered: true
		});
	}

	onMouseClickX(e) {
		GameCreatorAction.deleteGameCreator({
			gameCreatorId: this.props.gameCreator._id
		});
		e.stopPropagation();
	}

	onMouseEnterElement() {
		this.setState({
			isHovered: true
		});
	}

	onMouseLeaveElement() {
		this.setState({
			isHovered: false
		});
	}

	onGameCreatorClicked() {
		GameCreatorAction.loadCreatorId({
			gameCreatorId: this.props.gameCreator._id
		});
	}
}

module.exports = GameCreatorListElement;
