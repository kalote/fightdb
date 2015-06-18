/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {

	var baseGame = {
		title: 'USF4',
		picture: 'usf4.png'
		},
		baseCharacters = [{
			name: 'Abel',
			health:	1050,
			stun: 1050,
			picture: 'abel.gif'
		},{
			name: 'Adon',
			health:	950,
			stun: 1000,
			picture: 'adon.gif'
		},{
			name: 'Akuma',
			health:	850,
			stun: 850,
			picture: 'akuma.gif'
		},{
			name: 'Balrog',
			health:	1050,
			stun: 1000,
			picture: 'balrog.gif'
		},{
			name: 'Blanka',
			health:	1000,
			stun: 950,
			picture: 'blanka.gif'
		},{
			name: 'Cammy',
			health:	950,
			stun: 950,
			picture: 'cammy.gif'
		},{
			name: 'ChunLi',
			health:	900,
			stun: 1050,
			picture: 'chunli.gif'
		},{
			name: 'Cody',
			health:	1000,
			stun: 1050,
			picture: 'cody.gif'
		},{
			name: 'Viper',
			health:	900,
			stun: 950,
			picture: 'viper.gif'
		},{
      name: 'Decapre',
      health: 950,
      stun: 950,
      picture: 'decapre.gif'
    },{
			name: 'Dan',
			health:	1000,
			stun: 900,
			picture: 'dan.gif'
		},{
			name: 'DeeJay',
			health:	1000,
			stun: 1000,
			picture: 'deejay.gif'
		},{
			name: 'Dhalsim',
			health:	900,
			stun: 900,
			picture: 'dhalsim.gif'
		},{
			name: 'Dudley',
			health:	1050,
			stun: 1050,
			picture: 'dudley.gif'
		},{
      name: 'Hugo',
      health: 1100,
      stun: 1100,
      picture: 'hugo.gif'
    },{
			name: 'Honda',
			health:	1050,
			stun: 1100,
			picture: 'honda.gif'
		},{
      name: 'Elena',
      health: 950,
      stun: 900,
      picture: 'elena.gif'
    },{
			name: 'ElFuerte',
			health:	900,
			stun: 1000,
			picture: 'elfuerte.gif'
		},{
			name: 'EvilRyu',
			health:	850,
			stun: 850,
			picture: 'evilryu.gif'
		},{
			name: 'FeiLong',
			health:	1000,
			stun: 1050,
			picture: 'feilong.gif'
		},{
			name: 'Gen',
			health:	900,
			stun: 900,
			picture: 'gen.gif'
		},{
			name: 'Gouken',
			health:	1000,
			stun: 1000,
			picture: 'gouken.gif'
		},{
			name: 'Guile',
			health:	1000,
			stun: 900,
			picture: 'guile.gif'
		},{
			name: 'Guy',
			health:	1000,
			stun: 950,
			picture: 'guy.gif'
		},{
			name: 'Hakan',
			health:	1050,
			stun: 1100,
			picture: 'hakan.gif'
		},{
			name: 'Ibuki',
			health:	900,
			stun: 950,
			picture: 'ibuki.gif'
		},{
			name: 'Juri',
			health:	950,
			stun: 950,
			picture: 'juri.gif'
		},{
			name: 'Ken',
			health:	1000,
			stun: 1000,
			picture: 'ken.gif'
		},{
			name: 'Makoto',
			health:	1000,
			stun: 1050,
			picture: 'makoto.gif'
		},{
			name: 'Bison',
			health:	1000,
			stun: 950,
			picture: 'bison.gif'
		},{
			name: 'Oni',
			health:	950,
			stun: 950,
			picture: 'oni.gif'
		},{
      name: 'Rolento',
      health: 1000,
      stun: 950,
      picture: 'rolento.gif'
    },{
			name: 'Rose',
			health:	950,
			stun: 1000,
			picture: 'rose.gif'
		},{
			name: 'Rufus',
			health:	1050,
			stun: 950,
			picture: 'rufus.gif'
		},{
			name: 'Ryu',
			health:	1000,
			stun: 1000,
			picture: 'ryu.gif'
		},{
			name: 'Sagat',
			health:	1050,
			stun: 1000,
			picture: 'sagat.gif'
		},{
			name: 'Sakura',
			health:	950,
			stun: 1000,
			picture: 'sakura.gif'
		},{
			name: 'Seth',
			health:	800,
			stun: 900,
			picture: 'seth.gif'
		},{
			name: 'Hawk',
			health:	1100,
			stun: 1100,
			picture: 'thawk.gif'
		},{
			name: 'Vega',
			health:	1000,
			stun: 900,
			picture: 'vega.gif'
		},{
			name: 'Yang',
			health:	900,
			stun: 1000,
			picture: 'yang.gif'
		},{
			name: 'Yun',
			health:	900,
			stun: 1000,
			picture: 'yun.gif'
		},{
			name: 'Zangief',
			health:	1100,
			stun: 1100,
			picture: 'zangief.gif'
		}],
    baseGroups = [{
      name: 'Hong Kong',
      members: []
    },{
      name: 'World',
      members: []
    }];

	Game.count().exec(function(err, count) {
		if (err) {
			sails.log.error('Already have data.');
			return cb(err);
		}
		//If no game, we suppose that there's no character either
		if (count == 0) {
			Game.create(baseGame, function gameCreated(err, game) {
				if (err) return cb(err);
				//we add the gameId in each character
				for (var index in baseCharacters){
					baseCharacters[index].game = game.id;
				}
				//we create the charactes
				Character.create(baseCharacters, function charCreated(err, chars){
					if (err) return cb(err);
					//we update the game with the characters ID
					var charsId = [];
					for (var i in chars){
						charsId[i] = chars[i].id;
					}
          //we update the game with charId
					Game.update(game.id, {characters: charsId}, function gameUpdated(err) {
						if (err) return cb(err);
            Group.count().exec(function(err, count) {
              if (err) {
                sails.log.error('Already have data.');
                return cb(err);
              }
              if (count == 0){
                Group.create(baseGroups, function groupCreated(err, group) {
                  if (err) return cb(err);
                  //everything went well, call cb()
                  cb();
                });
              }
            });
					});
				});
			})
		} else {
      Group.count().exec(function(err, count) {
        if (err) {
          sails.log.error('Already have data.');
          return cb(err);
        }
        if (count == 0){
          //we create the groups
          Group.create(baseGroups, function groupCreated(err, group) {
            if (err) return cb(err);
            //everything went well, call cb()
            cb();
          });
        } else
          cb();
      });
    }
	});
};
