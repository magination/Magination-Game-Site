var React = require('react');

var GameCreatorStore = require('../../../stores/GameCreatorStore');
var GameCreatorConstants = require('../../../constants/GameCreatorConstants');
var GameCreatorAction = require('../../../actions/GameCreatorAction');

var containerStyle = {
	overflowY: 'scroll'
};

var GameCreatorList = React.createClass({
	getInitialState: function () {
		return {
			gameCreatorList: GameCreatorStore.getGameCreatorList(),
			currentSelected: ''
		};
	},
	componentDidMount: function () {
		GameCreatorStore.addChangeListener(this.onActiveDataChanged, GameCreatorConstants.ACTIVE_DATA_CHANGED);
		GameCreatorStore.addChangeListener(this.onListChanged, GameCreatorConstants.FETCHED_GAMECREATOR_LIST_FROM_SERVER);
	},
	componentWillUnmount: function () {
		GameCreatorStore.removeChangeListener(this.onActiveDataChanged, GameCreatorConstants.ACTIVE_DATA_CHANGED);
		GameCreatorStore.removeChangeListener(this.onListChanged, GameCreatorConstants.FETCHED_GAMECREATOR_LIST_FROM_SERVER);
	},
	render: function () {
		var that = this;
		var creators = this.state.gameCreatorList.map(function (gameCreator) {
			var name = gameCreator.title;
			if (!name) {
				name = 'No Title';
			}
			return <div key={gameCreator._id} onClick={that.onGameCreatorClicked.bind(that, gameCreator._id)}>{name}</div>;
		});
		return (
			<div style={containerStyle}>
				{creators}
			</div>
		);
	},
	onGameCreatorClicked: function (gameCreatorId) {
		GameCreatorAction.loadCreatorId({
			gameCreatorId: gameCreatorId
		});
	},
	onActiveDataChanged: function () {
		this.setState({
			gameCreatorList: GameCreatorStore.getGameCreatorList(),
			currentSelected: GameCreatorStore.getActiveGameCreatorId()
		});
	},
	onListChanged: function () {
		this.setState({
			gameCreatorList: GameCreatorStore.getGameCreatorList()
		});
	}
});

module.exports = GameCreatorList;
