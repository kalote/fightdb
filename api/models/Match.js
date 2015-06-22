/**
* Match.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    game:{
      model: 'game'
    },
  	player1:{
      model: 'user'
    },
    player2:{
      model: 'user'
    },
    char1:{
      model: 'character'
    },
    char2:{
      model: 'character'
    },
    type:{
      type: 'string',
      enum: ['Tournament', 'Casual']
    },
    score:{
      type: 'string'
    }
  }
};

