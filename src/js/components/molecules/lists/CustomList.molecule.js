var React = require('react');
var ListStyles = require('../../../styles/Lists');
var TextStyles = require('../../../styles/Text');
var List = React.createClass({
	render: function () {
		console.log(ListStyles.Magination);
		var ctr = 0;
		var listElements = this.props.listElements.map(function (element) {
			ctr++;
			return <li key={ctr}>{element}</li>;
		});
		return (
			<div>
				<h3 style={TextStyles.listHeader}>{this.props.title}</h3>
				<ul style={ListStyles.Magination}>
					{listElements}
				</ul>
			</div>
		);
	}
});

module.exports = List;
