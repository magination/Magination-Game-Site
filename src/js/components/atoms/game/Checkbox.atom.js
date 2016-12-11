import React, { Component, PropTypes } from 'react';
import GameStore from '../../../stores/GameStore';
import GameAction from '../../../actions/GameAction';

class Checkbox extends Component {
	constructor(props) {
		super(props);
		this.onGameStateChanged = this.onGameStateChanged.bind(this);

		this.state = {
			isChecked: GameStore.getGame() ? GameStore.getGame()[this.props.bindingProperty] : false
		}
	}

	componentDidMount() {
		GameStore.addChangeListener(this.onGameStateChanged);
	}

	componentWillUnmount() {
		GameStore.removeChangeListener(this.onGameStateChanged);
	}

	render() {
		return (
			<div>
				<input ref='checkbox' type='checkbox' onChange={this.onPropertyChanged} checked={this.props.isChecked} /> {this.props.description}
			</div>
		);
	}

	onPropertyChanged(e) {
		GameAction.updateCurrentGameLocally({
			propertyName: this.props.bindingProperty,
			propertyValue: e.target.checked
		});
	}

	onGameStateChanged() {
		this.setState({
			isChecked: GameStore.getGame() ? GameStore.getGame()[this.props.bindingProperty] : false
		});
	}
}

module.exports = Checkbox;
