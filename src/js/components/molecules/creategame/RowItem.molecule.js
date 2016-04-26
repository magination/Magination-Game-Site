var React = require('react');
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;
var Glyphicon = require('react-bootstrap').Glyphicon;
var Input = require('react-bootstrap').Input;
var GameStore = require('../../../stores/GameStore');

var PrioritizableList = React.createClass({
	getInitialState () {
		return {
			text: this.props.value ? this.props.value : ''
		};
	},
	componentDidMount () {
		GameStore.addChangeListener(this.onGameStateChanged);
	},
	componentWillUnmount () {
		GameStore.removeChangeListener(this.onGameStateChanged);
	},
	render: function () {
		return (
			<div>
				<Row>
					<Col md={1}>
						<Row><Glyphicon glyph={this.props.hasUpButton ? 'glyphicon glyphicon-arrow-up' : ''} onClick={this.props.onUpClicked}/></Row>
						<Row><Glyphicon glyph={this.props.hasDownButton ? 'glyphicon glyphicon-arrow-down' : ''} onClick={this.props.onDownClicked}/></Row>
					</Col>
					<Col md={4}>
						<Input value={this.state.text} type='text' onChange={this.onListItemChanged} placeholder={this.props.placeholder}/>
					</Col>
					<Col md={1}>
						<Glyphicon glyph='glyphicon glyphicon-minus' onClick={this.props.onDeleteClicked}/>
					</Col>
				</Row>
			</div>
		);
	},
	onGameStateChanged: function () {
		if (!GameStore.getGame()) {
			this.setState({
				text: ''
			});
		}
		else {
			this.setState({
				text: GameStore.getGame().rules
			});
		}
	},
	onListItemChanged: function (e) {
		this.setState({
			text: e.target.value
		});
	}
});
module.exports = PrioritizableList;
