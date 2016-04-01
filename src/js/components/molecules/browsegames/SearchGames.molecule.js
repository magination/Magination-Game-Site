var React = require('react');

var SearchGames = React.createClass({
	getInitialState: function(){
		return {
			searchtext: ""
		};
	},
	render: function(){
		return (
			<div>
				<input onChange={this._searchChanged} value={this.state.searchtext} type="text" placeholder="Search"/>
			</div>
		)
	},
	_searchChanged: function(e){
		this.setState({
			searchtext: e.target.value
		});

		/*TODO action search*/
	}

});

module.exports = SearchGames;