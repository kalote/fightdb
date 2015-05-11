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

	var baseCharacters = [
	{
		name: 'Abel',
		health:	1050,
		stun: 1050,
		picture: 'Abel.png'
	},
	{
		name: 'Adon',
		health:	950,
		stun: 1000,
		picture: 'Adon.png'
	},
	{
		name: 'Akuma',
		health:	850,
		stun: 850,
		picture: 'Akuma.png'
	},
	{
		name: 'Balrog',
		health:	1050,
		stun: 1000,
		picture: 'Balrog.png'
	},
	{
		name: 'Blanka',
		health:	1000,
		stun: 950,
		picture: 'Blanka.png'
	},
	{
		name: 'Cammy',
		health:	950,
		stun: 950,
		picture: 'Cammy.png'
	},
	{
		name: 'ChunLi',
		health:	900,
		stun: 1050,
		picture: 'ChunLi.png'
	},
	{
		name: 'Cody',
		health:	1000,
		stun: 1050,
		picture: 'Cody.png'
	},
	{
		name: 'Viper',
		health:	900,
		stun: 950,
		picture: 'Viper.png'
	},
	{
		name: 'Dan',
		health:	1000,
		stun: 900,
		picture: 'Dan.png'
	},
	{
		name: 'DeeJay',
		health:	1000,
		stun: 1000,
		picture: 'DeeJay.png'
	},
	{
		name: 'Dhalsim',
		health:	900,
		stun: 900,
		picture: 'Dhalsim.png'
	},
	{
		name: 'Dudley',
		health:	1050,
		stun: 1050,
		picture: 'Dudley.png'
	},
	{
		name: 'Honda',
		health:	1050,
		stun: 1100,
		picture: 'Honda.png'
	},
	{
		name: 'ElFuerte',
		health:	900,
		stun: 1000,
		picture: 'ElFuerte.png'
	},
	{
		name: 'EvilRyu',
		health:	850,
		stun: 850,
		picture: 'EvilRyu.png'
	},
	{
		name: 'FeiLong',
		health:	1000,
		stun: 1050,
		picture: 'FeiLong.png'
	},
	{
		name: 'Gen',
		health:	900,
		stun: 900,
		picture: 'Gen.png'
	},
	{
		name: 'Gouken',
		health:	1000,
		stun: 1000,
		picture: 'Gouken.png'
	},
	{
		name: 'Guile',
		health:	1000,
		stun: 900,
		picture: 'Guile.png'
	},
	{
		name: 'Guy',
		health:	1000,
		stun: 950,
		picture: 'Guy.png'
	},
	{
		name: 'Hakan',
		health:	1050,
		stun: 1100,
		picture: 'Hakan.png'
	},
	{
		name: 'Ibuki',
		health:	900,
		stun: 950,
		picture: 'Ibuki.png'
	},
	{
		name: 'Juri',
		health:	950,
		stun: 950,
		picture: 'Juri.png'
	},
	{
		name: 'Ken',
		health:	1000,
		stun: 1000,
		picture: 'Ken.png'
	},
	{
		name: 'Makoto',
		health:	1000,
		stun: 1050,
		picture: 'Makoto.png'
	},
	{
		name: 'Bison',
		health:	1000,
		stun: 950,
		picture: 'Bison.png'
	},
	{
		name: 'Oni',
		health:	950,
		stun: 950,
		picture: 'Oni.png'
	},
	{
		name: 'Rose',
		health:	950,
		stun: 1000,
		picture: 'Rose.png'
	},
	{
		name: 'Rufus',
		health:	1050,
		stun: 950,
		picture: 'Rufus.png'
	},
	{
		name: 'Ryu',
		health:	1000,
		stun: 1000,
		picture: 'Ryu.png'
	},
	{
		name: 'Sagat',
		health:	1050,
		stun: 1000,
		picture: 'Sagat.png'
	},
	{
		name: 'Sakura',
		health:	950,
		stun: 1000,
		picture: 'Sakura.png'
	},
	{
		name: 'Seth',
		health:	800,
		stun: 900,
		picture: 'Seth.png'
	},
	{
		name: 'Hawk',
		health:	1100,
		stun: 1100,
		picture: 'Hawk.png'
	},
	{
		name: 'Vega',
		health:	1000,
		stun: 900,
		picture: 'Vega.png'
	},
	{
		name: 'Yang',
		health:	900,
		stun: 1000,
		picture: 'Yang.png'
	},
	{
		name: 'Yun',
		health:	900,
		stun: 1000,
		picture: 'Yun.png'
	},
	{
		name: 'Zangief',
		health:	1100,
		stun: 1100,
		picture: 'Zangief.png'
	}
	]
	
	Character.count().exec(function(err, count) {
	    if(err) {
	      sails.log.error('Already have data.');
	      return cb(err);
	    }
	    if(count > 0) return cb();

		Character.create(baseCharacters).exec(cb);
	});

	// It's very important to trigger this callback method when you are finished
	// with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
	cb();
};
