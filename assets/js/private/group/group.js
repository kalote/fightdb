var notLoading = $(".groupSubmit").html(),
    group = [],
    userId = $("input[name=userId]").val();

function addGroup(groupId){
  if (group.indexOf(groupId)>-1) {
    group.splice(group.indexOf(groupId), 1);
    $("#group"+groupId).removeClass("alert-success").addClass("alert-info");
  } else {
    group.push(groupId);
    $("#group"+groupId).removeClass("alert-info").addClass("alert-success");
  }

  //CSRF header
  $.ajax({
    headers: {
      "X-CSRF-Token": $("input[name=_csrf]").val()
    },
    xhrFields: {
      withCredentials: true
    },
    url: "/group/updategroup",
    method: "POST",
    data: {
      userId: userId,
      groupId: groupId
    }
  }).done(function (){
    toastr.success("Group successfully added !", "Success");
  }).fail(function onError(sailsResponse){
    toastr.error("An error occured: "+sailsResponse.err, "Error");
  });
}

$(function(){
  //form submission
  $("#edit-group-form").on("submit", function(e){
    e.preventDefault();
    //Set the loading state (i.e. show loading spinner)
    $(".groupSubmit").html("<span class='fa fa-spinner'></span>&nbsp;<span>Saving your group settings...</span>");
    //CSRF header
    $.ajax({
      headers: {
        "X-CSRF-Token": $("input[name=_csrf]").val()
      },
      xhrFields: {
        withCredentials: true
      },
      url: "/group/update/"+userId,
      method: "POST",
      data: $(this).serializeObject()
    }).done(function (sailsResponse){
      if ($('input[name=setup]').val() === "3")
        window.location = '/';
      else
        window.location = '/group/find/'+sailsResponse.id;
    }).fail(function onError(sailsResponse){
      toastr.error('An error occured: '+sailsResponse.err, 'Error');
    }).always(function (){
      $(".groupSubmit").html(notLoading);
    });
  });
});
