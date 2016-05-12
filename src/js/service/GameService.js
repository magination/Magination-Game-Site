var GameService = {
	createEmptyGame: function () {
		return {
			title: '',
			shortDescription: '',
			numberOfPlayers: 0,
			isPlayableWithMorePlayers: false,
			isPlayableInTeams: false,
			images: [],
			parentGame: '',
			pieces: {
				singles: 0,
				doubles: 0,
				triples: 0
			},
			rules: [],
			alternativeRules: []
		};
	}
};
module.exports = GameService;
