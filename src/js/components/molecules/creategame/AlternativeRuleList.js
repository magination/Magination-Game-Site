var React = require('react');
var Rule = require('./Rule');
var Button = require('react-bootstrap').Button;
var ButtonStyle = require('../../../styles/Buttons');
var GameAction = require('../../../actions/GameAction');
var GameStore = require('../../../stores/GameStore');

var RuleList = React.createClass({
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
				rules: GameStore.getGame().alternativeRules
			});
		}
		GameStore.addChangeListener(this.onGameStateChanged);
	},
	render: function () {
		var rowItems = [];
		for (var i = 0; i < this.state.rules.length; i++) {
			var position = i;
			rowItems.push(
				<div key={i}>
					<Rule id={position} isAlternativeRule={true} placeholder='Enter a rule' value={this.state.rules[i]} hasUpButton={i !== 0} hasDownButton={i !== this.state.rules.length - 1}/>
				</div>
			);
		}
		return (
			<div>
				{rowItems}
				<Button onClick={this.onAddItemClicked} type='button' style={ButtonStyle.MaginationRule}>+ Add rule</Button>
			</div>
		);
	},
	onGameStateChanged: function () {
		this.setState({
			rules: GameStore.getGame().alternativeRules
		});
	},
	onAddItemClicked: function () {
		GameAction.addNewRuleToLocalGame({
			isOptional: true
		});
	}
});
module.exports = RuleList;
