var React = require('react');
var Row = require('react-bootstrap').Row;
var Glyphicon = require('react-bootstrap').Glyphicon;
var Input = require('react-bootstrap').Input;
var GameAction = require('../../../actions/GameAction');
var TextStyle = require('../../../styles/Text');
var ContainerStyle = require('../../../styles/Containers');

var PrioritizableList = React.createClass({
	render: function () {
		return (
			<div>
				<div style={ContainerStyle.ruleList.leftIcon}>
					<Row><Glyphicon style={TextStyle.glyphIcon.alignCenterBlue} glyph={this.props.hasUpButton ? 'glyphicon glyphicon-arrow-up' : ''} onClick={this.onUpClicked}/></Row>
					<Row><Glyphicon style={TextStyle.glyphIcon.alignCenterBlue} glyph={this.props.hasDownButton ? 'glyphicon glyphicon-arrow-down' : ''} onClick={this.onDownClicked}/></Row>
				</div>
				<div style={ContainerStyle.ruleList.input}>
					<Input value={this.props.value} type='text' onInput={this.onListItemChanged} placeholder={this.props.placeholder}/>
				</div>
				<div style={ContainerStyle.ruleList.rightIcon}>
					<Glyphicon style={TextStyle.glyphIcon.alignCenterBlue} glyph='glyphicon glyphicon-remove' onClick={this.onDeleteClicked}/>
				</div>
			</div>
		);
	},
	onListItemChanged: function (e) {
		GameAction.updateRuleInLocalGame({
			isOptional: this.props.isAlternativeRule,
			rule: e.target.value,
			position: this.props.id
		});
	},
	onUpClicked: function () {
		GameAction.changeRulePrioritizationLocally({
			currentPosition: this.props.id,
			isMovingUp: true
		});
	},
	onDownClicked: function () {
		GameAction.changeRulePrioritizationLocally({
			currentPosition: this.props.id,
			isMovingUp: false
		});
	},
	onDeleteClicked: function () {
		GameAction.deleteRuleFromLocalGame({
			position: this.props.id,
			isOptional: this.props.isAlternativeRule
		});
	}
});
module.exports = PrioritizableList;
