var React = require('react');
var Tabs = require('react-bootstrap').Tabs;
var Tab = require('react-bootstrap').Tab;
var Col = require('react-bootstrap').Col;

var LoginStore = require('../../stores/LoginStore');
var LoginAction = require('../../actions/LoginAction');
var FeaturedGames = require('../molecules/admin/FeaturedGames');

var Validator = require('../../service/Validator.service');

var AdminPage = React.createClass({
	getInitialState: function () {
		return {
			isAdmin: LoginStore.getLoginState().isLoggedIn ? Validator.isAdminPermission(LoginStore.getToken()) : false
		};
	},
	componentDidMount: function () {
		if (!LoginStore.getLoginState().isLoggedIn) {
			LoginAction.requestLogin();
		}
		LoginStore.addChangeListener(this.onLoginStateChanged);
	},
	componentWillUnmount: function () {
		LoginStore.removeChangeListener(this.onLoginStateChanged);
	},
	render: function () {
		if (!this.state.isAdmin) {
			return (<h5>Unauthorized</h5>);
		}
		return (
			<div>
				<Col md={10} mdOffset={1}>
					<Tabs defaultActiveKey={1}>
						<Tab eventKey={1} title='Featured games' style={{padding: '10'}}>
							<FeaturedGames />
						</Tab>
						<Tab eventKey={2} title='Moderators' style={{padding: '10'}}>
							Manage moderators
						</Tab>
					</Tabs>
				</Col>
			</div>
		);
	},
	onLoginStateChanged: function () {
		this.setState({
			isAdmin: LoginStore.getLoginState().isLoggedIn ? Validator.isAdminPermission(LoginStore.getToken()) : false
		});
	}
});
module.exports = AdminPage;
