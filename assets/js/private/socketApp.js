$(document).ready(function(){
  io.socket.on("group", function(obj){
    console.log(obj);
  });
})
