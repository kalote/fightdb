var games = [],
    characters = [],
    nbFavGame = $("input[name=nbFavGame]").val(),
    nbFavChar = $("input[name=nbFavChar]").val(),
    gameNotLoading = $(".btnEditGameInfo").html();

function selectGame(gameId, gameNbr){
  if ( $("#gameImg"+gameNbr).hasClass("gameNotSelected") ) {
    $("#gameImg"+gameNbr).removeClass("gameNotSelected").addClass("gameSelected");
    $("#gameChar"+gameNbr).removeClass("hidden");
    games.push(gameId);
  } else {
    $("#gameImg"+gameNbr).removeClass("gameSelected").addClass("gameNotSelected");
    $("#gameChar"+gameNbr).addClass("hidden");
    nbFavGame--;
    games.splice(games.indexOf(gameId), 1);
  }
}

function selectChar(charId, gameNbr, charNbr){
  if ( $("#game"+gameNbr+"char"+charNbr).hasClass("charSpriteNotSelected") ){
    if (nbFavChar === "3"){
      toastr.warning('You cannot choose more than 3 characters', 'Warning');
    } else {
      $("#game"+gameNbr+"char"+charNbr).removeClass("charSpriteNotSelected").addClass("charSpriteSelected");
      nbFavChar++;
      characters.push(charId);
      toastr.info('Character successfully added !', 'Info');
    }
  } else if ( $("#game"+gameNbr+"char"+charNbr).hasClass("charSpriteSelected") ) {
    $("#game"+gameNbr+"char"+charNbr).removeClass("charSpriteSelected").addClass("charSpriteNotSelected");
    nbFavChar--;
    characters.splice(characters.indexOf(charId), 1);
    toastr.info('Character successfully removed !', 'Info');
  }
}

$(function(){
  for (var i=0; i<nbFavChar; i++){
    characters.push($("input[name=favCharacters"+i+"]").val());
  }
  for (var j=0; j<nbFavGame; j++){
    games.push($("input[name=favGames"+j+"]").val());
  }

  $("#edit-game-settings-form").on("submit", function(e){
    e.preventDefault();
    $(".btnEditGameInfo").html("<span class='fa fa-spinner'></span>&nbsp;<span>Saving your game settings...</span>");
    $.ajax({
      xhrFields: {
        withCredentials: true
      },
      headers: {
        "X-CSRF-Token": $("input[name=_csrf]").val()
      },
      url: "/user/settings/game/update/"+$("input[name=userId]").val(),
      method: "POST",
      data: {
        games: games,
        characters: characters
      }
    }).done(function (sailsResponse){
      if ($('input[name=setup]').val() === "2")
        window.location = '/group/setup/'+sailsResponse.id;
      else
        window.location = '/user/settings/game/'+sailsResponse.id;
    }).fail(function onError(sailsResponse){
      toastr.error('An error occured: '+sailsResponse.err, 'Error');
      return;
    }).always(function (){
      $(".btnEditGameInfo").html(gameNotLoading);
    });
  });
})
