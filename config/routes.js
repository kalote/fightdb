/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  // Home page
  'GET /': 'PageController.showHomePage',

  // Signup
  'GET /signup': {
    view: 'common/signup',
    locals: {
      pageName: 'Signup',
      layout: 'public',
      displayLogin: false
    }
  },
  'POST /signup': 'UserController.signup',

  // Setup account
  'GET /user/setup/:id': 'SetupController.setupfirst',
  'GET /user/game/setup/:id': 'SetupController.setupSecond',
  'GET /group/setup/:id': 'SetupController.setupThird',

  // User
  'GET /login': 'UserController.displayLogin',
  'POST /login': 'UserController.login',
  'GET /user/find/:id': 'UserController.find',
  'GET /user/edit/:id': 'UserController.edit',
  'POST /user/update/:id': 'UserController.update',

  // User Logout
  'GET /logout': 'UserController.logout',

  // User social settings
  'GET /user/settings/:id': 'UserSettingsController.index',
  'GET /user/settings/edit/:id': 'UserSettingsController.edit',
  'POST /user/settings/update/:id': 'UserSettingsController.update',

  // User game settings
  'GET /user/settings/game/:id': 'UserGameSettingsController.index',
  'GET /user/settings/game/edit/:id': 'UserGameSettingsController.edit',
  'POST /user/settings/game/update/:id': 'UserGameSettingsController.update',

  // Statistics
  'GET /statistics/:id': 'StatisticsController.index',

  // Group
  'GET /group/find/:id': 'GroupController.index',
  'GET /group/edit/:id': 'GroupController.edit',
  'POST /group/update/:id': 'GroupController.update',
  'POST /group/updategroup': 'GroupController.updategroup',
  'POST /group/getgroups/:id': 'GroupController.getgroups',

  // MatchMode
  'GET /match-mode/:id': 'MatchmodeController.index',
  // |-- Opponent (get list / set opponent)
  'POST /match-mode/get/opponent': 'MatchmodeController.getOpponent',
  'POST /match-mode/set/opponent': 'MatchmodeController.setOpponent',
  // |-- Character (get user fav chars for both users / set char)
  'POST /match-mode/get/char': 'MatchmodeController.getChar',
  'POST /match-mode/set/char': 'MatchmodeController.setChar',
  // |-- Game Type (set type between casual & tournament)
  'POST /match-mode/set/type': 'MatchmodeController.setType',
  // |-- Start match
  'POST /match-mode/start': 'MatchmodeController.startGame',
  // |-- End match
  'POST /match-mode/end': 'MatchmodeController.endGame',
  // |-- Game (only needed if more than 1 game) TODO
  'POST /match-mode/get/game': 'MatchmodeController.getGame',

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  *  If a request to a URL doesn't match any of the custom routes above, it  *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};
