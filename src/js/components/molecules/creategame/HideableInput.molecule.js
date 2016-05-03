var React = require('react');
var Input = require('react-bootstrap').Input;
var GameAction = require('../../../actions/GameAction');
var GameStore = require('../../../stores/GameStore');

var ImageNumberPair = React.createClass({
	getInitialState () {
		if (GameStore.getGame()) {
			return {
				isShowInput: GameStore.getGame()[this.props.bindableTextProperty],
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
				<input ref='checkbox' type='checkbox' onChange={this.onVisibilityChanged} checked={this.props.checked} /> {this.props.description}
				{this.state.isShowInput ? <Input onChange={this.onTextChanged} value={this.state.bindableTextProperty} type='textarea' placeholder={this.props.placeholder} /> : null}
			</div>
		);
	},
	onVisibilityChanged: function (e) {
		this.refs.checkbox.checked = e.target.checked;
		this.setState({
			isShowInput: e.target.checked
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
