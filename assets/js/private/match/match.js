var cntGame = $("input[name=cntGame]").val(),
  userId = $("input[name=userId]").val(),
  userGroups = $("input[name=userGroups]").val(),
  matchId = $("input[name=matchId]").val(),
  userName = $("input[name=userName]").val(),
  userAvatar = $("input[name=userAvatar]").val(),
  playerData = [],
  oppId, oppAvatar, oppNickname, char1Id, char2Id;

function validateStep(validStep, nextStep) {
  //hide / success / remove
  $("#collapse"+validStep).collapse("toggle");
  $("#heading"+validStep).parent().removeClass("panel-info").addClass("panel-success");
  $("#heading"+validStep+" h3").prepend("<span class='glyphicon glyphicon-ok'></span>&nbsp;");
  $("#collapse"+nextStep).collapse("toggle");
}

function setOpp(){
  oppId = $(this).parent().find("input[name=oppId]").val(),
  oppName = $(this).text(),
  oppAvatar = $(this).find("img").attr("src");
  $.ajax({
    headers: {
      "X-CSRF-Token": $("input[name=_csrf]").val()
    },
    xhrFields: {
      withCredentials: true
    },
    url: "/match-mode/set/opponent",
    method: "POST",
    data: {
      oppId: oppId,
      matchId: matchId
    }
  }).done(function(){
    validateStep("Two", "Three");
  }).fail(function onError(sailsResponse){
    toastr.error('An error occured: '+sailsResponse.err, 'Error');
    console.log(sailsResponse);
    return;
  }).always(function(){
    playerData.push({
      id: oppId,
      nickname: oppName,
      avatar: oppAvatar
    });
  });
}

function setChar(){
  if ($(this).parent().attr("id") === "player1"){
    char1Id = $(this).find("input[name=charId]").val();
    playerData[0].charId = char1Id;
    playerData[0].charName = $(this).find("input[name=charName]").val();
    playerData[0].charPicture = $(this).find("input[name=charPicture]").val();
  } else {
    char2Id = $(this).find("input[name=charId]").val();
    playerData[1].charId = char2Id;
    playerData[1].charName = $(this).find("input[name=charName]").val();
    playerData[1].charPicture = $(this).find("input[name=charPicture]").val();
  }
  $(this).removeClass("alert-warning").addClass("alert-success");

  if (char1Id && char2Id){
    $.ajax({
      headers: {
        "X-CSRF-Token": $("input[name=_csrf]").val()
      },
      xhrFields: {
        withCredentials: true
      },
      url: "/match-mode/set/char",
      method: "POST",
      data: {
        char1: char1Id,
        char2: char2Id,
        matchId: matchId
      }
    }).done(function(){
      validateStep("Three", "Four");
    }).fail(function onError(sailsResponse){
      toastr.error('An error occured: '+sailsResponse.err, 'Error');
      console.log(sailsResponse);
      return;
    });
  }
}

function setType(matchType){

  $.ajax({
    headers: {
      "X-CSRF-Token": $("input[name=_csrf]").val()
    },
    xhrFields: {
      withCredentials: true
    },
    url: "/match-mode/set/type",
    method: "POST",
    data: {
      type: matchType
    }
  }).done(function(){
    validateStep("Four", "Five");
  }).fail(function onError(sailsResponse){
    toastr.error('An error occured: '+sailsResponse.err, 'Error');
    console.log(sailsResponse);
    return;
  }).always(function(){
    //populate match tab
    $(".match").append(
    '<div class="col-md-5 col-xs-5">'+
      '<div class="row">'+
        '<div class="col-md-12 col-xs-12">'+
          '<div style="background-image: url(/images/character/'+playerData[0].charPicture+');"'+
            'class="charSpriteSelected char charSprite center-block"></div>'+
        '</div>'+
        '<div class="col-md-12 col-xs-12 text-left nickname">'+
          '<span>'+playerData[0].nickname+'</span>'+
        '</div>'+
        '<div class="col-md-12 col-xs-12 text-right charname">'+
          '<span>'+playerData[0].charName+'</span>'+
        '</div>'+
      '</div>'+
    '</div>'+
    '<div class="col-md-2 col-xs-2 vs">'+
      '<span>VS</span>'+
    '</div>'+
    '<div class="col-md-5 col-xs-5">'+
      '<div class="row">'+
        '<div class="col-md-12 col-xs-12">'+
          '<div style="background-image: url(/images/character/'+playerData[1].charPicture+');"'+
            'class="charSpriteSelected char charSprite center-block"></div>'+
        '</div>'+
        '<div class="col-md-12 col-xs-12 text-left nickname">'+
          '<span>'+playerData[1].nickname+'</span>'+
        '</div>'+
        '<div class="col-md-12 col-xs-12 text-right charname">'+
          '<span>'+playerData[1].charName+'</span>'+
        '</div>'+
      '</div>'+
    '</div>');
  });
}

$(function() {
  $("#collapseTwo").on("shown.bs.collapse", function(){
    $("#loadingOpp").show();
    $.ajax({
      headers: {
        "X-CSRF-Token": $("input[name=_csrf]").val()
      },
      xhrFields: {
        withCredentials: true
      },
      url: "/match-mode/get/opponent",
      method: "POST",
      data: {
        groupsId: userGroups,
        userId: userId
      }
    }).done(function onSuccess(sailsResponse){
      $.each(sailsResponse, function (key, val){
        $(".opponents").append(
          "<div class='col-md-6 col-xs-6 pointer'>"+
            "<span class='list-group-item opponent'><img src='"+val.avatar+"' width='40'>&nbsp;"+val.nickname+"</span>"+
            "<input type='hidden' name='oppId' value='"+val.id+"'>"+
          "</div>"
        );
      });
    }).fail(function onError(sailsResponse){
      toastr.error('An error occured: '+sailsResponse.err, 'Error');
      console.log(sailsResponse);
      return;
    }).always(function(){
      $("#loadingOpp").hide();
      $(".opponent").bind("click", setOpp);
    });
  });

  $("#collapseThree").on("shown.bs.collapse", function(){
    $("#loadingChar").show();
    $.ajax({
      headers: {
        "X-CSRF-Token": $("input[name=_csrf]").val()
      },
      xhrFields: {
        withCredentials: true
      },
      url: "/match-mode/get/char",
      method: "POST",
      data: {
        player1: userId,
        player2: oppId,
      }
    }).done(function onSuccess(sailsResponse){
      html='';
      cnt=1;
      $.each(sailsResponse, function(key, val){
        html+='<p class="text-center"><strong>Player '+cnt+'</strong></p><hr>';
        $.each(val, function (k, v){
          html+='<div class="media pointer character alert alert-warning">'+
            '<input type="hidden" name="charId" value="'+v.id+'">'+
            '<input type="hidden" name="charPicture" value="'+v.picture+'">'+
            '<input type="hidden" name="charName" value="'+v.name+'">'+
            '<div class="media-left">'+
              '<div style="background-image: url(/images/character/'+v.picture+');" '+
                'class="charSpriteSelected char charSprite"></div>'+
            '</div>'+
            '<div class="media-body">'+
              '<h4 class="media-heading">'+v.name+'</h4>'+
              '<p>Health : '+v.health+'<p>'+
              '<p>Stun : '+v.stun+'</p>'+
            '</div></div>';
        })
        $("#player"+cnt).append(html);
        html="";
        cnt++;
      });
    }).fail(function onError(sailsResponse){
      toastr.error('An error occured: '+sailsResponse.err, 'Error');
      console.log(sailsResponse);
      return;
    }).always(function eitherWay(){
      $("#loadingChar").hide();
      $(".character").bind("click", setChar);
    });
  });

  $("#loadingChar").hide();

  //init player data
  playerData.push({
    id: userId,
    nickname: userName,
    avatar: userAvatar
  });
  //1 game only
  if (cntGame == 0){
    validateStep("One", "Two");
  }
});
