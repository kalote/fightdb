/**
 * UserGameSettingsController
 *
 * @description :: Server-side logic for managing usergamesettings
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	//Display the user settings information we have for the user
	index: function (req,res){
		var userGSObj = {};
		UserGameSettings.findOne({user: req.param('id')})
			.populate('favoriteCharacters')
			.populate('games')
			.exec(function foundUserGS(err, userGameSettings) {
			if (err) return res.negotiate(err);
			//if no userSettings, set everything to empty
			if (!userGameSettings) {
				userGSObj = '';
			} else 
				userGSObj = userGameSettings;

			res.view('user/settings/game/find', {
				layout: 'layouts/private',
				pageName: 'User',
				me: {
					id: req.param('id')
				},
				gsettings: userGSObj
			});
		});
	},

	//User settings form
	edit: function (req, res) {
		var gamesInfo = {},
			userGSObj = {};

		//load the games & character into the view if no game settings
		Game.find().populate('characters').exec(function(err, games) {
			if (err) return res.negotiate(err);
			gamesInfo = games;
			//find the user game settings or populate with empty value
			UserGameSettings.findOne({user: req.param('id')})
				.populate('favoriteCharacters')
				.populate('games')
				.exec(function foundUser(err, userGameSettings) {
				if (err) return res.negotiate(err);
				if (!userGameSettings)
					userGSObj = '';
				else 
					userGSObj = userGameSettings;
				console.log(gsettings);
				res.view('user/settings/game/edit', {
					layout: 'layouts/private',
					pageName: 'User',
					me: req.param('id'),
					gsettings: userGSObj,
					hasGame: userGSObj==''?false:true,
					games: gamesInfo
				});
			});
		});
	},

	// process the info from edit view
	update: function(req, res) {
		console.log(req.allParams());
		var userGSObj = {
			games: req.param('game'),
			favoriteCharacters: req.param('characters'),
			user: req.param('id')
		}
		UserGameSettings.findOrCreate({user: req.param('id')}, userGSObj, function userSettingsUpdated(err) {
			if (err) return res.negotiate(err);

			return res.json({
				id: req.param("id")
			});
		});
	}
};

