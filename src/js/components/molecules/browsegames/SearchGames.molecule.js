var React = require('react');

var SearchGames = React.createClass({
	getInitialState: function () {
		return {
			filter_title: '',
			filter_author: '',
			filter_singles: '',
			filter_doubles: '',
			filter_triples: ''
		};
	},
	render: function () {
		return (
			<div>
				<form onSubmit={this.onSubmit}>
					<div className='form-group'>
						<label htmlFor='searchtitle' >Title</label>
						<input id='searchtitle' className='form-control' onChange={this.titleSearchChanged} value={this.state.filter_title} type='text' placeholder='Title'/>
					</div>
					<div className='form-group'>
						<label htmlFor='searchauthor'>Author</label>
						<input id='searchauthor' className='form-control' onChange={this.authorSearchChanged} value={this.state.filter_author} type='text' placeholder='Author'/>
					</div>
					<div className='form-group has-feedback'>
						<label className='control-label'>Minimum Amount of Pieces</label>
						<div className='input-group'>
							<span className='input-group-addon'>1</span>
							<input value={this.state.filter_singles} onChange={this.singlesFilterChanged} className='form-control' type='number'/>
						</div>
						<div className='input-group'>
							<span className='input-group-addon'>2</span>
							<input value={this.state.filter_doubles} onChange={this.doublesFilterChanged} className='form-control' type='number'/>
						</div>
						<div className='input-group'>
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
