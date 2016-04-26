var React = require('react');
var RowItem = require('./RowItem.molecule');
var Button = require('react-bootstrap').Button;
var ButtonStyle = require('../../../styles/Buttons');
var GameAction = require('../../../actions/GameAction');
var GameStore = require('../../../stores/GameStore');

var PrioritizableList = React.createClass({
	getInitialState: function () {
		return {
			items: []
		};
	},
	componentWillMount () {
		GameStore.addChangeListener(this.onGameStateChanged);
	},
	componentWillUnmount () {
		GameStore.removeChangeListener(this.onGameStateChanged);
	},
	render: function () {
		var rowItems = [];
		for (var i = 0; i < this.state.items.length; i++) {
			rowItems.push(
				<RowItem key={i}
						hasUpButton={i !== 0}
						hasDownButton={i !== this.state.items.length - 1}
						value={this.state.items[i]}
						propertyCollection={this.props.propertyCollection}
						bindableTextProperty={this.props.bindableTextProperty}
						onUpClicked={this.onUpClicked}
						onDownClicked={this.onDownClicked}
						onDeleteClicked={this.onDeleteClicked}
						placeholder={this.props.listItemPlaceholder}/>
			);
		}
		return (
			<div>
				{rowItems}
				<Button onClick={this.onAddItemClicked} type='button' style={ButtonStyle.Magination}>+ Add rule</Button>
			</div>
		);
	},
	onGameStateChanged: function () {
		this.setState({
			items: GameStore.getGame()[this.props.propertyCollection]
		});
	},
	onAddItemClicked: function () {
		GameAction.addNewRuleToLocalGame({
			isOptional: this.props.isAlternativeRules
		});
	},
	onDeleteClicked: function (pos) {
		GameAction.deleteRuleFromLocalGame({
			position: pos,
			isOptional: this.props.isAlternativeRules
		});
	},
	onUpClicked: function (currentPosition) {
		GameAction.changeRulePrioritizationLocally({
			currentPosition: currentPosition,
			isMovingUp: true
		});
	},
	onDownClicked: function (currentPosition) {
		GameAction.changeRulePrioritizationLocally({
			currentPosition: currentPosition,
			isMovingUp: false
		});
	}
});
module.exports = PrioritizableList;
