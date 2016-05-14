var React = require('react');
var Col = require('react-bootstrap').Col;
var Input = require('react-bootstrap').Input;

var GameAction = require('../../../actions/GameAction');
var GameStore = require('../../../stores/GameStore');
var TextStyle = require('../../../styles/Text');
var AutoSave = require('../../../service/AutoSave.service.js');

var GameDescription = React.createClass({
	getInitialState () {
		if (GameStore.getGame()) {
			return {
				bindableTextProperty: GameStore.getGame()[this.props.bindableTextProperty],
				lengthString: GameStore.getGame()[this.props.bindableTextProperty] ? GameStore.getGame()[this.props.bindableTextProperty].length + '/' + this.props.maxLength : 0 + '/' + this.props.maxLength
			};
		}
		else {
			return {
				bindableTextProperty: '',
				lengthString: 0 + '/' + this.props.maxLength
			};
		}
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
				<h5>Describe your game briefly.</h5>
				<div>
					<Col md={8}>
						<Input onChange={this.onTextChanged} bsStyle={this.props.bsStyle} onBlur={AutoSave} value={this.state.bindableTextProperty} ref='descriptionInput' type='textarea' placeholder={this.props.placeholder} />
					</Col>
					<Col md={4} style={{padding: 0}}><h5 style={this.props.bsStyle === 'error' ? TextStyle.CreateGame.error : TextStyle.CreateGame.success}>{this.getInputFeedback()}</h5></Col>
				</div>
				<Col md={8} style={{padding: 0}}><h5 style={TextStyle.alignRight}>{this.state.lengthString} characters</h5></Col>
			</div>
		);
	},
	onTextChanged: function (e) {
		if (e.target.value.length > this.props.maxLength) return;
		GameAction.updateCurrentGameLocally({
			propertyName: this.props.bindableTextProperty,
			propertyValue: e.target.value
		});
	},
	onGameStateChanged: function () {
		if (!GameStore.getGame()) {
			this.setState({
				bindableTextProperty: ''
			});
		}
		else {
			this.setState({
				bindableTextProperty: GameStore.getGame()[this.props.bindableTextProperty],
				lengthString: GameStore.getGame()[this.props.bindableTextProperty].length + '/' + this.props.maxLength
			});
		}
	},
	focusInput: function () {
		this.refs.descriptionInput.refs.input.focus();
	},
	getInputFeedback: function () {
		if (!this.props.bsStyle) return '';
		if (this.props.bsStyle !== 'success') return 'Game must have a description';
		return '';
	}
});
module.exports = GameDescription;
