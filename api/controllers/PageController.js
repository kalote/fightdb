/**
 * PageController
 *
 * @description :: Server-side logic for managing pages
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	showHomePage: function (req, res) {


    // If not logged in, show the public view.
    if (!req.session.me) {
      return res.view('common/homepage', {
        layout: 'public',
        displayLogin: true
      });
    }

    // Otherwise, look up the logged-in user and show the logged-in view,
    // bootstrapping basic user data in the HTML sent from the server
    User.findOne(req.session.me)
      .populate('userSettings')
      .populate('userGameSettings')
      .exec(function (err, user){
      if (err) {
        return res.negotiate(err);
      }

      if (!user) {
        sails.log.verbose('Session refers to a user who no longer exists- did you delete a user, then try to refresh the page with an open tab logged-in as that user?');
        return res.view('common/homepage', {
          layout: 'public',
          displayLogin: true
        });
      }

      return res.view('common/dashboard', {
        me: {
          id: user.id,
          name: user.name,
          email: user.email,
          nickname: user.nickname,
          gravatarUrl: user.gravatarUrl,
          facebook: user.userSettings.facebook,
          twitter: user.userSettings.twitter,
          twitch: user.userSettings.twitch,
        },
        layout: 'private'
      });

    });
  },

};
