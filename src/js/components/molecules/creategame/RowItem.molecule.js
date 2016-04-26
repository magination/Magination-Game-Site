var React = require('react');
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;
var Glyphicon = require('react-bootstrap').Glyphicon;
var Input = require('react-bootstrap').Input;
var GameAction = require('../../../actions/GameAction');

var PrioritizableList = React.createClass({
	render: function () {
		return (
			<div>
				<Row>
					<Col md={1}>
						<Row><Glyphicon glyph={this.props.hasUpButton ? 'glyphicon glyphicon-arrow-up' : ''} onClick={this.props.onUpClicked(this.props.key)}/></Row>
						<Row><Glyphicon glyph={this.props.hasDownButton ? 'glyphicon glyphicon-arrow-down' : ''} onClick={this.props.onDownClicked(this.props.key)}/></Row>
					</Col>
					<Col md={4} sd={2}>
						<Input defaultValue={this.props.value} type='text' onInput={this.onListItemChanged} placeholder={this.props.placeholder}/>
					</Col>
					<Col md={1}>
						<Glyphicon glyph='glyphicon glyphicon-minus' onClick={this.props.onDeleteClicked(this.props.key)}/>
					</Col>
				</Row>
			</div>
		);
	},
	onListItemChanged: function (e) {
		GameAction.updateCurrentGameLocally({
			propertyName: this.props.bindableTextProperty,
			propertyCollection: this.props.propertyCollection,
			propertyValue: e.target.value
		});
	}
});
module.exports = PrioritizableList;
