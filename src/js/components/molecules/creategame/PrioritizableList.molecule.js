var React = require('react');
var RowItem = require('./RowItem.molecule');
var Button = require('react-bootstrap').Button;
var ButtonStyle = require('../../../styles/Buttons');

var PrioritizableList = React.createClass({
	getInitialState () {
		return {
			items: []
		};
	},
	render: function () {
		var rowItems = [];
		for (var i = 0; i < this.state.items.length; i++) {
			rowItems.push(
				<RowItem key={i} hasUpButton={i !== 0}
						hasDownButton={i !== this.state.items.length - 1}
						value={this.state.items[i]}
						onDeleteClicked={this.onDeleteClicked.bind(this, i)}
						onUpClicked={this.onUpClicked.bind(this, i)}
						onDownClicked={this.onDownClicked.bind(this, i)}
						placeholder={this.props.listItemPlaceholder}/>
			);
		}
		return (
			<div>
				{rowItems}
				<Button onClick={this.onAddItemClicked} type='button' style={ButtonStyle.Magination}>+ Add rule</Button>
			</div>
		);
	},
	onAddItemClicked: function () {
		var newItems = this.state.items;
		if (this.state.items[this.state.items.length - 1] === '') {
			return;
		}
		newItems.push('');
		this.setState({
			items: newItems
		});
	},
	onDeleteClicked: function (pos) {
		var oldItems = this.state.items;
		oldItems.splice(pos, 1);
		this.setState({
			items: oldItems
		});
	},
	onUpClicked: function (currentPosition) {
		var newList = this.state.items;
		var selectedItem = newList[currentPosition];
		newList[currentPosition] = newList[currentPosition - 1];
		newList[currentPosition - 1] = selectedItem;

		this.setState({
			items: newList
		});
	},
	onDownClicked: function (currentPosition) {
		var newList = this.state.items;
		var selectedItem = newList[currentPosition];
		newList[currentPosition] = newList[currentPosition + 1];
		newList[currentPosition + 1] = selectedItem;

		this.setState({
			items: newList
		});
	}
});
module.exports = PrioritizableList;
