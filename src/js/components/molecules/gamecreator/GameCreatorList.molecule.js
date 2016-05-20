var React = require('react');

var GameCreatorStore = require('../../../stores/GameCreatorStore');
var GameCreatorConstants = require('../../../constants/GameCreatorConstants');

var GameCreatorListElement = require('../../atoms/gamecreator/GameCreatorListElement.atom');

var containerStyle = {
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
		var creators = this.state.gameCreatorList.map(function (gameCreator, index) {
			return <GameCreatorListElement key={index} currentSelected={that.state.currentSelected} gameCreator={gameCreator} index={index}/>;
		});
		return (
			<div style={containerStyle}>
				{creators}
			</div>
		);
	},
	onActiveDataChanged: function () {
		this.setState({
			gameCreatorList: GameCreatorStore.getGameCreatorList(),
			currentSelected: GameCreatorStore.getActiveGameCreator()._id
		});
	},
	onListChanged: function () {
		this.setState({
			gameCreatorList: GameCreatorStore.getGameCreatorList()
		});
	}
});

module.exports = GameCreatorList;
