angular.module('HomepageModule').controller('LoginController', ['$scope', '$http', 'toastr', function($scope, $http, toastr){

	// set-up loginForm loading state
	$scope.loginForm = {
		loading: false
	}

	$scope.submitLoginForm = function (){

    // Set the loading state (i.e. show loading spinner)
    $scope.loginForm.loading = true;

    //CSRF header
    $http.defaults.headers.put['X-CSRF-Token']=document.getElementsByName('_csrf')[0].value;

    // Submit request to Sails.
    $http.put('/login', {
      email: $scope.loginForm.email,
      password: $scope.loginForm.password
    })
    .then(function onSuccess (){
      // Refresh the page now that we've been logged in.
      window.location = '/';
    })
    .catch(function onError(sailsResponse) {

      // Handle known error type(s).
      // Invalid username / password combination.
      if (sailsResponse.status === 400 || 404) {
        // $scope.loginForm.topLevelErrorMessage = 'Invalid email/password combination.';
        //
        toastr.error('Invalid email/password combination.', 'Error', {
          closeButton: true
        });
        return;
      }

				toastr.error('An unexpected error occurred, please try again.', 'Error', {
					closeButton: true
				});
				return;

    })
    .finally(function eitherCase(){
      $scope.loginForm.loading = false;
    });
  };


}]);
