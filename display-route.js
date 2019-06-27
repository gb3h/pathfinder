function CalculateButton(controlDiv, map, listOfLocations, directionsService, directionsDisplay) {
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
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior.
  var controlText = document.createElement('div');
  controlText.style.color = 'rgb(25,25,25)';
  controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
  controlText.style.fontSize = '16px';
  controlText.style.lineHeight = '38px';
  controlText.style.paddingLeft = '10px';
  controlText.style.paddingRight = '8px';
  controlText.innerHTML = 'Calculate!';
  controlUI.appendChild(controlText);

  // Setup the click event listeners: simply set the map to the chosen location.
  controlUI.addEventListener('click', function() {
    calculateAndDisplayRoute(directionsService, directionsDisplay, listOfLocations);
  });
}

function calculateAndDisplayRoute(directionsService, directionsDisplay, listOfLocations) {
  
  var waypts = [];
  for (var i = 1; i < listOfLocations.length; i++) {
    waypts.push({
      location: {'placeId': listOfLocations[i].place_id},
      stopover: true
    });
  }

  directionsService.route({
    origin: {'placeId': listOfLocations[0].place_id},

    destination: {'placeId': listOfLocations[0].place_id},

    waypoints: waypts,

    optimizeWaypoints: true,
    travelMode: 'DRIVING'
  }, function(response, status) {
    if (status === 'OK') {
      directionsDisplay.setDirections(response);
      var route = response.routes[0];
      var summaryPanel = document.getElementById('directions-panel');
      // summaryPanel.innerHTML = '';
      // For each route, display summary information.
      for (var i = 0; i < route.legs.length; i++) {
        var routeSegment = i + 1;
        summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment +
            '</b><br>';
        summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
        summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
        summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
      }
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });

}
