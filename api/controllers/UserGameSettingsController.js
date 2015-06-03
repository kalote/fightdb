/**
 * UserGameSettingsController
 *
 * @description :: Server-side logic for managing usergamesettings
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	//Display the user settings information we have for the user
	index: function (req,res){
    UserGameSettings.count({user: req.param('id')}).exec(function (err, count) {
      if (err) return res.negotiate(err);
      if (count==1){
        UserGameSettings.findOne({user: req.param('id')})
        .populate('favoriteCharacters')
        .populate('games')
        .exec(function foundUserGS(err, ugs) {
          if (err) return res.negotiate(err);
          return res.view('user/settings/game/find', {
            layout: 'private',
            pageName: 'User',
            me: {
              id: req.param('id')
            },
            gsettings: ugs
          });
        });
      //no userGameSettings, let's create one
      } else if (count==0){
        UserGameSettings.create({user: req.param('id')})
        .exec(function (err,userGSCreated) {
          if (err) return res.negotiate(err);
          return res.view('user/settings/game/find', {
            layout: 'private',
            pageName: 'User',
            me: {
              id: req.param('id')
            },
            gsettings: ''
          });
        });
      }
    });
	},

	//User settings form
	edit: function (req, res) {
		var userGSObj='',
		    nbFavGame=0,
		    ngFavChar=0;
    _ = require("lodash");

		Game.find()
    .populate('characters')
    .exec(function(err, games) {
			if (err) return res.negotiate(err);
			UserGameSettings.findOne({user: req.param('id')})
      .populate('favoriteCharacters')
      .populate('games')
			.exec(function foundUser(err, ugs) {
				if (err) return res.negotiate(err);
        console.log(games);
        res.view('user/settings/game/edit', {
					layout: 'private',
					pageName: 'User',
					me: req.param('id'),
					games: games,
					nbFavGame: ugs.games.length,
					nbFavChar: ugs.favoriteCharacters.length
				});
			});
		});
	},

	// process the info from edit view
	update: function(req, res) {
		var userGSObj = {
			games: req.param('game'),
			favoriteCharacters: req.param('characters'),
      user: req.param('id')
		}
		UserGameSettings.update({user: req.param('id')}, userGSObj, function userFound(err, usrGS) {
			if (err) return res.negotiate(err);
			return res.json({
				id: req.param('id')
			});
		});
	}
};

