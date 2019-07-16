var locations = [];

function cleanPath(listOfLocations){
  locations = []; //refresh everytime the path is updated
  listOfLocations.forEach(function(location){
      locations.push({
        name: location.name,
        place_id: location.place_id
      });
  });
}

function savePath(){
  if(gapi.auth2.getAuthInstance().isSignedIn.get()){
    $.ajax({
       type: "POST",
       data: {locations: locations},
       url: "save-path",
    }).done(function(data){
         console.log(data);
         window.location.href = '#';
    });
    notify("Save");
  } else {
      document.getElementById("save").setAttribute("href", "#popup1");
  }
}

function updatePath(path_id){
    $.ajax({
       type: "POST",
       data: {_id: path_id, locations: locations},
       url: "update-path",
    }).done(function(data){
         console.log(data);
         window.location.href = '#';
    });
    notify("Update");
}

function notify(process){
  var title = "Successful " + process;
  var description = JSON.stringify(locations, ['name']);
  var type = "success";
  console.log("Saving in progress...");
  if (locations == undefined || locations.length <= 0){
      title = process + " failed, no locations entered";
      description = "Please try again"
      type = "error";
      console.log(locations);
  } else {}
  GrowlNotification.notify({
    title: title,
    description: description,
    image: {
      visible: true,
      customImage: ''
    },
    closeTimeout: 3000,
    type: type,
    closeWith: ['click', 'button'],
    animationDuration: .5,
    position: 'top-center'

});
}
