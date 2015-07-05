/**
 * UserSettingsController
 *
 * @description :: Server-side logic for managing usersettings
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	//Display the user settings information we have for the user
	index: function (req,res){
		UserSettings.findOrCreate({user: req.param('id')}, function foundUser(err, userSettings) {
			if (err) return res.negotiate(err);

      //update user with userSettings ID
      User.update(req.param('id'), {userSettings: userSettings.id}, function (err, updated){
        if (err) return res.negotiate(err);
      });
			res.view('user/settings/find', {
				layout: 'private',
				pageName: 'User',
				me: {
					id: req.param('id')
				},
				settings: userSettings
			});
		});
	},

	//User settings form
	edit: function (req, res) {
		var userObj = {};

		//find the user settings or populate with empty value
		UserSettings.findOne({user: req.param('id')}, function foundUser(err, userSettings) {
			if (err) return res.negotiate(err);
			if (!userSettings) {
				userObj = {
					facebook: '',
				  	twitter: '',
				  	twitch: ''
				};
			} else
				userObj = userSettings;
			res.view('user/settings/edit', {
				layout: 'private',
				pageName: 'User',
				me: {
          id: req.param('id')
        },
				settings: userObj
			});
		});
	},

	// process the info from edit view
	update: function(req, res) {
		var userObj = {
			facebook: req.param('facebook'),
			twitter: req.param('twitter'),
			twitch: req.param('twitch'),
			user: req.param('id')
		}

		UserSettings.update({user: req.param('id')}, userObj, function userSettingsUpdated(err) {
			if (err) return res.negotiate(err);

			return res.json({
				id: req.param("id")
			});
		});
	}
};

