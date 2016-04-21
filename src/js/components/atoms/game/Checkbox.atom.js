var React = require('react');
var GameStore = require('../../../stores/GameStore');
var GameAction = require('../../../actions/GameAction');

var RatingIcon = React.createClass({
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
			</div>
		);
	},
	onPropertyChanged: function (e) {
		this.refs.checkbox.checked = e.target.checked;
		GameAction.updateCurrentGameLocally({
			propertyName: this.props.bindingProperty,
			propertyValue: e.target.checked
		});
	},
	onGameStateChanged: function (e) {
		if (!GameStore.getGame()) {
			this.setState({
				value: false
			});
		}
		else {
			this.setState({
				value: GameStore.getGame()[this.props.bindingProperty]
			});
		}
	}
});
module.exports = RatingIcon;
