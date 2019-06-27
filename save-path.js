//Stored variable
var locations = [];

function savePath(directionsService, directionsDisplay, listOfLocations) {
  for (var i = 0; i < listOfLocations; i++) {
    locations.push(listOfLocations[i]);
    console.log(locations[i].place_id);
  }
}

function savePath(){
  for (var i = 1; i < locations.length; i++) {
    console.log(locations[i].place_id);
  }
}
