'use strict';

var Handlebars = require('handlebars'),
    _ = require('lodash'),
    sails = require('sails');

// format date by a given format.
// usage : {{#date format="YYYY" }} {{date}} {{/date}} => return Year
Handlebars.registerHelper('date', function(data, options) {
  options = options || {};
  var result = '', f;
  if (moment) {
    f = options.hash.format || 'MMM Do, YYYY';
    if (typeof data === 'number') {
      result = moment(data).format(f);
    } else {
      var date = new Date(data || new Date());
      result = moment(date).format(f);
    }
  } else {
    result = data;   //  moment plugin not available. return data as is.
  }
  return result;
});

//Count function
Handlebars.registerHelper('count', function (value) {
  return value.constructor === Array ? value.length : 0;
});
//Test function
Handlebars.registerHelper('is', function (value, test, options) {
  if (value === test) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

//Stringify a json value
//usage: {{json value}}
Handlebars.registerHelper('json', function (value) {
  return JSON.stringify(value);
});

//Mathematics operation
//usage: {{math x '+' y}}
Handlebars.registerHelper('math', function (lvalue, operator, rvalue) {
  lvalue = parseFloat(lvalue);
  rvalue = parseFloat(rvalue);

  return {
    '+': lvalue + rvalue,
    '-': lvalue - rvalue,
    '*': lvalue * rvalue,
    '/': lvalue / rvalue,
    '%': lvalue % rvalue
  }[operator];
});

//build character list
Handlebars.registerHelper('buildCharList', function (characters, gameIndex) {
  var cnt=0,
      out='',
      charCount=characters.length;
  for(var j=0; j<charCount; j++) {
    out += '<div class="col-md-3 col-sm-2 col-xs-3">';
    if (characters[j].favorite) {
      out += '<input type="hidden" name="favCharacters'+cnt+'" value="'+characters[j].id+'" />';
      out += '<div style="background-image: url(\'/images/character/'+characters[j].picture+'\');" '+
        'class="charSpriteSelected char charSprite" '+
        'onclick="selectChar(\''+characters[j].id+'\', \''+gameIndex+'\', \''+j+'\')" '+
        'id="game'+gameIndex+'char'+j+'"></div>';
      cnt ++;
    } else {
      out += '<div style="background-image: url(\'/images/character/'+characters[j].picture+'\');" '+
        'class="charSpriteNotSelected char charSprite" '+
        'onclick="selectChar(\''+characters[j].id+'\', \''+gameIndex+'\', \''+j+'\')" '+
        'id="game'+gameIndex+'char'+j+'"></div>';
    }
    out += '</div>';
  }
  return out;
});

//compare helper
//usage: {{#compare 3 ">=" 1}}Yes{{else}}No{{/compare}}
Handlebars.registerHelper('compare', function (lvalue, operator, rvalue, options) {

  if (arguments.length < 3)
    throw new Error("Handlerbars Helper 'compare' needs 2 parameters");

  var operator = operator || '==';

  var operators = {
    '==':   function(l,r) { return l == r; },
    '===':  function(l,r) { return l === r; },
    '!=':   function(l,r) { return l != r; },
    '<':    function(l,r) { return l < r; },
    '>':    function(l,r) { return l > r; },
    '<=':   function(l,r) { return l <= r; },
    '>=':   function(l,r) { return l >= r; },
    'typeof': function(l,r) { return typeof l == r; }
  };

  if (!operators[operator])
    throw new Error("Handlerbars Helper 'compare' doesn't know the operator " + operator);

  var result = operators[operator](lvalue,rvalue);

  if( result ) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }

});

//build game list
Handlebars.registerHelper('buildGameList', function (games) {
  var cntGame=0,
      out='',
      gameCount=games.length,
      className='';
  for (var i=0; i<gameCount; i++){
    out += '<div class="row"><div class="col-md-12">';
    out += '<a onclick="selectGame(\''+games[i].id+'\',\''+i+'\')">';
    if (games[i].favorite) {
      out += '<input type="hidden" name="favGames'+cntGame+'" value="'+games[i].id+'" />'+
        '<img src="/images/game/'+games[i].picture+'" class="img-responsive gameSelected game center-block" '+
        'id="gameImg'+i+'">';
      cntGame++;
    } else {
      out += '<img src="/images/game/'+games[i].picture+'" '+
        'class="img-responsive gameNotSelected game center-block" id="gameImg'+i+'">';
      className='hidden';
    }
    out += '</a></div>'+
      '<div id="gameChar'+i+'" class="'+className+' someMargin">';
    out += Handlebars.helpers.buildCharList(games[i].characters,i);
    out += '</div></div>';
  }
  return out;
});

//debug
Handlebars.registerHelper('debug', function (optionalValue) {
  console.log('Value');
  console.log('====================');
  console.log(optionalValue);
});
