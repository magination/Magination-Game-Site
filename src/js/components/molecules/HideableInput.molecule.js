var React = require('react');
var Input = require('react-bootstrap').Input;
var GameAction = require('../../actions/GameAction');
var GameStore = require('../../stores/GameStore');

var ImageNumberPair = React.createClass({
	getInitialState () {
		if (GameStore.getGame()) {
			return {
				isInputEnabled: GameStore.getGame()[this.props.bindableTextProperty],
				bindableTextProperty: GameStore.getGame()[this.props.bindableTextProperty]
			};
		}
		else {
			return {
				isInputEnabled: false,
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
				<input ref='checkbox' type='checkbox' onChange={this.onPropertyChanged} checked={this.props.checked} /> {this.props.description}
				<Input onChange={this.onTextChanged} value={this.state.bindableTextProperty} type='textarea' placeholder={this.props.placeholder} disabled={!this.state.bindableBooleanProperty}/>
			</div>
		);
	},
	onPropertyChanged: function (e) {
		this.refs.checkbox.checked = e.target.checked;
		this.setState({
			isInputEnabled: e.target.checked
		});
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
