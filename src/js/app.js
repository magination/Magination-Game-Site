var React = require('react');
var ReactDOM = require('react-dom');

var reactApp = React.createClass({
	render: function(){
		return(
			<div>Hello World</div>
		);
	}
});

var mountNode = document.getElementById('react-container');

ReactDOM.render(React.createElement(reactApp), mountNode);