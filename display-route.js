function CalculateButton(controlDiv, map, listOfLocations) {
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
    initAutocomplete.callCalculateAndDisplay(listOfLocations, true);
    initAutocomplete.callVerticesPanel(listOfLocations);
    cleanPath(listOfLocations);
    //var g = generateGraph(listOfLocations, directionsService);
    //var msp = prims(matrix);
  });
}

// function generateGraph(listOfLocations, directionsService) {
//   var matrix = [];
//   const graph = new graphlib.Graph();
//   for (var i = 0; i < listOfLocations.length; i++){
//     matrix[i] = [];
//     for (var j = 0; j < listOfLocations.length; j++) {
//       if (i == j) {
//         matrix[i][j] = -1;
//       } else {
//         const x = (calcRoute({'placeId': listOfLocations[i].place_id},
//         {'placeId': listOfLocations[j].place_id}, "TRANSIT", directionsService));
//         matrix[i][j] = x;
//         console.log(x);
//         console.log(x[0]);
//         console.log(x[0].routes);
//         console.log(x[0].routes[0]);
//         graph.setEdge(listOfLocations[i].name, listOfLocations[j].name, {duration: x.routes[0].legs[0].duration});
//       }
//     }
//   }
//   graph.nodes();
//   graph.edges();
//   return [matrix, graph];
// }


// function calcRoute(start, end, mode, directionsService) {
//   const answer = {};
//   var request = {
//     origin: start,
//     destination: end,
//     travelMode: mode
//   };
//   directionsService.route(request, function(result, status) {
//     if (status == 'OK') {
//       Object.assign(answer, result);
//     } else {
//       Object.assign(answer, {"legs": [{"duration": 9999}]});
//     }
//   });
//   console.log(answer.routes);
//   return [answer];
// }

function calculateAndDisplayRoute(directionsService, directionsDisplay, listOfLocations, mode) {
  var result = {};
  var waypts = [];
  var graphObj = {};
  for (var i = 1; i < listOfLocations.length; i++) {
    waypts.push({
      location: {'placeId': listOfLocations[i].place_id},
      stopover: true
    });
  }
  var summaryPanel = document.getElementById('directions-panel');
  // Clear old data when func called.
  while (summaryPanel.firstChild) {
    summaryPanel.removeChild(summaryPanel.firstChild);
  }
  directionsService.route({
    origin: {'placeId': listOfLocations[0].place_id},

    destination: {'placeId': listOfLocations[0].place_id},

    waypoints: waypts,

    optimizeWaypoints: mode,
    travelMode: 'DRIVING'
  }, function(response, status) {
    if (status === 'OK') {
      initAutocomplete.setResult(JSON.parse(JSON.stringify(response)));
      directionsDisplay.setDirections(response);
      var route = response.routes[0];
      var summaryPanel = document.getElementById('directions-panel');
      // Clear old data when func called.
      summaryPanel.style.visibility = "visible";
      // For each route, display summary information.
      for (var i = 0; i < route.legs.length; i++) {
        var slide = document.createElement('div');
        slide.className = "slide";
        summaryPanel.appendChild(slide);
        var routeSegment = i + 1;
        slide.innerHTML += '<b>Route Segment: ' + routeSegment +
            '</b><br>';
        slide.innerHTML += route.legs[i].start_address + ' to ';
        slide.innerHTML += route.legs[i].end_address + '<br>';
        slide.innerHTML += route.legs[i].distance.text + '<br><br>';
      }
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}
