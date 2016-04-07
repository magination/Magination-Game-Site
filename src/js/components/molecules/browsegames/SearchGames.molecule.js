var React = require('react');

var Button = require('react-bootstrap').Button;
var Input = require('react-bootstrap').Input;

function isNumericAndNotNegative (value) {
	if (!$.isNumeric(value)) {
		return false;
	}
	if (value < 0) {
		return false;
	}
	return true;
}

var SearchGames = React.createClass({
	getInitialState: function () {
		return {
			filter_title: '',
			filter_author: '',
			filter_singles: '0',
			filter_doubles: '0',
			filter_triples: '0',
			singlesBsStyle: 'success',
			doublesBsStyle: 'success',
			triplesBsStyle: 'success'
		};
	},
	render: function () {
		return (
			<div>
				<h2>Search Filters</h2>
				<form onSubmit={this.onSubmit}>
					<Input type='text' label='Title' placeholder='Title' onChange={this.titleSearchChanged}></Input>
					<Input type='text' label='Author' placeholder='Author' onChange={this.authorSearchChanged}></Input>
					<Input bsStyle={this.state.singlesBsStyle} type='number' label='Maximum Pieces' placeholder='Singles' onChange={this.singlesFilterChanged} addonBefore='1'></Input>
					<Input bsStyle={this.state.doublesBsStyle} type='number' placeholder='Doubles' onChange={this.doublesFilterChanged} addonBefore='2'></Input>
					<Input bsStyle={this.state.triplesBsStyle} type='number' placeholder='Triples' onChange={this.triplesFilterChanged} addonBefore='3'></Input>
					<Button type='submit'>Search</Button>
				</form>
			</div>
		);
	},
	onSubmit: function (e) {
		e.preventDefault();
		if (!($.isNumeric(this.state.filter_singles) &&
			$.isNumeric(this.state.filter_doubles) &&
			$.isNumeric(this.state.filter_triples))) {
			return;
		}
		this.props.didSubmit({
			title: this.state.filter_title,
			author: this.state.filter_author,
			singles: this.state.filter_singles,
			doubles: this.state.filter_doubles,
			triples: this.state.filter_triples
		});
	},
	titleSearchChanged: function (e) {
		this.setState({
			filter_title: e.target.value
		});
	},
	authorSearchChanged: function (e) {
		this.setState({
			filter_author: e.target.value
		});
	},
	singlesFilterChanged: function (e) {
		var style = 'success';
		if (!isNumericAndNotNegative(e.target.value)) {
			style = 'error';
		}
		this.setState({
			filter_singles: e.target.value,
			singlesBsStyle: style
		});
	},

	doublesFilterChanged: function (e) {
		var style = 'success';
		if (!isNumericAndNotNegative(e.target.value)) {
			style = 'error';
		}
		this.setState({
			filter_doubles: e.target.value,
			doublesBsStyle: style
		});
	},
	triplesFilterChanged: function (e) {
		var style = 'success';
		if (!isNumericAndNotNegative(e.target.value)) {
			style = 'error';
		}
		this.setState({
			filter_triples: e.target.value,
			triplesBsStyle: style
		});
	}
});

module.exports = SearchGames;
