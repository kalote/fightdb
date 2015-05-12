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
		picture: 'abel.gif'
	},
	{
		name: 'Adon',
		health:	950,
		stun: 1000,
		picture: 'adon.gif'
	},
	{
		name: 'Akuma',
		health:	850,
		stun: 850,
		picture: 'akuma.gif'
	},
	{
		name: 'Balrog',
		health:	1050,
		stun: 1000,
		picture: 'balrog.gif'
	},
	{
		name: 'Blanka',
		health:	1000,
		stun: 950,
		picture: 'blanka.gif'
	},
	{
		name: 'Cammy',
		health:	950,
		stun: 950,
		picture: 'cammy.gif'
	},
	{
		name: 'ChunLi',
		health:	900,
		stun: 1050,
		picture: 'chunli.gif'
	},
	{
		name: 'Cody',
		health:	1000,
		stun: 1050,
		picture: 'cody.gif'
	},
	{
		name: 'Viper',
		health:	900,
		stun: 950,
		picture: 'viper.gif'
	},
	{
		name: 'Dan',
		health:	1000,
		stun: 900,
		picture: 'dan.gif'
	},
	{
		name: 'DeeJay',
		health:	1000,
		stun: 1000,
		picture: 'deejay.gif'
	},
	{
		name: 'Dhalsim',
		health:	900,
		stun: 900,
		picture: 'dhalsim.gif'
	},
	{
		name: 'Dudley',
		health:	1050,
		stun: 1050,
		picture: 'dudley.gif'
	},
	{
		name: 'Honda',
		health:	1050,
		stun: 1100,
		picture: 'honda.gif'
	},
	{
		name: 'ElFuerte',
		health:	900,
		stun: 1000,
		picture: 'elfuerte.gif'
	},
	{
		name: 'EvilRyu',
		health:	850,
		stun: 850,
		picture: 'evilryu.gif'
	},
	{
		name: 'FeiLong',
		health:	1000,
		stun: 1050,
		picture: 'feilong.gif'
	},
	{
		name: 'Gen',
		health:	900,
		stun: 900,
		picture: 'gen.gif'
	},
	{
		name: 'Gouken',
		health:	1000,
		stun: 1000,
		picture: 'gouken.gif'
	},
	{
		name: 'Guile',
		health:	1000,
		stun: 900,
		picture: 'guile.gif'
	},
	{
		name: 'Guy',
		health:	1000,
		stun: 950,
		picture: 'guy.gif'
	},
	{
		name: 'Hakan',
		health:	1050,
		stun: 1100,
		picture: 'hakan.gif'
	},
	{
		name: 'Ibuki',
		health:	900,
		stun: 950,
		picture: 'ibuki.gif'
	},
	{
		name: 'Juri',
		health:	950,
		stun: 950,
		picture: 'juri.gif'
	},
	{
		name: 'Ken',
		health:	1000,
		stun: 1000,
		picture: 'ken.gif'
	},
	{
		name: 'Makoto',
		health:	1000,
		stun: 1050,
		picture: 'makoto.gif'
	},
	{
		name: 'Bison',
		health:	1000,
		stun: 950,
		picture: 'bison.gif'
	},
	{
		name: 'Oni',
		health:	950,
		stun: 950,
		picture: 'oni.gif'
	},
	{
		name: 'Rose',
		health:	950,
		stun: 1000,
		picture: 'rose.gif'
	},
	{
		name: 'Rufus',
		health:	1050,
		stun: 950,
		picture: 'rufus.gif'
	},
	{
		name: 'Ryu',
		health:	1000,
		stun: 1000,
		picture: 'ryu.gif'
	},
	{
		name: 'Sagat',
		health:	1050,
		stun: 1000,
		picture: 'sagat.gif'
	},
	{
		name: 'Sakura',
		health:	950,
		stun: 1000,
		picture: 'sakura.gif'
	},
	{
		name: 'Seth',
		health:	800,
		stun: 900,
		picture: 'seth.gif'
	},
	{
		name: 'Hawk',
		health:	1100,
		stun: 1100,
		picture: 'thawk.gif'
	},
	{
		name: 'Vega',
		health:	1000,
		stun: 900,
		picture: 'vega.gif'
	},
	{
		name: 'Yang',
		health:	900,
		stun: 1000,
		picture: 'yang.gif'
	},
	{
		name: 'Yun',
		health:	900,
		stun: 1000,
		picture: 'yun.gif'
	},
	{
		name: 'Zangief',
		health:	1100,
		stun: 1100,
		picture: 'zangief.gif'
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
