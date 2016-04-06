var React = require('react');

var SearchGames = React.createClass({
	getInitialState: function () {
		return {
			filter_title: '',
			filter_author: '',
			filter_singles: '0',
			filter_doubles: '0',
			filter_triples: '0',
			feedbackClass: 'has-success'
		};
	},
	render: function () {
		var singlesClassName = ($.isNumeric(this.state.filter_singles)) ? 'input-group has-success' : 'input-group has-error';
		var doublesClassName = ($.isNumeric(this.state.filter_doubles)) ? 'input-group has-success' : 'input-group has-error';
		var triplesClassName = ($.isNumeric(this.state.filter_triples)) ? 'input-group has-success' : 'input-group has-error';
		return (
			<div>
				<h2>Search Filters</h2>
				<form onSubmit={this.onSubmit}>
					<div className='form-group'>
						<label htmlFor='searchtitle' >Title</label>
						<input id='searchtitle' className='form-control' onChange={this.titleSearchChanged} value={this.state.filter_title} type='text' placeholder='Title'/>
					</div>
					<div className='form-group'>
						<label htmlFor='searchauthor'>Author</label>
						<input id='searchauthor' className='form-control' onChange={this.authorSearchChanged} value={this.state.filter_author} type='text' placeholder='Author'/>
					</div>
					<div className='form-group'>
						<label className='control-label'>Minimum Amount of Pieces</label>
						<div className={singlesClassName}>
							<span className='input-group-addon'>1</span>
							<input value={this.state.filter_singles} onChange={this.singlesFilterChanged} className='form-control' type='number'/>
						</div>
						<div className={doublesClassName}>
							<span className='input-group-addon'>2</span>
							<input value={this.state.filter_doubles} onChange={this.doublesFilterChanged} className='form-control' type='number'/>
						</div>
						<div className={triplesClassName}>
							<span className='input-group-addon'>3</span>
							<input value={this.state.filter_triples} onChange={this.triplesFilterChanged} className='form-control' type='number'/>
						</div>
					</div>
					<button type='submit' className='btn btn-default'>Search</button>
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
		this.setState({
			filter_singles: e.target.value
		});
	},
	doublesFilterChanged: function (e) {
		this.setState({
			filter_doubles: e.target.value
		});
	},
	triplesFilterChanged: function (e) {
		this.setState({
			filter_triples: e.target.value
		});
	}
});

module.exports = SearchGames;
