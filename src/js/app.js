var React = require('react');
var ReactDOM = require('react-dom');
var TestStore = require('./stores/TestStore');
var TestAction = require('./actions/TestAction');

var reactApp = React.createClass({
	getInitialState: function(){
		return {
			text: "a",
			updatedText: "b" 
		};
	},
	didClickButton: function(){
		console.log("button clieeek");
		TestAction.test(this.state.text);
	},
	handleTextChange: function(e) {
		this.setState({
			text: e.target.value
		});
	},
	componentDidMount: function(){
		TestStore.addChangeListener(this.testCallback);
	},
	componentWillUnmount: function(){
		TestStore.removeChangeListener(this.testCallback);
	},

	render: function(){
		return(
			<div><input type="text" onChange={this.handleTextChange} value={this.state.text}></input><p>{this.state.updatedText}</p><button onClick={this.didClickButton}>Do</button></div>
		);
	},
	testCallback: function(){
		console.log("testCalledback");
		this.setState({
			updatedText: TestStore.getFeedback()
		});
	}
});

var mountNode = document.getElementById('react-container');

ReactDOM.render(React.createElement(reactApp), mountNode);