var React = require('react');
var Row = require('react-bootstrap').Row;
var Glyphicon = require('react-bootstrap').Glyphicon;
var Input = require('react-bootstrap').Input;
var GameAction = require('../../../actions/GameAction');
var TextStyle = require('../../../styles/Text');
var ContainerStyle = require('../../../styles/Containers');
var AutoSave = require('../../../service/AutoSave.service.js');

var Rule = React.createClass({
	componentDidMount: function () {
		this.props.onAdded(this.refs.input);
	},
	render: function () {
		return (
			<div>
				<div style={ContainerStyle.ruleList.leftIcon}>
					<Row><Glyphicon style={TextStyle.glyphIcon.alignCenterBlue} glyph={this.props.hasUpButton ? 'glyphicon glyphicon-arrow-up' : ''} onClick={this.onUpClicked}/></Row>
					<Row><Glyphicon style={TextStyle.glyphIcon.alignCenterBlue} glyph={this.props.hasDownButton ? 'glyphicon glyphicon-arrow-down' : ''} onClick={this.onDownClicked}/></Row>
				</div>
				<div style={ContainerStyle.ruleList.rightIcon}>
					<Glyphicon style={TextStyle.glyphIcon.alignCenterBlue} glyph='glyphicon glyphicon-remove' onClick={this.onDeleteClicked}/>
				</div>
				<div style={ContainerStyle.ruleList.input}>
					<Input onBlur={AutoSave} ref='input' value={this.props.value} type='text' onChange={this.onListItemChanged} placeholder={this.props.placeholder}/>
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
		this.props.onMoveRule(this.props.id - 1);
		GameAction.changeRulePrioritizationLocally({
			currentPosition: this.props.id,
			isMovingUp: true,
			isOptional: this.props.isAlternativeRule
		});
	},
	onDownClicked: function () {
		this.props.onMoveRule(this.props.id + 1);
		GameAction.changeRulePrioritizationLocally({
			currentPosition: this.props.id,
			isMovingUp: false,
			isOptional: this.props.isAlternativeRule
		});
	},
	onDeleteClicked: function () {
		this.props.onDeleted();
		GameAction.deleteRuleFromLocalGame({
			position: this.props.id,
			isOptional: this.props.isAlternativeRule
		});
	}
});
module.exports = Rule;
