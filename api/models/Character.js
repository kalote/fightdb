/**
* Character.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	name: {
  		type: 'string',
  		required: true
  	},
  	picture: {
  		type: 'string'
  	},
  	health: {
  		type: 'string'
  	},
  	stun: {
  		type: 'string'
  	},
  	game: {
  		model: 'game'
  	},
  	player: {
  		collection: 'usergamesettings',
  		via: 'favoriteCharacters'
  	}
  }
};

