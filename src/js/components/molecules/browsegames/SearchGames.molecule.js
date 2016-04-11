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
					<Input type='text' label='Search' placeholder='General search' onChange={this.tagSearchChange}></Input>
					<Input type='text' label='Title' placeholder='Title' onChange={this.titleSearchChanged}></Input>
					<Input type='text' label='Author' placeholder='Author' onChange={this.authorSearchChanged}></Input>
					<Input bsStyle={this.state.singlesBsStyle} type='number' placeholder='Singles' onChange={this.singlesFilterChanged} addonBefore='1' label='Maximum Pieces'></Input>
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

		var search_filter = {};
		if (this.state.filter_title !== '') {
			search_filter['title'] = this.state.filter_title;
		}
		if (this.state.filter_author !== '') {
			search_filter['author'] = this.state.filter_author;
		}
		if (this.state.filter_singles !== '' && this.state.filter_singles !== '0') {
			search_filter['singles'] = this.state.filter_singles;
		}
		if (this.state.filter_doubles !== '' && this.state.filter_doubles !== '0') {
			search_filter['doubles'] = this.state.filter_doubles;
		}
		if (this.state.filter_triples !== '' && this.state.filter_triples !== '0') {
			search_filter['triple'] = this.state.filter_triples;
		}

		this.props.didSubmit(search_filter);
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
