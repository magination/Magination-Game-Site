var React = require('react');
var ListStyles = require('../../../styles/Lists');
var TextStyles = require('../../../styles/Text');
var List = React.createClass({
	render: function () {
		var ctr = 0;
		var listElements = this.props.listElements.map(function (element) {
			ctr++;
			return <li key={ctr}><h4>{element}</h4></li>;
		});
		return (
			<div>
				<h2 style={TextStyles.blueHeader}>{this.props.title}</h2>
				<ul style={ListStyles.Magination}>
					{listElements}
				</ul>
			</div>
		);
	}
});

module.exports = List;
