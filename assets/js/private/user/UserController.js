angular.module('UserModule').controller('UserController', ['$scope', '$http', 'toastr', function($scope, $http, toastr){

	// set-up loading state
	$scope.editForm = {
		loading: false
	}

	$scope.submitEditForm = function(){

		// Set the loading state (i.e. show loading spinner)
		$scope.editForm.loading = true;

		//CSRF header
		$http.defaults.headers.post['X-CSRF-Token']=document.getElementsByName('_csrf')[0].value;
		
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
	}

	// set-up loading state
	$scope.editSettingsForm = {
		loading: false
	}

	$scope.submitEditSettingsForm = function(){

		// Set the loading state (i.e. show loading spinner)
		$scope.editSettingsForm.loading = true;

		//CSRF header
		$http.defaults.headers.post['X-CSRF-Token']=document.getElementsByName('_csrf')[0].value;
		
		// Submit request to Sails.
		$http.post('/user/settings/update/'+$scope.editSettingsForm.userId, $scope.editSettingsForm, {
			withCredentials: true
		})
		.then(function onSuccess(sailsResponse){
			//toastr.success('Your information has been updated successfully', 'Success!');
			window.location = '/user/settings/'+sailsResponse.data.id;
		})
		.catch(function onError(sailsResponse){
			toastr.error('An error occured: '+sailsResponse.err, 'Error');
			return;
		})
		.finally(function eitherWay(){
			$scope.editSettingsForm.loading = false;
		})
	}
}]);
