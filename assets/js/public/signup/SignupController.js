angular.module('SignupModule').controller('SignupController', ['$scope', '$http', 'toastr', function($scope, $http, toastr){

	// set-up loading state
	$scope.signupForm = {
		loading: false
	}

	$scope.submitSignupForm = function(){

		// Set the loading state (i.e. show loading spinner)
		$scope.signupForm.loading = true;

		//CSRF header
		$http.defaults.headers.post['X-CSRF-Token']=document.getElementsByName('_csrf')[0].value;
		
		// Submit request to Sails.
		$http.post('/signup', {
			name: $scope.signupForm.name,
			nickname: $scope.signupForm.nickname,
			email: $scope.signupForm.email,
			password: $scope.signupForm.password
		}, {
			withCredentials: true
		})
		.then(function onSuccess(sailsResponse){
			window.location = '/';
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
			$scope.signupForm.loading = false;
		})
	}

}]);
