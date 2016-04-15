var React = require('react');
var LoginStore = require('../../stores/LoginStore');

var Input = require('react-bootstrap').Input;
var Button = require('react-bootstrap').Button;
var Col = require('react-bootstrap').Col;

var Settings = React.createClass({
	getInitialState: function () {
		if (!LoginStore.getLoginProfile()) {
			return {
				email: ''
			};
		}
		else {
			return {
				email: LoginStore.getLoginProfile().email
			};
		}
	},
	componentWillMount: function () {
		if (!LoginStore.getLoginProfile()) {
			this.setState({
				email: ''
			});
		}
		else {
			this.setState({
				email: LoginStore.getLoginProfile().email
			});
		}
	},
	render: function () {
		return (
			<div>
				<Col md={4} mdOffset={4}>
					<form className='form-settings' onSubmit={this.updateUser}>
						<h2 className='form-settings-heading'>Settings</h2>
						<Input ref='emailInput' value={this.state.email} type='text' label='Change email' placeholder='Enter new email' onChange={this.onEmailChanged}/>
						<Button type='submit'>Submit changes</Button>
					</form>
				</Col>
			</div>
		);
	},
	onEmailChanged: function (e) {
		this.setState({
			email: e.target.value
		});
	},
	updateUser: function (user) {
		$.ajax({
			type: 'PUT',
			url: URLS.api.games + '/' + this.state.game._id + '/ratings',
			data: JSON.stringify({
				rating: rating
			}),
			headers: {
				'Authorization': LoginStore.getToken()
			},
			contentType: 'application/json',
			dataType: 'json',
			success: this.didRate
		});
	}
});

module.exports = Settings;
