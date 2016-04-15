var React = require('react');

var LoginService = require('./LoginService');

var Input = require('react-bootstrap').Input;
var Button = require('react-bootstrap').Button;
var Col = require('react-bootstrap').Col;

var LoginForm = React.createClass({
	getInitialState: function () {
		return {
			username: '',
			password: ''
		};
	},
	componentDidMount: function () {
		this.refs.usernameEntry.refs.input.focus();
	},
	render: function () {
		return (
			<div>
				<Col md={4} mdOffset={4}>
					<form className='form-signin' onSubmit={this.onSubmitForm}>
						<h2 className='form-signin-heading'>Please sign in</h2>
						<Input ref='usernameEntry' value={this.state.username} type='text' label='Username / Email' placeholder='Username / Email' onChange={this.onUsernameChange}/>
						<Input value={this.state.password} type='password' label='Password' placeholder='Password' onChange={this.onPasswordChange}/>
						<Button type='submit'>Log in</Button>
					</form>
				</Col>
			</div>
		);
	},
	onUsernameChange: function (e) {
		this.setState({
			username: e.target.value
		});
	},
	onPasswordChange: function (e) {
		this.setState({
			password: e.target.value
		});
	},
	onSubmitForm: function (e) {
		e.preventDefault();
		LoginService.doLogin(this.state.username, this.state.password);
		this.setState({
			password: ''
		});
	}
});

module.exports = LoginForm;
