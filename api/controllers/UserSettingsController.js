/**
 * UserSettingsController
 *
 * @description :: Server-side logic for managing usersettings
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	index: function (req,res){
		//if user is not logged in, display the home
		if (!user.session.me || user.session.me != req.param('id')){
			return res.view('common/homepage', {
	        	pageName: 'Homepage',
	        	displayLogin: true
	      	});
		}

		//if no settings found, display the user settings form
		User.findOne(req.param('id'), function foundUser(err, user) {
			if (err) return res.negotiate(err);
			if (!user) return res.negotiate();

			res.view({
				me: user,
				layout: 'layouts/private',
				pageName: 'User'
			});
		});
	}
	
};

