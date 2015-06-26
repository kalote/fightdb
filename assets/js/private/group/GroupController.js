angular.module('GroupModule').controller('GroupController', ['$scope', '$http', 'toastr', function($scope, $http, toastr){
  // set-up loading state
  $scope.submitGroup = {
    loading: false,
    group: []
  };

  $scope.addGroup = function(groupId){
    if ($scope.submitGroup.group.indexOf(groupId)>-1) {
      $scope.submitGroup.group.splice($scope.submitGroup.group.indexOf(groupId), 1);
      $("#group"+groupId).removeClass("alert-success").addClass("alert-info");
    } else {
      $scope.submitGroup.group.push(groupId);
      $("#group"+groupId).removeClass("alert-info").addClass("alert-success");
    }
    //CSRF header
    $http.defaults.headers.post['X-CSRF-Token']=$('input[name=_csrf]').val();

    // Submit request to Sails.
    $http.post('/group/updategroup', {userId: $scope.submitGroup.userId, groupId: groupId}, {
      withCredentials: true
    })
    .then(function (data) {
      console.log(data);
      toastr.success("Group successfully added !", "Success");
    })
    .catch(function (data) {
      console.log(data);
      toastr.error("An error occured: "+data.err, "Error");
    })
    .finally(function eitherWay() {
      console.log("ok");
    })
  };

  $scope.submitGroupForm = function(){

    // Set the loading state (i.e. show loading spinner)
    $scope.submitGroup.loading = true;

    //CSRF header
    $http.defaults.headers.post['X-CSRF-Token']=$('input[name=_csrf]').val();

    // Submit request to Sails.
    $http.post('/group/update/'+$scope.submitGroup.userId, $scope.submitGroup, {
      withCredentials: true
    })
    .then(function onSuccess(sailsResponse){
      if ($('input[name=setup]').val() === "3")
        window.location = '/';
      else
        window.location = '/group/find/'+sailsResponse.data.id;
    })
    .catch(function onError(sailsResponse){
      toastr.error('An error occured: '+sailsResponse.err, 'Error');
      return;
    })
    .finally(function eitherWay(){
      $scope.submitGroup.loading = false;
    })
  };
}]);
