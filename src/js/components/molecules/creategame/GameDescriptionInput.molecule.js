var React = require('react');
var Input = require('react-bootstrap').Input;
var GameAction = require('../../../actions/GameAction');
var GameStore = require('../../../stores/GameStore');
var TextStyle = require('../../../styles/Text');

var GameDescription = React.createClass({
	getInitialState () {
		if (GameStore.getGame()) {
			return {
				bindableTextProperty: GameStore.getGame()[this.props.bindableTextProperty],
				lengthString: GameStore.getGame()[this.props.bindableTextProperty] ? GameStore.getGame()[this.props.bindableTextProperty].length + '/' + this.props.maxLength : 0 + '/' + this.props.maxLength
			};
		}
		else {
			return {
				bindableTextProperty: '',
				lengthString: 0 + '/' + this.props.maxLength
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
				<h5>Describe your game briefly.</h5>
				<Input onChange={this.onTextChanged} value={this.state.bindableTextProperty} ref='descriptionInput' type='textarea' placeholder={this.props.placeholder} />
				<h5 style={TextStyle.alignRight}>{this.state.lengthString} characters</h5>
			</div>
		);
	},
	onTextChanged: function (e) {
		if (e.target.value.length > this.props.maxLength) return;
		GameAction.updateCurrentGameLocally({
			propertyName: this.props.bindableTextProperty,
			propertyValue: e.target.value
		});
	},
	onGameStateChanged: function () {
		if (!GameStore.getGame()) {
			this.setState({
				bindableTextProperty: ''
			});
		}
		else {
			this.setState({
				bindableTextProperty: GameStore.getGame()[this.props.bindableTextProperty]
			});
		}
	},
	focusInput: function () {
		this.refs.descriptionInput.refs.input.focus();
	}
});
module.exports = GameDescription;
