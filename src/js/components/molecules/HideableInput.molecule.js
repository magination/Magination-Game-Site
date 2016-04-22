var React = require('react');
var Input = require('react-bootstrap').Input;
var GameAction = require('../../actions/GameAction');
var GameStore = require('../../stores/GameStore');
var Checkbox = require('../atoms/game/Checkbox.atom');

var ImageNumberPair = React.createClass({
	getInitialState () {
		if (GameStore.getGame()) {
			return {
				bindableBooleanProperty: GameStore.getGame()[this.props.bindableBooleanProperty],
				bindableTextProperty: GameStore.getGame()[this.props.bindableTextProperty]
			};
		}
		else {
			return {
				bindableBooleanProperty: false,
				bindableTextProperty: ''
			};
		}
	},
	componentDidMount () {
		GameStore.addChangeListener(this.onGameStateChanged);
	},
	componentWillUnmount () {
		GameStore.removeChangeListener(this.onGameStateChanged);
	},
	render: function () {
		return (
			<div>
				<Checkbox checked={this.state.bindableBooleanProperty} description={this.props.description} bindingProperty={this.props.bindableBooleanProperty}/>
				<Input onChange={this.onTextChanged} value={this.state.bindableTextProperty} type='textarea' placeholder={this.props.placeholder} disabled={!this.state.bindableBooleanProperty}/>
			</div>
		);
	},
	onTextChanged: function (e) {
		GameAction.updateCurrentGameLocally({
			propertyName: this.props.bindableTextProperty,
			propertyValue: e.target.value
		});
	},
	onGameStateChanged: function () {
		if (!GameStore.getGame()) {
			this.setState({
				bindableBooleanProperty: false,
				bindableTextProperty: ''
			});
		}
		else {
			this.setState({
				bindableBooleanProperty: GameStore.getGame()[this.props.bindableBooleanProperty],
				bindableTextProperty: GameStore.getGame()[this.props.bindableTextProperty]
			});
		}
	}
});
module.exports = ImageNumberPair;
