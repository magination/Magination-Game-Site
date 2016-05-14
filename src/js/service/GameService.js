var _ = require('lodash');

var GameService = {
	createEmptyGame: function () {
		return {
			title: '',
			shortDescription: '',
			numberOfPlayers: 0,
			isPlayableWithMorePlayers: false,
			isPlayableInTeams: false,
			images: [],
			pieces: {
				singles: 0,
				doubles: 0,
				triples: 0
			},
			otherObjects: [],
			rules: ['', '', ''],
			alternativeRules: []
		};
	},
	gameIsEmpty: function (game) {
		if (!game) {
			console.log('Gameisempty in gameservice called without game parameter');
			return;
		}
		var idLessGame = $.extend(true, {}, game);
		delete idLessGame._id;
		delete idLessGame.sumOfVotes;
		delete idLessGame.numberOfVotes;
		delete idLessGame.gameCreators;
		delete idLessGame.rating;
		delete idLessGame.owner;
		delete idLessGame.reviews;
		delete idLessGame.__v;
		delete idLessGame.parentGame;
		return _.isEqual(idLessGame, this.createEmptyGame());
	}
};

module.exports = GameService;
