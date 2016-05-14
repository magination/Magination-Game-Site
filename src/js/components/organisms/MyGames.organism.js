var React = require('react');
var Col = require('react-bootstrap').Col;
var Row = require('react-bootstrap').Row;
var Tabs = require('react-bootstrap').Tabs;
var Tab = require('react-bootstrap').Tab;
var MyGameList = require('../molecules/mygames/MyGamesList.molecule.js');
var LoginStore = require('../../stores/LoginStore');
var LoginAction = require('../../actions/LoginAction');

var MyGames = React.createClass({
	componentDidMount: function () {
		if (!LoginStore.getLoginState().isLoggedIn) {
			LoginAction.requestLogin();
		}
	},
	render: function () {
		return (
			<div>
				<Row>
					<Col md={8} mdOffset={2}>
						<Tabs defaultActiveKey={1}>
							<Tab eventKey={1} title='Published games'>
								<MyGameList isPublished={true} hasPublishButton={false}/>
							</Tab>
							<Tab eventKey={2} title='Unpublished games'>
								<MyGameList isPublished={false} hasEditButton={true} hasPublishButton={true}/>
							</Tab>
						</Tabs>
					</Col>
				</Row>
			</div>
		);
	}
});
module.exports = MyGames;
