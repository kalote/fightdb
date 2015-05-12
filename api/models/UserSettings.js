/**
* UserSettings.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	//Social settings
  	facebook: {
  		type: 'string'
  	},
  	twitter: {
  		type: 'string'
  	},
  	twitch: {
  		type: 'string'
  	},
  	//games collection
  	//many-to-many
  	games:{
  		collection: 'game',
      via: 'users'
  	},
  	//favorite characters
  	//many-to-many
  	favoriteCharacters: {
  		collection: 'character',
  		via: 'player'
  	},
    //user link
    //one-to-one  
    user: {
      model: 'user'
    }
  }
};

