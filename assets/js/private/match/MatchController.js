angular.module('MatchModule').controller('MatchController', ['$scope', '$http', 'toastr', function($scope, $http, toastr){
  var cntGame = $("input[name=cntGame]").val(),
      userId = $("input[name=userId]").val(),
      userGroups = $("input[name=userGroups]").val(),
      matchId = $("input[name=matchId]").val(),
      userName = $("input[name=userName]").val(),
      userAvatar = $("input[name=userAvatar]").val(),
      playerData = [],
      oppId, oppAvatar, oppNickname, char1Id, char2Id;

  $scope.validateStep = function(validStep, nextStep) {
    //hide / success / remove
    $("#collapse"+validStep).collapse("toggle");
    $("#heading"+validStep).parent().removeClass("panel-info").addClass("panel-success");
    $("#heading"+validStep+" h3").prepend("<span class='glyphicon glyphicon-ok'></span>&nbsp;");
    $("#collapse"+nextStep).collapse("toggle");
  };

  //opponent
  $scope.opponent = {
    loading: true
  };
  $("#collapseTwo").on("shown.bs.collapse", function(){
    //CSRF header
    $http.defaults.headers.post['X-CSRF-Token']=$('input[name=_csrf]').val();
    $http.post("/match-mode/get/opponent", {groupsId: userGroups, userId: userId}, {
      withCredentials: true
    })
    .then(function onSuccess(sailsResponse){
      $.each(sailsResponse.data, function (key, val){
        $(".opponents").append(
          "<div class='col-md-6 col-xs-6 pointer'>"+
            "<span class='list-group-item opponent'><img src='"+val.avatar+"' width='40'>&nbsp;"+val.nickname+"</span>"+
            "<input type='hidden' name='oppId' value='"+val.id+"'>"+
          "</div>"
        );
      });
    })
    .catch(function onError(sailsResponse){
      toastr.error('An error occured: '+sailsResponse.err, 'Error');
      console.log(sailsResponse);
      return;
    })
    .finally(function eitherWay(){
      $(".opponent").bind("click", setOpp);
      $scope.opponent.loading = false;
    });
  });

  function setOpp(){
    oppId = $(this).parent().find("input[name=oppId]").val(),
    oppName = $(this).text(),
    oppAvatar = $(this).find("img").attr("src");

    $http.post("/match-mode/set/opponent", {oppId: oppId, matchId: matchId}, {
      withCredentials: true
    })
    .then(function onSuccess(sailsResponse){
      if (sailsResponse.status === 200){
        $scope.validateStep("Two", "Three");
      }
    })
    .catch(function onError(sailsResponse){
      toastr.error('An error occured: '+sailsResponse.err, 'Error');
      console.log(sailsResponse);
      return;
    })
    .finally(function eitherWay(){
      playerData.push({
        id: oppId,
        nickname: oppName,
        avatar: oppAvatar
      });
    });
  };

  //character
  $scope.character = {
    loading: true
  };
  $("#collapseThree").on("shown.bs.collapse", function(){
    $http.post("/match-mode/get/char", {player1: userId, player2: oppId}, {
      withCredentials: true
    })
    .then(function onSuccess(sailsResponse){
      html='';
      cnt=1;
      $.each(sailsResponse.data, function(key, val){
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
    })
    .catch(function onError(sailsResponse){
      toastr.error('An error occured: '+sailsResponse.err, 'Error');
      console.log(sailsResponse);
      return;
    })
    .finally(function eitherWay(){
      $scope.character.loading = false;
      $(".character").bind("click", setChar);
    });
  });

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
      $http.post("/match-mode/set/char", {char1: char1Id, char2: char2Id, matchId: matchId}, {
        withCredentials: true
      })
      .then(function onSuccess(sailsResponse){
        if (sailsResponse.status === 200){
          $scope.validateStep("Three", "Four");
        }
      })
      .catch(function onError(sailsResponse){
        toastr.error('An error occured: '+sailsResponse.err, 'Error');
        console.log(sailsResponse);
        return;
      });
    }
  }

  $scope.setType = function(matchType){
    $http.post("/match-mode/set/type", {type: matchType}, {
      withCredentials: true
    })
    .then(function onSuccess(sailsResponse){
      if (sailsResponse.status === 200){
        $scope.validateStep("Four", "Five");
      }
    })
    .catch(function onError(sailsResponse){
      toastr.error('An error occured: '+sailsResponse.err, 'Error');
      console.log(sailsResponse);
      return;
    })
    .finally(function eitherWay(){
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

  $(document).ready(function() {
    //init player data
    playerData.push({
      id: userId,
      nickname: userName,
      avatar: userAvatar
    });
    //1 game only
    if (cntGame == 0){
      $scope.validateStep("One", "Two");
    }
  });
}]);
