/**
 * UserSettingsController
 *
 * @description :: Server-side logic for managing usersettings
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  //Setup Account: first step SOCIAL
  setupFirst: function(req, res) {
    //create userSettings
    UserSettings.create({user: req.param('id')}, function foundUser(err, userSettings) {
      if (err) return res.negotiate(err);

      //update user with userSettings ID
      User.update(req.param('id'), {userSettings: userSettings.id}, function (err, updated){
        if (err) return res.negotiate(err);
      });
      res.view('user/settings/edit', {
        layout: 'setup',
        pageName: 'User',
        me: {
          id: req.param('id')
        },
        setup: {
          step: 1
        }
      });
    });
  },

  //Setup Account: second step GAME
  setupSecond: function (req,res){
    //create userGameSettings
    UserGameSettings.create({user: req.param('id')}, function (err, ugs) {
      if (err) res.negotiate(err);
      //find games
      Game.find()
      .populate('characters')
      .exec(function(err, games) {
        if (err) return res.negotiate(err);
        res.view('user/settings/game/edit', {
          layout: 'setup',
          pageName: 'User',
          me: {
            id: req.param('id')
          },
          games: games,
          setup: {
            step: 2
          }
        });
      });
    });
  },

  //Setup Account: third step GROUP
  setupThird: function (req,res){
    //find group
    Group.find().exec(function(err, groups) {
      if (err) return res.negotiate(err);
      res.view('group/edit', {
        layout: 'setup',
        pageName: 'Group',
        me: {
          id: req.param('id')
        },
        groups: groups,
        setup: {
          step: 3
        }
      });
    });
  }
}
