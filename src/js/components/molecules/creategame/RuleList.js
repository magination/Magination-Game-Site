var React = require('react');
var Rule = require('./Rule');
var Button = require('react-bootstrap').Button;
var ButtonStyle = require('../../../styles/Buttons');
var GameAction = require('../../../actions/GameAction');
var GameStore = require('../../../stores/GameStore');

var RuleList = React.createClass({
	listElements: [],
	getInitialState: function () {
		return {
			rules: []
		};
	},
	componentWillUnmount: function () {
		GameStore.removeChangeListener(this.onGameStateChanged);
	},
	componentDidMount: function () {
		if (GameStore.getGame() !== null) {
			this.setState({
				rules: GameStore.getGame().rules
			});
		}
		GameStore.addChangeListener(this.onGameStateChanged);
	},
	render: function () {
		var list = [];
		for (var i = 0; i < this.state.rules.length; i++) {
			var position = i;
			list.push(
				<div key={i} ref='listContainer'>
					<Rule id={position} onAdded={this.onRuleAdded} onDeleted={this.onRuleDeleted} onMoveRule={this.onMoveRule} placeholder='Enter a rule' value={this.state.rules[i]} hasUpButton={i !== 0} hasDownButton={i !== this.state.rules.length - 1}/>
				</div>
			);
		}
		return (
			<div>
				{list}
				<Button onClick={this.onAddItemClicked} type='button' style={ButtonStyle.MaginationRule}>+ Add rule</Button>
			</div>
		);
	},
	onGameStateChanged: function () {
		this.setState({
			rules: GameStore.getGame().rules
		});
	},
	onAddItemClicked: function () {
		GameAction.addNewRuleToLocalGame({
			isOptional: false
		});
	},
	onMoveRule: function (newPos) {
		console.log(this.listElements[newPos]);
		this.listElements[newPos].refs.input.focus();
	},
	onRuleAdded: function (newRule) {
		this.listElements.push(newRule);
	},
	onRuleDeleted: function () {
		this.listElements.pop();
	}
});
module.exports = RuleList;
