/*
This function adds a selected location to the list 'locations' (stored in the initAutocomplete function).
Whenever a location is added, we also call UpdateButtons.
*/

function AddLocation(controlDiv, map, wrappedLocObj, locations, directionsService, directionsDisplay) {
  // Set CSS for the control border.
  var controlUI = document.createElement('div');
  controlUI.style.backgroundColor = '#fff';
  controlUI.style.border = '2px solid #fff';
  controlUI.style.borderRadius = '0px 15px 15px 0px';
  controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
  controlUI.style.cursor = 'pointer';
  controlUI.style.marginBottom = '40px';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'Click to add selected place';
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior.
  var controlText = document.createElement('div');
  controlText.style.color = 'rgb(25,25,25)';
  controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
  controlText.style.fontSize = '16px';
  controlText.style.lineHeight = '40px';
  controlText.style.paddingLeft = '5px';
  controlText.style.paddingRight = '5px';
  controlText.innerHTML = 'Add'; //Add button to add location buttons by the side
  controlUI.appendChild(controlText);

  // Setup the click event listeners: on click we check if the temp obj is already in our list of locations.
  // If not, we add it to the list of locations and call UpdateButtons to add a button.
  controlUI.addEventListener('click', function() {
    if (wrappedLocObj[0] == null) {
      return;
    }
    for (var i = 0; i < locations.length; i++) {
      if (wrappedLocObj[0].place_id == locations[i].place_id) {
        return;
      }
    }
    locations.push(wrappedLocObj[0]);
    UpdateButtons(locations, map, directionsService, directionsDisplay);
  });

}

function PlaceButton(controlDiv, map, location, listOfLocations, directionsService, directionsDisplay) {
  //Create close icon and set CSS for it.
  var closeButton = document.createElement('a');
  closeButton.style.color = '	#800000';
  closeButton.style.fontFamily = 'Arial, sans-serif';
  closeButton.style.fontSize = '24px';
  closeButton.style.marginTop = '15px';
  closeButton.style.paddingRight = '35px';
  closeButton.innerHTML = "×";
  controlDiv.appendChild(closeButton);

  // Set CSS for the button background.
  var controlUI = document.createElement('div');
  controlUI.style.backgroundColor = '#fff';
  controlUI.style.border = '2px solid #fff';
  controlUI.style.borderRadius = '3px';
  controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
  controlUI.style.cursor = 'pointer';
  controlUI.style.marginTop = '-3px';
  controlUI.style.marginBottom = '1px';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'Click to view place';
  controlUI.draggable="true";
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior.
  var controlText = document.createElement('div');
  controlText.style.color = 'rgb(25,25,25)';
  controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
  controlText.style.fontSize = '16px';
  controlText.style.lineHeight = '38px';
  controlText.style.paddingLeft = '10px';
  controlText.style.paddingRight = '8px';
  controlText.innerHTML = location.name;
  controlText.draggable="true";
  controlUI.appendChild(controlText);

  // Setup the click event listeners: simply set the map to the chosen location.
  controlUI.addEventListener('click', function() {
    console.log(location.place_id);
    map.setCenter(location.geometry.location);
  });

  // Setup the click close listeners: simply remove the location button
  // and its contents.
  closeButton.addEventListener('click', function() {
    var ind = listOfLocations.indexOf(location);
    listOfLocations.splice(ind, 1);
    controlDiv.removeChild(closeButton);
    controlUI.removeChild(controlText);
    controlDiv.removeChild(controlUI);
    UpdateButtons(listOfLocations, map, directionsService, directionsDisplay);
  });
}

function UpdateButtons(listOfLocations, map, directionsService, directionsDisplay) {
  savePath(directionsService, directionsDisplay, listOfLocations);
  // Just in case.
  if (listOfLocations.length <= 0) {
    return;
  }

  // Clearing out old buttons just in case (hard update)
  if (document.getElementById('NavButtons')) {
    document.getElementById('NavButtons').childNodes.forEach(function(child){
      document.getElementById('NavButtons').removeChild(child);
    })
  } else {
    document.createElement('NavButtons');
  }
  if (document.getElementById('CalculateButton')) {
    document.getElementById('CalculateButton').childNodes.forEach(function(child){
      document.getElementById('CalculateButton').removeChild(child);
    })
  } else {
    document.createElement('CalculateButton');
  }
  var newButtons = document.createElement('NavButtons');
  var calculateButtons = document.createElement('CalculateButton');

  // Clearing the control MVC array just in case also.
  map.controls[google.maps.ControlPosition.TOP_CENTER].clear();
  map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].clear();

  // For each place in the list of locations, we add a button for it on the RIGHT_CENTER of the map.
  for (var i = 0; i < listOfLocations.length; i++) {
    var placeButtonDiv = document.createElement('div');
    newButtons.appendChild(placeButtonDiv);
    var placeButton = new PlaceButton(placeButtonDiv, map, listOfLocations[i], listOfLocations, directionsService, directionsDisplay);
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(placeButtonDiv);
  }

  var calculateButtonDiv = document.createElement('div');
  calculateButtons.appendChild(calculateButtonDiv);
  var calculateButton = new CalculateButton(calculateButtonDiv, map, listOfLocations, directionsService, directionsDisplay);
  map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(calculateButtonDiv);
}
