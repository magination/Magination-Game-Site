var React = require('react');

var GameCreatorStore = require('../../../stores/GameCreatorStore');
var GameCreatorAction = require('../../../actions/GameCreatorAction');
var GameCreatorConstants = require('../../../constants/GameCreatorConstants');

var Input = require('react-bootstrap').Input;

var PencilSettingsOverlay = React.createClass({
	getInitialState: function () {
		return {
			pencilSizeValue: GameCreatorStore.getPencilOptions().size,
			pencilColorValue: GameCreatorStore.getPencilOptions().color
		};
	},
	componentDidMount: function () {
		GameCreatorStore.addChangeListener(this.onPencilOptionsChanged, GameCreatorConstants.PENCIL_OPTIONS_CHANGED);
	},
	componentWillUnmount: function () {
		GameCreatorStore.removeChangeListener(this.onPencilOptionsChanged, GameCreatorConstants.PENCIL_OPTIONS_CHANGED);
	},
	render: function () {
		return (
			<div>
				<form onSubmit={this.onPencilOptionsFinished}>
				<h4>Change the pencil size</h4>
				<Input type='number' value={this.state.pencilSizeValue} onChange={this.onPencilSizeChange}/>
				<p>{this.state.pencilColorValue}</p>
				</form>
			</div>
		);
	},
	onPencilOptionsChanged: function () {
		var options = GameCreatorStore.getPencilOptions();
		this.setState({
			pencilSizeValue: options.size,
			pencilColorValue: options.color
		});
	},
	onPencilOptionsFinished: function (e) {
		e.preventDefault();
		GameCreatorAction.setPencilOptions({
			size: this.state.pencilSizeValue,
			color: this.state.pencilColorValue
		});
	},
	onPencilSizeChange: function (e) {
		this.setState({
			pencilSizeValue: e.target.value
		});
	}
});

module.exports = PencilSettingsOverlay;
