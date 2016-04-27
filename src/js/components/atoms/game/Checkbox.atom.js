var React = require('react');
var GameStore = require('../../../stores/GameStore');
var GameAction = require('../../../actions/GameAction');

var RatingIcon = React.createClass({
	getInitialState: function () {
		if (GameStore.getGame() !== null) {
			return {
				isChecked: GameStore.getGame()[this.props.bindingProperty]
			};
		}
		else {
			return {
				isChecked: false
			};
		}
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
		if (!GameStore.getGame()) {
			this.setState({
				isChecked: false
			});
		}
		else {
			this.setState({
				isChecked: GameStore.getGame()[this.props.bindingProperty]
			});
		}
	}
});
module.exports = RatingIcon;
