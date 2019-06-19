/*
This adds a search box to a map, using the Google Place Autocomplete
feature. People can enter their places of interest. The search box will return a
suggestions dropbar containing a mix of places and predicted search terms.
*/

function initAutocomplete() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 1.352083, lng: 103.819839}, //Singapore-centered
    zoom: 3,
    maxZoom: 6,
    minZoom: 3,
    mapTypeId: 'roadmap',
    disableDefaultUI: true,
    gestureHandling: 'greedy',
    mapTypeControlOptions: {
      mapTypeIds: []
    },
    styles: [
      {
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#1d2c4d"
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#8ec3b9"
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#1a3646"
          }
        ]
      },
      {
        "featureType": "administrative.country",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#4b6878"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#64779e"
          }
        ]
      },
      {
        "featureType": "administrative.neighborhood",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "administrative.province",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#4b6878"
          }
        ]
      },
      {
        "featureType": "landscape.man_made",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#334e87"
          }
        ]
      },
      {
        "featureType": "landscape.natural",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#023e58"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#283d6a"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#6f9ba5"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#1d2c4d"
          }
        ]
      },
      {
        "featureType": "poi.attraction",
        "elementType": "labels",
        "stylers": [
          {
            "visibility": "simplified"
          }
        ]
      },
      {
        "featureType": "poi.attraction",
        "elementType": "labels.text",
        "stylers": [
          {
            "visibility": "simplified"
          }
        ]
      },
      {
        "featureType": "poi.business",
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
            "color": "#023e58"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#3C7680"
          }
        ]
      },
      {
        "featureType": "road",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#304a7d"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#98a5be"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#1d2c4d"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#2c6675"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#255763"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#b0d5ce"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#023e58"
          }
        ]
      },
      {
        "featureType": "transit",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "transit",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#98a5be"
          }
        ]
      },
      {
        "featureType": "transit",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#1d2c4d"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#283d6a"
          }
        ]
      },
      {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#3a4762"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#0e1626"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#4e6d70"
          }
        ]
      }
    ]
  });
  // Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(input);

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

  // Persitant variables
var allowedBounds;  // assign something here
var lastValidCenter;  // initialize this using map.getCenter()   

function checkBounds() {  // when bounds changes due to resizing or zooming in/out

    var currentBounds = map.getBounds();
    if (currentBounds == null) return;

      var allowed_ne_lng = allowedBounds.getNorthEast().lng();
      var allowed_ne_lat = allowedBounds.getNorthEast().lat();
      var allowed_sw_lng = allowedBounds.getSouthWest().lng();
      var allowed_sw_lat = allowedBounds.getSouthWest().lat();

    var wrap;
    var cc = map.getCenter();
    var centerH = false;
    var centerV = false;

    // Check horizontal wraps and offsets
    if ( currentBounds.toSpan().lng() > allowedBounds.toSpan().lng() ) {
        centerH = true;
    }
    else {  // test positive and negative wrap respectively
        wrap = currentBounds.getNorthEast().lng() < cc.lng();
        var current_ne_lng = !wrap ?   currentBounds.getNorthEast().lng()  : allowed_ne_lng +(currentBounds.getNorthEast().lng() + 180 )  + (180 - allowed_ne_lng);
        wrap = currentBounds.getSouthWest().lng() > cc.lng();
        var current_sw_lng = !wrap ?  currentBounds.getSouthWest().lng() : allowed_sw_lng - (180-currentBounds.getSouthWest().lng()) - (allowed_sw_lng+180);
    }


    // Check vertical wraps and offsets
    if ( currentBounds.toSpan().lat() > allowedBounds.toSpan().lat() ) {
        centerV = true;
    }
    else { // test positive and negative wrap respectively
    wrap = currentBounds.getNorthEast().lat()   < cc.lat();    if (wrap) { alert("WRAp detected top") } // else alert("no wrap:"+currentBounds); wrap = false;
      var current_ne_lat =  !wrap ? currentBounds.getNorthEast().lat()  : allowed_ne_lat + (currentBounds.getNorthEast().lat() +90) + (90 - allowed_ne_lat);
      wrap = currentBounds.getSouthWest().lat() > cc.lat();  if (wrap) { alert("WRAp detected btm") } //alert("no wrap:"+currentBounds);
      var current_sw_lat = !wrap ?  currentBounds.getSouthWest().lat() : allowed_sw_lat - (90-currentBounds.getSouthWest().lat()) - (allowed_sw_lat+90);
    }


      // Finalise positions
      var centerX = cc.lng();
      var centerY = cc.lat();
     if (!centerH) {
        if (current_ne_lng > allowed_ne_lng) centerX -= current_ne_lng-allowed_ne_lng;
        if (current_sw_lng < allowed_sw_lng) centerX += allowed_sw_lng-current_sw_lng;
     }
     else {
         centerX = allowedBounds.getCenter().lng();
     }

     if (!centerV) {
       if (current_ne_lat > allowed_ne_lat) {
           centerY -= (current_ne_lat-allowed_ne_lat) * 3;  // approximation magic numbeer. Adjust as u see fit, or use a more accruate pixel measurement.
       }
       if (current_sw_lat < allowed_sw_lat) {
           centerY += (allowed_sw_lat-current_sw_lat)*2.8;  // approximation magic number
       }
     }
     else {
        centerY = allowedBounds.getCenter().lat();
     }
     map.setCenter(lastValidCenter = new google.maps.LatLng(centerY,centerX));


     
}


function limitBound(bound) // Occurs during dragging, pass allowedBounds to this function in most cases. Requires persistant 'lastValidCenter=map.getCenter()' var reference.
     {
        var mapBounds = map.getBounds();

         if (mapBounds.getNorthEast().lng() >=  mapBounds.getSouthWest().lng() && mapBounds.getNorthEast().lat()  >= mapBounds.getSouthWest().lat()  // ensure no left/right, top/bottom wrapping
            && bound.getNorthEast().lat() > mapBounds.getNorthEast().lat()  // top
            && bound.getNorthEast().lng() > mapBounds.getNorthEast().lng() // right
            && bound.getSouthWest().lat() < mapBounds.getSouthWest().lat() // bottom
            && bound.getSouthWest().lng() < mapBounds.getSouthWest().lng()) // left
            {
                lastValidCenter=map.getCenter();  // valid case, set up new valid center location
            }

        //   if (bound.contains(map.getCenter()))
        // {
                map.panTo(lastValidCenter);
             //  }

         }





  /*
  
  var map;
  function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 1.352083, lng: 103.819839},
      zoom: 8
    });
    var geocoder = new google.maps.Geocoder();

    document.getElementById('submit').addEventListener('click', function() {
      geocodeAddress(geocoder, map);
    });
  }

  function geocodeAddress(geocoder, resultsMap) {
    var address = document.getElementById('address').value;
    geocoder.geocode({'address': address}, function(results, status) {
      if (status === 'OK') {
        resultsMap.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }
  */
