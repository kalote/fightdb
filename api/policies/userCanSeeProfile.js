/**
 * Allow a logged-in user to see, edit and update his own profile
 */

module.exports = function(req, res, next) {

	var sessionUserMatchesId = req.session.me === req.param('id');

	// The requested id does not match the user's id,
	if (!sessionUserMatchesId) {
		var noRightsError = [{name: 'Authentication error', message: 'You must be logged in to see this page.'}]
		req.session.flash = {
			err: noRightsError
		}
    	return res.redirect('/login');
	}
	return next();
};
