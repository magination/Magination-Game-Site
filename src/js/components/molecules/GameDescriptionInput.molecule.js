var React = require('react');
var Input = require('react-bootstrap').Input;
var GameAction = require('../../actions/GameAction');
var GameStore = require('../../stores/GameStore');

var ImageNumberPair = React.createClass({
	getInitialState () {
		if (GameStore.getGame()) {
			return {
				bindableBooleanProperty: GameStore.getGame()[this.props.bindableBooleanProperty],
				bindableTextProperty: GameStore.getGame()[this.props.bindableTextProperty],
				lengthString: GameStore.getGame()[this.props.bindableTextProperty].length + '/' + this.props.maxLength
			};
		}
		else {
			return {
				bindableBooleanProperty: false,
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
				<h5>Short text from us</h5>
				<Input onChange={this.onTextChanged} value={this.state.bindableTextProperty} type='textarea' placeholder={this.props.placeholder} />
				<h5>{this.state.lengthString} characters</h5>
			</div>
		);
	},
	onTextChanged: function (e) {
		if (e.target.value.length > this.props.maxLength) return;
		this.setState({
			lengthString: e.target.value.length + '/' + this.props.maxLength
		});
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
