var React = require('react');
var Col = require('react-bootstrap').Col;
var Tabs = require('react-bootstrap').Tabs;
var Tab = require('react-bootstrap').Tab;

var MyGames = React.createClass({
	render: function () {
		return (
			<div>
                <Col md={8} md-offset={2}>
                    <Tabs defaultActiveKey={2} id='uncontrolled-tab-example'>
                        <Tab eventKey={1} title='Published games'>
                            Tab 1 content
                        </Tab>
                        <Tab eventKey={2} title='Unpublished games'>
                            Tab 2 content
                        </Tab>
                    </Tabs>
                </Col>
			</div>
		);
	}
});
module.exports = MyGames;
