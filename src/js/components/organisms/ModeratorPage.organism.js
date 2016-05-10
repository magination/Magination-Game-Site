var React = require('react');
var Tabs = require('react-bootstrap').Tabs;
var Tab = require('react-bootstrap').Tab;
var Col = require('react-bootstrap').Col;

var LoginStore = require('../../stores/LoginStore');
var LoginAction = require('../../actions/LoginAction');
var Parser = require('../../service/Parser.service');
var GameReportList = require('../molecules/report/GameReportList');
var ReviewReportList = require('../molecules/report/ReviewReportList');
var UserReportList = require('../molecules/report/UserReportList');

var ModeratorPage = React.createClass({
	getInitialState: function () {
		return {
			isModerator: this.isModeratorPermission
		};
	},
	componentDidMount: function () {
		if (!LoginStore.getLoginState().isLoggedIn) {
			LoginAction.requestLogin();
		}
		LoginStore.addChangeListener(this.onLoginStateChanged);
	},
	render: function () {
		if (!this.state.isModerator) {
			return (<h5>Unauthorized</h5>);
		}
		var gamereports = [
			{
				id: 'ddd',
				reports: [
					{reportText: 'dicks in images'},
					{reportText: 'bad language'},
					{reportText: 'spammer'}
				]
			},
			{
				id: 'kjndfiuhj2342',
				reports: [
					{reportText: 'dicks in images'},
					{reportText: 'bad language'},
					{reportText: 'spammer'}
				]
			}
		];
		var reviewreports = [
			{
				id: 'ddd',
				reports: [
					{reportText: 'dicks in images'},
					{reportText: 'bad language'},
					{reportText: 'spammer'}
				]
			},
			{
				id: 'kjndfiuhj2342',
				reports: [
					{reportText: 'dicks in images'},
					{reportText: 'bad language'},
					{reportText: 'spammer'}
				]
			}
		];
		var userreports = [
			{
				id: 'ddd',
				reports: [
					{reportText: 'dicks in images'},
					{reportText: 'bad language'},
					{reportText: 'spammer'}
				]
			},
			{
				id: 'kjndfiuhj2342',
				reports: [
					{reportText: 'dicks in images'},
					{reportText: 'bad language'},
					{reportText: 'spammer'}
				]
			}
		];
		return (
			<div>
				<Col md={10} mdOffset={1}>
					<Tabs defaultActiveKey={1}>
						<Tab eventKey={1} title='Game reports' style={{padding: '10'}}>
							<GameReportList games={gamereports}/>
						</Tab>
						<Tab eventKey={2} title='Review reports' style={{padding: '10'}}>
							<ReviewReportList reviews={reviewreports}/>
						</Tab>
						<Tab eventKey={3} title='User reports' style={{padding: '10'}}>
							<UserReportList users={userreports}/>
						</Tab>
					</Tabs>
				</Col>
			</div>
		);
	},
	isModeratorPermission: function () {
		var token = LoginStore.getToken();
		if (!token) return false;
		var decodedToken = Parser.decodeJWT(token);
		return decodedToken && decodedToken.claims.privileges > 0;
	},
	onLoginStateChanged: function () {
		this.setState({
			isModerator: this.isModeratorPermission
		});
	}
});
module.exports = ModeratorPage;
