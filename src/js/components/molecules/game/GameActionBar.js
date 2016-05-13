var React = require('react');
var ButtonWithTooltip = require('../../atoms/ButtonWithTooltip');
var Report = require('../report/Report.molecule');
var Col = require('react-bootstrap').Col;
var Collapse = require('react-bootstrap').Collapse;
var LoginStore = require('../../../stores/LoginStore');
var GameAction = require('../../../actions/GameAction');
var LoginAction = require('../../../actions/LoginAction');
var NavigationAction = require('../../../actions/NavigationAction');
var NavigationConstants = require('../../../constants/NavigationConstants');
var URLS = require('../../../config/config').urls;

var GameActionBar = React.createClass({
	getInitialState: function () {
		return {
			shareGameIsShowing: false,
			showReport: false
		};
	},
	render: function () {
		return (
			<div>
				<Col md={4} style={{margin: '0', paddingLeft: 0, paddingRight: 4}}>
					<ButtonWithTooltip onClick={this.onReportClicked} style={{width: '100%', margin: 0}} tooltip='Click to report the game if you feel it violates our terms of service.' buttonText='Report' glyph='flag'/>
				</Col>
				<Col md={4} style={{margin: '0', paddingLeft: 2, paddingRight: 2}}>
					<ButtonWithTooltip onClick={this.onShareGamesClicked} style={{width: '100%', margin: 0}} tooltip='Click to share this game on social media.' buttonText='Share' glyph='share'/>
				</Col>
				<Col md={4} style={{margin: '0', paddingLeft: 4, paddingRight: 0}}>
					<ButtonWithTooltip onClick={this.onForkClicked} style={{width: '100%', margin: 0}} tooltip='Click to create your own variaton of this game.' buttonText='Fork' glyph='edit'/>
				</Col>
				<Col md={12}>
					<Collapse in={this.state.shareGameIsShowing}>
						<div style={{border: '1px solid #000000'}}>
							<h5 style={{textAlign: 'center'}}>Share game comes here</h5>
						</div>
					</Collapse>
					<Report reportType='games' objectId={this.props.gameId} show={this.state.showReport} close={this.onReportHide}/>
				</Col>
			</div>
		);
	},
	onShareGamesClicked: function () {
		this.setState({
			shareGameIsShowing: !this.state.shareGameIsShowing
		});
	},
	onReportClicked: function () {
		this.setState({
			showReport: true
		});
	},
	onReportHide: function () {
		this.setState({
			showReport: false
		});
	},
	onForkClicked: function () {
		if (!LoginStore.getLoginState().isLoggedIn) {
			LoginAction.requestLogin();
			return;
		}
		$.ajax({
			type: 'POST',
			url: URLS.api.games + '/' + this.props.gameId + '/fork',
			contentType: 'application/json',
			dataType: 'json',
			headers: {
				'Authorization': LoginStore.getToken()
			},
			statusCode: {
				200: this.onGetGameForkSuccessResponse
			}
		});
	},
	onGetGameForkSuccessResponse: function (data) {
		GameAction.changeGameLocally(data);
		NavigationAction.navigate({
			destination: NavigationConstants.PATHS.creategame
		});
	}
});

module.exports = GameActionBar;
