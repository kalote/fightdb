/**
* UserGameSettings.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	//games collection
  	//many-to-many
  	games:{
  		type: 'array'
  	},
  	//favorite characters
  	//many-to-many
  	favoriteCharacters: {
  		type: 'array'
  	},
  	//user link
    //one-to-one
    user: {
      model: 'user'
    }
  }
};

