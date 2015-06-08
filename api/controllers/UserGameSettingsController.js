/**
 * UserGameSettingsController
 *
 * @description :: Server-side logic for managing usergamesettings
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

_ = require("lodash");

module.exports = {
	//Display the user settings information we have for the user
	index: function (req,res){
    UserGameSettings.findOrCreate({user: req.param('id')}, function (err, ugs) {
      if (err) res.negotiate(err);
      if (ugs.games && ugs.favoriteCharacters){
        Game.find({id: ugs.games}, function(err, favGame) {
          _.each(favGame, function (key, val){
            ugs.games[val] = {
              id: key.id,
              picture: key.picture
            }
          });
          Character.find({id: ugs.favoriteCharacters}, function (err, favChar) {
            _.each(favChar, function (key, val){
              ugs.favoriteCharacters[val] = {
                id: key.id,
                picture: key.picture
              }
            });
          });
        });
      }
      res.view('user/settings/game/find', {
        layout: 'private',
        pageName: 'User',
        me: {
          id: req.param('id')
        },
        gsettings: ugs
      });
    });
	},

	//User settings form
	edit: function (req, res) {
		var userGSObj='',
		    nbFavGame=0,
		    nbFavChar=0;

		Game.find()
    .populate('characters')
    .exec(function(err, games) {
			if (err) return res.negotiate(err);
			UserGameSettings.findOne({user: req.param('id')}, function foundUser(err, ugs) {
				if (err) return res.negotiate(err);
        if (ugs.games && ugs.favoriteCharacters){
          _.each(games, function (key, val){
            games[val].favorite = ugs.games.indexOf(key.id)>-1;
              nbFavGame=ugs.games.indexOf(key.id)>-1?nbFavGame+1:nbFavGame;
            _.each(games[val].characters, function (k, v){
              games[val].characters[v].favorite = ugs.favoriteCharacters.indexOf(k.id)>-1;
              nbFavChar=ugs.favoriteCharacters.indexOf(k.id)>-1?nbFavChar+1:nbFavChar;
            });
          })
        }
        res.view('user/settings/game/edit', {
          layout: 'private',
          pageName: 'User',
          me: req.param('id'),
          games: games,
          nbFavGame: nbFavGame,
          nbFavChar: nbFavChar
        });
			});
		});
	},

	// process the info from edit view
	update: function(req, res) {
		var userGSObj = {
			games: req.param('games'),
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

