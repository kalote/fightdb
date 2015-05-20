/**
 * UserGameSettingsController
 *
 * @description :: Server-side logic for managing usergamesettings
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	//Display the user settings information we have for the user
	index: function (req,res){
		var userObj = {};
		UserSettings.findOne({user: req.param('id')}, function foundUser(err, userSettings) {
			if (err) return res.negotiate(err);
			//if no userSettings, set everything to empty
			if (!userSettings) {
				userObj = {
					facebook: '',
				  	twitter: '',
				  	twitch: '',
				  	games: '',
				  	favoriteCharacters: ''
				};
			} else 
				userObj = userSettings;

			res.view('user/settings/find', {
				layout: 'layouts/private',
				pageName: 'User',
				me: {
					id: req.param('id')
				},
				settings: userObj
			});
		});
	},

	//User settings form
	edit: function (req, res) {
		var gamesInfo = {},
			userObj = {};
		//load the games & character into the view
		Game.find().populate('characters').exec(function(err, games) {
			if (err) return res.negotiate(err);
			gamesInfo = games;

			//find the user settings or populate with empty value
			UserSettings.findOne({user: req.param('id')}, function foundUser(err, userSettings) {
				if (err) return res.negotiate(err);
				if (!userSettings) {
					userObj = {
						facebook: '',
					  	twitter: '',
					  	twitch: '',
					  	games: '',
					  	favoriteCharacters: ''
					};
				} else 
					userObj = userSettings;

				res.view('user/settings/edit', {
					layout: 'layouts/private',
					pageName: 'User',
					me: req.param('id'),
					settings: userObj,
					games: gamesInfo
				});
			});
		});
	},

	// process the info from edit view
	update: function(req, res) {
		User.update(req.param('id'), userObj, function userUpdated(err) {
			if (err) {
				// If this is a uniqueness error about the email attribute,
				// send back an easily parseable status code.
				var errMsg = JSON.stringify(err.originalError.err);
				if (err.originalError.code == 11000 && errMsg.indexOf("duplicate key") != -1
				&& errMsg.indexOf("email") != -1) {
					return res.emailAddressInUse();
				}

				// If this is a uniqueness error about the nickname attribute,
				// send back an easily parseable status code.
				if (err.originalError.code == 11000 && errMsg.indexOf("duplicate key") != -1
				&& errMsg.indexOf("nickname") != -1) {
					return res.nicknameInUse();
				}
			}

			return res.json({
				id: req.param("id")
			});
		});
	}
};

