var React = require('react');

var Button = require('react-bootstrap').Button;
var Input = require('react-bootstrap').Input;
var Rating = require('../browsegames/RateGame.molecule');

var ImgUrls = require('../../../config/config').urls.img;
var ContainerStyles = require('../../../styles/Containers');
var TextStyles = require('../../../styles/Text');

var GameListStore = require('../../../stores/GameListStore');
var GameListAction = require('../../../actions/GameListAction');
var GameListConstants = require('../../../constants/GameListConstants');
var LoginStore = require('../../../stores/LoginStore');

var SearchGames = React.createClass({
	getInitialState: function () {
		return {
			filter_title: '',
			filter_author: '',
			filter_singles: '0',
			filter_doubles: '0',
			filter_triples: '0',
			filter_general_search: '',
			filter_rating: 0,
			hasImportedPieces: false
		};
	},
	componentDidMount: function () {
		this.refs.searchEntry.refs.input.focus();
		LoginStore.addChangeListener(this.onLoginChanged);
		GameListStore.addChangeListener(this.onGameListFilterChange, GameListConstants.SET_GAMES_SEARCH_FILTERS);
	},
	componentWillUnmount: function () {
		GameListAction.clearSearchFilters();
		LoginStore.removeChangeListener(this.onLoginChanged);
		GameListStore.removeChangeListener(this.onGameListFilterChange, GameListConstants.SET_GAMES_SEARCH_FILTERS);
	},
	render: function () {
		return (
			<div style={ContainerStyles.searchContainer}>
				<h2 style={TextStyles.white}>Search Filters</h2>
				<form onSubmit={this.onSubmit}>
					<h4 style={TextStyles.white}>General Search</h4>
					<Input value={this.state.filter_general_search} ref='searchEntry' type='text' placeholder='General search' onChange={this.tagSearchChange}></Input>
					<h4 style={TextStyles.white}>Title</h4>
					<Input value={this.state.filter_title} type='text' placeholder='Title' onChange={this.titleSearchChanged}></Input>
					<h4 style={TextStyles.white}>Author</h4>
					<Input value={this.state.filter_author} type='text' placeholder='Author' onChange={this.authorSearchChanged}></Input>
					<h4 style={TextStyles.white}>Minimum Rating</h4>
					<Rating rating={this.state.filter_rating} glyphStyle={TextStyles.RatingStarWhite} maxRating='5' onRatingClicked={this.onRatingClicked} selectedImage='star' unselectedImage='star-empty'/>
					<h4 style={TextStyles.white}>Pieces</h4>
					<Input disabled={!LoginStore.getLoginState().isLoggedIn} value={this.state.hasImportedPieces} onChange={this.onImportPiecesCheckboxChange} type='checkbox' label={<span style={TextStyles.white}>Import pieces from My Profile</span>}/>
					<Input value={this.state.filter_singles} enabled={this.state.hasImportedPieces} type='number' placeholder='Singles' onChange={this.singlesFilterChanged} addonBefore={<img width={39} height={19} src={ImgUrls.pieceSingleBlue} alt='No img'/>}></Input>
					<Input value={this.state.filter_doubles} type='number' placeholder='Doubles' onChange={this.doublesFilterChanged} addonBefore={<img width={39} height={19} src={ImgUrls.pieceDoubleBlue} alt='No img'/>}></Input>
					<Input value={this.state.filter_triples} type='number' placeholder='Triples' onChange={this.triplesFilterChanged} addonBefore={<img width={39} height={19} src={ImgUrls.pieceTripleBlue} alt='No img'/>}></Input>
					<Button type='submit'>Search</Button>
				</form>
			</div>
		);
	},
	onRatingClicked: function (rating) {
		this.setState({
			filter_rating: rating
		});
	},
	onImportPiecesCheckboxChange: function (e) {
		if (e.target.value) {
			this.setState({
				filter_singles: LoginStore.getLoginProfile().pieces.singles,
				filter_doubles: LoginStore.getLoginProfile().pieces.doubles,
				filter_triples: LoginStore.getLoginProfile().pieces.triples,
				hasImportedPieces: e.target.value
			});
		}
		else {
			this.setState({
				filter_singles: 0,
				filter_doubles: 0,
				filter_triples: 0,
				hasImportedPieces: e.target.value
			});
		}
	},
	onGameListFilterChange: function () {
		setTimeout(function () {
			GameListAction.clearGamesList();
		}, 0);
		setTimeout(function () {
			GameListAction.getGamesSpecificInterval(0, 10);
		}, 0);
	},
	onLoginChanged: function () {
		this.forceUpdate();
	},
	onSubmit: function (e) {
		e.preventDefault();

		var search_filter = {};
		if (this.state.filter_general_search !== '') {
			search_filter['search'] = this.state.filter_general_search;
		}
		if (this.state.filter_title !== '') {
			search_filter['title'] = this.state.filter_title;
		}
		if (this.state.filter_author !== '') {
			search_filter['owner'] = this.state.filter_author;
		}
		if (this.state.filter_singles !== '' && this.state.filter_singles > 0) {
			search_filter['singles'] = this.state.filter_singles;
		}
		if (this.state.filter_doubles !== '' && this.state.filter_doubles > 0) {
			search_filter['doubles'] = this.state.filter_doubles;
		}
		if (this.state.filter_triples !== '' && this.state.filter_triples > 0) {
			search_filter['triple'] = this.state.filter_triples;
		}
		if (this.state.filter_rating > 0 && this.state.filter_rating < 6) {
			search_filter['rating'] = this.state.filter_rating;
		}
		GameListAction.setGameSearchFilters(search_filter);
	},
	tagSearchChange: function (e) {
		this.setState({
			filter_general_search: e.target.value
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
