var React = require('react');

var GameCreatorStore = require('../../../stores/GameCreatorStore');
var GameCreatorConstants = require('../../../constants/GameCreatorConstants');
var GameCreatorAction = require('../../../actions/GameCreatorAction');

var Colors = require('../../../styles/Colors');

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
		var creators = this.state.gameCreatorList.map(function (gameCreator, index) {
			var name = gameCreator.title;
			if (!name) {
				name = 'No Title';
			}
			var listElementStyle = {
				color: Colors.blue,
				textAlign: 'center',
				padding: '5px',
				paddingTop: '15px',
				paddingBottom: '15px',
				borderRadius: '5',
				cursor: 'pointer'
			};
			if (that.state.currentSelected === gameCreator._id) {
				listElementStyle['backgroundColor'] = Colors.blue;
				listElementStyle['color'] = 'white';
			}
			else if (that.state.hoveredElementIndex === index) {
				listElementStyle['backgroundColor'] = Colors.blueTransparent;
			}
			return (
				<div key={gameCreator._id}>
					<div style={listElementStyle} onMouseLeave={that.onMouseLeaveElement} onMouseEnter={that.onMouseEnterElement.bind(that, index)} onClick={that.onGameCreatorClicked.bind(that, gameCreator._id)}>
						{name}
					</div>
					<hr style={{padding: '0', margin: '0'}}/>
				</div>
			);
		});
		return (
			<div style={containerStyle}>
				{creators}
			</div>
		);
	},
	onMouseEnterElement: function (index) {
		this.setState({
			hoveredElementIndex: index
		});
	},
	onMouseLeaveElement: function () {
		this.setState({
			hoveredElementIndex: -1
		});
	},
	onGameCreatorClicked: function (gameCreatorId) {
		GameCreatorAction.loadCreatorId({
			gameCreatorId: gameCreatorId
		});
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
