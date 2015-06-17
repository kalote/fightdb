angular.module('UserModule').controller('UserController', ['$scope', '$http', 'toastr', function($scope, $http, toastr){

	// set-up loading state
	$scope.editForm = {
		loading: false
	};

	$scope.submitEditForm = function(){

		// Set the loading state (i.e. show loading spinner)
		$scope.editForm.loading = true;

		//CSRF header
		$http.defaults.headers.post['X-CSRF-Token']=$('input[name=_csrf]').val();

		// Submit request to Sails.
		$http.post('/user/update/'+$scope.editForm.userId, $scope.editForm, {
			withCredentials: true
		})
		.then(function onSuccess(sailsResponse){
			//toastr.success('Your information has been updated successfully', 'Success!');
			window.location = '/user/find/'+sailsResponse.data.id;
		})
		.catch(function onError(sailsResponse){
			// Handle known error type(s)
			var emailAddressAlreadyInUse = sailsResponse.status == 409;
			var nicknameAlreadyInUse = sailsResponse.status == 410;

			if (emailAddressAlreadyInUse) {
				toastr.error('That email address has already been taken, please try again.', 'Error');
				return;
			}
			if (nicknameAlreadyInUse) {
				toastr.error('That nickname has already been taken, please try again.', 'Error');
				return;
			}
		})
		.finally(function eitherWay(){
			$scope.editForm.loading = false;
		})
	};

	// set-up loading state
	$scope.editSettingsForm = {
		loading: false
	};

	$scope.submitEditSettingsForm = function(){

		// Set the loading state (i.e. show loading spinner)
		$scope.editSettingsForm.loading = true;

		//CSRF header
		$http.defaults.headers.post['X-CSRF-Token']=$('input[name=_csrf]').val();

		// Submit request to Sails.
		$http.post('/user/settings/update/'+$scope.editSettingsForm.userId, $scope.editSettingsForm, {
			withCredentials: true
		})
		.then(function onSuccess(sailsResponse){
      if ($('input[name=setup]').val() === "1")
        window.location = '/user/game/setup/'+sailsResponse.data.id;
      else
        window.location = '/user/settings/'+sailsResponse.data.id;
		})
		.catch(function onError(sailsResponse){
			toastr.error('An error occured: '+sailsResponse.err, 'Error');
			return;
		})
		.finally(function eitherWay(){
			$scope.editSettingsForm.loading = false;
		})
	};

	// set-up loading state
	$scope.editGameSettingsForm = {
		loading: false,
		games:[],
		nbFavChar: $('input[name=nbFavChar]').val(),
    nbFavGame: $('input[name=nbFavGame]').val(),
		characters: []
	};

	for (var i=0; i<$scope.editGameSettingsForm.nbFavChar; i++){
		$scope.editGameSettingsForm.characters.push($('input[name=favCharacters'+i+']').val());
	}
  for (var j=0; j<$scope.editGameSettingsForm.nbFavGame; j++){
    $scope.editGameSettingsForm.games.push($('input[name=favGames'+j+']').val());
  }
	$scope.cntChar = $scope.editGameSettingsForm.nbFavChar;
  $scope.cntGames = $scope.editGameSettingsForm.nbFavGame;

	$scope.selectGame = function (gameId, gameNbr){
		if ( $("#gameImg"+gameNbr).hasClass("gameNotSelected") ) {
			$("#gameImg"+gameNbr).removeClass("gameNotSelected").addClass("gameSelected");
			$("#gameChar"+gameNbr).removeClass("hidden");
			$scope.editGameSettingsForm.games.push(gameId);
		} else {
			$("#gameImg"+gameNbr).removeClass("gameSelected").addClass("gameNotSelected");
			$("#gameChar"+gameNbr).addClass("hidden");
			$scope.cntGams--;
      var index = $scope.editGameSettingsForm.games.indexOf(gameId);
      $scope.editGameSettingsForm.games.splice(index, 1);
		}
	};

	$scope.selectChar = function (charId, gameNbr, charNbr){
		//USF4
		if ( $("#game"+gameNbr+"char"+charNbr).hasClass("charSpriteNotSelected") ){
			if ($scope.cntChar == 3){
				toastr.warning('You cannot choose more than 3 characters', 'Warning');
			} else {
				$("#game"+gameNbr+"char"+charNbr).removeClass("charSpriteNotSelected").addClass("charSpriteSelected");
				$scope.cntChar++;
				$scope.editGameSettingsForm.characters.push(charId);
				toastr.info('Character successfully added !', 'Info');
			}
		} else if ( $("#game"+gameNbr+"char"+charNbr).hasClass("charSpriteSelected") ) {
			$("#game"+gameNbr+"char"+charNbr).removeClass("charSpriteSelected").addClass("charSpriteNotSelected");
			$scope.cntChar--;
			var index = $scope.editGameSettingsForm.characters.indexOf(charId);
			$scope.editGameSettingsForm.characters.splice(index, 1);
			toastr.info('Character successfully removed !', 'Info');
		}
	};

	$scope.submitEditGameSettingsForm = function(){

		// Set the loading state (i.e. show loading spinner)
		$scope.editGameSettingsForm.loading = true;

		//CSRF header
		$http.defaults.headers.post['X-CSRF-Token']=$('input[name=_csrf]').val();
		// Submit request to Sails.
		$http.post('/user/settings/game/update/'+$scope.editGameSettingsForm.userId, $scope.editGameSettingsForm, {
			withCredentials: true
		})
		.then(function onSuccess(sailsResponse){
			if ($('input[name=setup]').val() === "2")
  			window.location = '/group/setup/'+sailsResponse.data.id;
      else
        window.location = '/user/settings/game/'+sailsResponse.data.id;
		})
		.catch(function onError(sailsResponse){
			toastr.error('An error occured: '+sailsResponse.err, 'Error');
			return;
		})
		.finally(function eitherWay(){
			$scope.editGameSettingsForm.loading = false;
		})
	};
}]);
