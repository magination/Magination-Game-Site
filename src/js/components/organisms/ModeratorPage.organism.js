var React = require('react');
var Tabs = require('react-bootstrap').Tabs;
var Tab = require('react-bootstrap').Tab;
var Col = require('react-bootstrap').Col;

var LoginStore = require('../../stores/LoginStore');
var LoginAction = require('../../actions/LoginAction');
var GameReportList = require('../molecules/report/GameReportList');
var ReviewReportList = require('../molecules/report/ReviewReportList');
var UserReportList = require('../molecules/report/UserReportList');
var Validator = require('../../service/Validator.service');

var ModeratorPage = React.createClass({
	getInitialState: function () {
		return {
			isModerator: LoginStore.getLoginState().isLoggedIn ? Validator.isModeratorPermission() : false
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
		if (!this.state.isModerator) {
			return (<h5>Unauthorized</h5>);
		}
		return (
			<div>
				<Col md={10} mdOffset={1}>
					<Tabs defaultActiveKey={1}>
						<Tab eventKey={1} title='Game reports' style={{padding: '10'}}>
							<GameReportList />
						</Tab>
						<Tab eventKey={2} title='Review reports' style={{padding: '10'}}>
							<ReviewReportList />
						</Tab>
						<Tab eventKey={3} title='User reports' style={{padding: '10'}}>
							<UserReportList />
						</Tab>
					</Tabs>
				</Col>
			</div>
		);
	},
	onLoginStateChanged: function () {
		this.setState({
			isModerator: LoginStore.getLoginState().isLoggedIn ? Validator.isModeratorPermission() : false
		});
	}
});
module.exports = ModeratorPage;
