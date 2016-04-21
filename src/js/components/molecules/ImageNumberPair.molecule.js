var React = require('react');
var Input = require('react-bootstrap').Input;
var EditGameAction = require('../../actions/GameAction');
var ValidatorService = require('../../service/Validator.service');
var GameStore = require('../../stores/GameStore');

var ImageNumberPair = React.createClass({
	getInitialState () {
		return {
			value: this.props.value
		};
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
			<Input value={this.state.value} type='number' placeholder={this.props.placeholder} onChange={this.valueChanged} addonBefore={<img width={40} height={20} src={this.props.src}/>}>
			</Input>
		</div>
		);
	},

	valueChanged: function (e) {
		var newValue = e.target.value;
		if (!ValidatorService.isNumericAndNotNegative(newValue)) {
			newValue = 0;
		}
		this.setState({
			value: newValue
		});
		EditGameAction.updateCurrentGameLocally({
			propertyName: this.props.bindingProperty,
			propertyValue: newValue
		});
	},
	onGameStateChanged: function () {
		if (!GameStore.getGame()) {
			this.setState({
				value: 0
			});
		}
		else {
			this.setState({
				value: GameStore.getGame()[this.props.bindingProperty]
			});
		}
	}
});
module.exports = ImageNumberPair;
