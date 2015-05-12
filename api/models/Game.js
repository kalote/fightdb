/**
* Game.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	title:{
  		type: 'string',
  		required: true
  	},
  	picture:{
  		type: 'string'
  	},
  	characters:{
  		collection: 'character',
  		via: 'game'
  	},
  	//link with users
  	users:{
  		collection: 'usersettings',
  		via: 'games'
  	}
  }
};

