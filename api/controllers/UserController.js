/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  //login page
  displayLogin: function(req,res) {
    res.view('user/login', {
      layout:'public',
      pageName: 'Homepage',
      displayLogin: false
    });
  },

  //login function
  login: function (req, res) {

    // Try to look up user using the provided email address
    User.findOne({
      email: req.param('email')
    }, function foundUser(err, user) {
      if (err) return res.negotiate(err);
      if (!user) return res.notFound();

      // Compare password attempt from the form params to the encrypted password
      // from the database (`user.password`)
      require('machinepack-passwords').checkPassword({
        passwordAttempt: req.param('password'),
        encryptedPassword: user.encryptedPassword
      }).exec({

        error: function (err){
          return res.negotiate(err);
        },

        // If the password from the form params doesn't checkout w/ the encrypted
        // password from the database...
        incorrect: function (){
          return res.notFound();
        },

        success: function (){

          // Store user id in the user session
          req.session.me = user.id;

          // All done- let the client know that everything worked.
          return res.ok();
        }
      });
    });

  },

  //signup form
  signup: function(req, res) {

    var Passwords = require('machinepack-passwords');

    // Encrypt a string using the BCrypt algorithm.
    Passwords.encryptPassword({
      password: req.param('password'),
      difficulty: 10,
    }).exec({
      // An unexpected error occurred.
      error: function(err) {
        return res.negotiate(err);
      },
      // OK.
      success: function(encryptedPassword) {
        require('machinepack-gravatar').getImageUrl({
          emailAddress: req.param('email')
        }).exec({
          error: function(err) {
            return res.negotiate(err);
          },
          success: function(gravatarUrl) {
            // Create a User with the params sent from
            // the sign-up form --> signup.ejs
            User.create({
              name: req.param('name'),
              nickname: req.param('nickname'),
              email: req.param('email'),
              gender: req.param('gender'),
              gamertag: req.param('gamertag'),
              status: 'online',
              encryptedPassword: encryptedPassword,
              lastLoggedIn: new Date(),
              gravatarUrl: gravatarUrl
            }, function userCreated(err, newUser) {
              if (err) {
                //[ 'originalError', '_e', 'rawStack', 'details', 'model' ]
                //console.log("---------- original -----");
                //console.log(err.originalError.err);
                var errMsg = JSON.stringify(err.originalError.err);

                // If this is a uniqueness error about the email attribute,
                // send back an easily parseable status code.
                if (err.originalError.code == 11000 && errMsg.indexOf("duplicate key") != -1
                  && errMsg.indexOf("email") != -1) {
                  return res.emailAddressInUse();
                }

                // If this is a uniqueness error about the nickname attribute,
                // send back an easily parseable status code.
                if (err.originalError.code == 11000 && errMsg.indexOf("duplicate key") != -1
                  && errMsg.indexOf("nickname") != -1) {
                  return res.nicknameInUse();
                }

                // Otherwise, send back something reasonable as our error response.
                return res.negotiate(err);
              }

              // Log user in
              req.session.me = newUser.id;

              // Send back the id of the new user
              return res.json({
                id: newUser.id
              });
            });
          }
        });
      }
    });
  },

  //Log out function
  logout: function (req, res) {

    // Look up the user record from the database which is
    // referenced by the id in the user session (req.session.me)
    User.findOne(req.session.me, function foundUser(err, user) {
      if (err) return res.negotiate(err);

      // If session refers to a user who no longer exists, still allow logout.
      if (!user) {
        sails.log.verbose('Session refers to a user who no longer exists.');
        return res.backToHomePage();
      }

      // Wipe out the session (log out)
      req.session.destroy();

      // Either send a 200 OK or redirect to the home page
      return res.backToHomePage();

    });
  },

  //display the user information
  find: function (req,res){
    User.findOne(req.param("id"), function foundUser(err, user) {
      if (err) return res.negotiate(err);
      if (!user) return res.negotiate();

      res.view({
        me: {
          id: user.id,
          name: user.name,
          email: user.email,
          nickname: user.nickname,
          gender: user.gender,
          gravatarUrl: user.gravatarUrl,
          gamertag: user.gamertag
        },
        layout: 'private',
        pageName: 'User'
      });
    });
  },

  //load the edit user view
  edit: function(req, res) {

    // Find the user from the id passed in via params
    User.findOne(req.param("id"), function foundUser(err, user) {
      if (err) return res.negotiate(err);
      if (!user) return res.negotiate();

      res.view({
        me: user,
        layout: 'private',
        pageName: 'User'
      });
    });
  },

  //process the info from edit view
  update: function(req, res) {
    var userObj = {
      name: req.param('name'),
      nickname: req.param('nickname'),
      email: req.param('email'),
      gamertag: req.param('gamertag')
    }

    User.update(req.param('id'), userObj, function userUpdated(err) {
      if (err) {
        //[ 'originalError', '_e', 'rawStack', 'details', 'model' ]
        //console.log("---------- original -----");
        //console.log(err.originalError);

        // If this is a uniqueness error about the email attribute,
        // send back an easily parseable status code.
        var errMsg = JSON.stringify(err.originalError.err);
        if (err.originalError.code == 11000 && errMsg.indexOf("duplicate key") != -1
          && errMsg.indexOf("email") != -1) {
          return res.emailAddressInUse();
        }

        // If this is a uniqueness error about the nickname attribute,
        // send back an easily parseable status code.
        if (err.originalError.code == 11000 && errMsg.indexOf("duplicate key") != -1
          && errMsg.indexOf("nickname") != -1) {
          return res.nicknameInUse();
        }
      }

      return res.json({
        id: req.param("id")
      });
    });
  }
};
