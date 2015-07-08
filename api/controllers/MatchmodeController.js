/**
 * MatchmodeController
 *
 * @description :: Server-side logic for managing match-mode
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  //Init a match
  index: function (req,res){
    var matchObj={},
        gameInfo={},
        charInfo={},
        groupsArr=[],
        groupsString='';
    //Find the user
    User.findOne(req.param('id'))
    .populate('userGameSettings')
    .populate('groups')
    .exec(function (err, usr) {
      if (err) return res.negotiate(err);
      //if user has only 1 game, associate it with the match
      if (usr.userGameSettings.games.length === 1){
        matchObj.game = usr.userGameSettings.games[0];
        Game.findOne(matchObj.game).exec(function (err, game) {
          if (err) return res.negotiate(err);
          gameInfo=game;
        });
      }
      //if user has only 1 favorite character, associate it with the match
      if (usr.userGameSettings.favoriteCharacters.length === 1){
        matchObj.char1 = usr.userGameSettings.favoriteCharacters[0];
        Character.findOne(matchObj.char1).exec(function (err, character) {
          if (err) return res.negotiate(err);
          charInfo=character;
        });
      }
      //groups as a string
      for (var i in usr.groups){
        groupsArr.push(usr.groups[i].id);
      }
      groupsString = groupsArr.filter(function(n){ return n != undefined }).join();
      matchObj.player1 = usr.id;
      //create a game
      Match.create(matchObj).exec(function (err, matchInfo) {
        if (err) return res.negotiate(err);
        res.view('matchmode/new', {
          layout: 'private',
          me: usr,
          game: gameInfo,
          match: matchInfo,
          character: charInfo,
          groups: groupsString
        });
      });
    })
  },

  //Get opponent
  getOpponent: function (req, res){
    var groupsId = req.param('groupsId').split(","),
        uid = req.param('userId');
        output = [],
        ids = [];

    Group.find(groupsId)
    .populate("members")
    .exec(function (err, groups){
      if (err) return res.negotiate(err);
      for (var i in groups){
        for (var j in groups[i].members){
          if (groups[i].members[j].id != undefined &&
            groups[i].members[j].id !== uid &&
            ids.indexOf(groups[i].members[j].id) === -1){
            ids.push(groups[i].members[j].id);
            output.push({
              id: groups[i].members[j].id,
              nickname: groups[i].members[j].nickname,
              avatar: groups[i].members[j].gravatarUrl
            });
          }
        }
      }
      return res.json(output);
    });
  },

  //Set opponent
  setOpponent: function (req, res){
    var matchId = req.param("matchId"),
        oppId = req.param("oppId");
    Match.update(matchId, {player2: oppId}).exec(function (err,match){
      if (err) return res.negotiate(err);
      return res.ok();
    });
  },

  //Get char
  getChar: function (req, res){
    var player1Id = req.param("player1"),
        player2Id = req.param("player2"),
        chars=[];

    //Player 1
    User.findOne(player1Id)
    .populate("userGameSettings")
    .exec(function (err, player1){
      if (err) return res.negotiate(err);
      Character.find(player1.userGameSettings.favoriteCharacters).exec(function (err, chars1){
        if (err) return res.negotiate(err);
        chars.push(chars1);
        //Player 2
        User.findOne(player2Id)
        .populate("userGameSettings")
        .exec(function (err, player2){
          if (err) return res.negotiate(err);
          Character.find(player2.userGameSettings.favoriteCharacters).exec(function (err, chars2){
            if (err) return res.negotiate(err);
            chars.push(chars2);
            res.json(chars);
          });
        });
      });
    });
  },

  //Set char
  setChar: function (req, res){
    var char1Id = req.param("char1"),
        char2Id = req.param("char2"),
        matchId = req.param("matchId");
    Match.update(matchId, {char1: char1Id, char2: char2Id}).exec(function (err,match){
      if (err) return res.negotiate(err);
      return res.ok();
    });
  },

  //Set type of game
  setType: function (req, res){
    var matchType = req.param("matchType"),
        matchId = req.param("matchId");
    Match.update(matchId, {type: matchType}).exec(function (err,match){
      if (err) return res.negotiate(err);
      return res.ok();
    });
  },

  //Start game
  startGame: function (req, res){
  },

  //End game
  endGame: function (req, res){
  },

  //Get game
  getGame: function (req, res){
    Game.find(req.param('gameId')).exec(function (err, games){
      if (err) return res.negotiate(err);
      return res.json(games.length === 1 ? games[0] : games);
    });
  },
};

