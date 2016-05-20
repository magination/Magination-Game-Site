var React = require('react');
var GameStore = require('../../../stores/GameStore');
var GameAction = require('../../../actions/GameAction');

var Checkbox = React.createClass({
	getInitialState: function () {
		return {
			isChecked: GameStore.getGame() ? GameStore.getGame()[this.props.bindingProperty] : false
		};
	},
	componentDidMount: function () {
		GameStore.addChangeListener(this.onGameStateChanged);
	},
	componentWillUnmount: function () {
		GameStore.removeChangeListener(this.onGameStateChanged);
	},
	render: function () {
		return (
			<div>
				<input ref='checkbox' type='checkbox' onChange={this.onPropertyChanged} checked={this.props.isChecked} /> {this.props.description}
			</div>
		);
	},
	onPropertyChanged: function (e) {
		GameAction.updateCurrentGameLocally({
			propertyName: this.props.bindingProperty,
			propertyValue: e.target.checked
		});
	},
	onGameStateChanged: function () {
		this.setState({
			isChecked: GameStore.getGame() ? GameStore.getGame()[this.props.bindingProperty] : false
		});
	}
});
module.exports = Checkbox;
