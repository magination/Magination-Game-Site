var React = require('react');
var URLS = require('../../config/config').urls;
var LoginStore = require('../../stores/LoginStore');
var NavigationStore = require('../../stores/NavigationStore');
var Input = require('react-bootstrap').Input;

var EditableField = React.createClass({
	getInitialState: function () {
		return {
			isEditing: false,
			displayValue: this.props.displayValue,
			editValue: this.props.displayValue
		};
	},
	componentWillReceiveProps: function (nextProps) {
		this.setState({
			displayValue: nextProps.displayValue,
			editValue: nextProps.displayValue
		});
	},
	render: function () {
		var editButton = (isThisUser(this.props.owner) ? <div><a href='#' onClick={this.onEditButtonClicked}><i>Edit</i></a></div> : '');
		var valueComponent = (this.state.isEditing ? <form onSubmit={this.onFieldEditSubmit}><Input type='text' value={this.state.editValue} onChange={this.onEditValueChanged}/></form> : this.state.displayValue);
		return (
			<div>
				{valueComponent}
				{editButton}
			</div>
		);
	},
	onEditButtonClicked: function () {
		this.setState({
			isEditing: !this.state.isEditing
		});
	},
	onFieldEditSubmit: function (e) {
		e.preventDefault();
		var sendData = {};
		sendData[this.props.dataVariableName] = this.state.editValue;
		$.ajax({
			type: 'PUT',
			url: URLS.api.games + '/' + getLastUrlId(),
			contentType: 'application/json',
			dataType: 'json',
			headers: {
				'Authorization': LoginStore.getToken()
			},
			data: JSON.stringify(sendData),
			statusCode: {
				200: this.props.onSuccessCallback,
				500: function () {
					alert('Server Error: see console');
				}
			}
		});
		this.setState({
			isEditing: false
		});
	},
	onEditValueChanged: function (e) {
		this.setState({
			editValue: e.target.value
		});
	}
});

function getLastUrlId () {
	var url = NavigationStore.getNavigationState().currentPath;
	/* returns the id(last element) from the current link*/
	return url.split('/').slice(-1)[0];
}

function isThisUser (userId) {
	if (LoginStore.getLoginProfile() === null) {
		return false;
	}
	if (LoginStore.getLoginProfile()._id === userId) {
		return true;
	}
	return false;
}

module.exports = EditableField;
