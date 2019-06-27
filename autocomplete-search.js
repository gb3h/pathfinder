

/*
This adds a search box to a map, using the Google Place Autocomplete
feature. People can enter their places of interest. The search box will return a
suggestions dropbar containing a mix of places and predicted search terms.
*/


function initAutocomplete() {
  var map = new google.maps.Map(document.getElementById('map'), {
    backgroundColor: "#0099dd",
    center: {lat: 1.352083, lng: 103.819839}, //Singapore-centered
    zoom: 3,
    maxZoom: 15,
    minZoom: 3,
    mapTypeId: 'roadmap',
    disableDefaultUI: true,
    gestureHandling: 'greedy',
    mapTypeControlOptions: {
      mapTypeIds: []
    },
    styles:[
      {
          "stylers": [
              {
                  "saturation": -100
              }
          ]
      },
      {
          "featureType": "water",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#0099dd"
              }
          ]
      },
      {
          "elementType": "labels",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "poi.park",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#aadd55"
              }
          ]
      },
      {
          "featureType": "road.highway",
          "elementType": "labels",
          "stylers": [
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "road.arterial",
          "elementType": "labels.text",
          "stylers": [
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "road.local",
          "elementType": "labels.text",
          "stylers": [
              {
                  "visibility": "on"
              }
          ]
      },
      {}
  ]
  });

  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  directionsDisplay.setMap(map);

  //Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(input);

  //Other variables: temp - wrappedLocObj, locations - list of locations, etc.
  var temp = [null];
  var locations = [];
  var addLocationDiv = document.createElement('div');

  var addLocation = new AddLocation(addLocationDiv, map, temp, locations, directionsService, directionsDisplay);
  map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(addLocationDiv);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  var markers = [];

  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();
    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      markers.push(new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location
      }));

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);

    // Whenever we perform a search, if the search returns a unique place, add that place to a wrapped temp object.
    // This wrapped temp object will be passed to the AddLocation function button if the button is clicked.
    if (places.length == 1) {
      temp[0] = places[0];
      //temp[0] = {lat: places[0].geometry.location.lat(), lng: places[0].geometry.location.lng()};
    }
  });

  var strictBounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(85, -180),           // top left corner of map
    new google.maps.LatLng(-85, 180)          // bottom right corner
  );

  var lastValidCenter = map.getCenter();
  // Listen for the dragend event
  google.maps.event.addListener(map, 'center_changed', function() {
    if (strictBounds.contains(map.getCenter())) lastValidCenter = map.getCenter();
    var c = map.getCenter(),
    //x = c.lng(),
    y = c.lat(),
    //maxX = strictBounds.getNorthEast().lng(),
    minY = strictBounds.getNorthEast().lat(),
    //minX = strictBounds.getSouthWest().lng(),
    maxY = strictBounds.getSouthWest().lat();
    // not valid anymore => return to last valid position
    if (y < minY || y > maxY)
      map.panTo(lastValidCenter);
    else
      lastValidCenter = map.getCenter();
  });

}
