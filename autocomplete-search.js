/*global document, window, alert, console, require, google*/

var AddLocation, CalculateButton, calculateAndDisplayRoute, updateButtons, verticesPanel;
/*
This adds a search box to a map, using the Google Place Autocomplete
feature. People can enter their places of interest. The search box will return a
suggestions dropbar containing a mix of places and predicted search terms.
Used in: CalculateButton, calculateAndDisplayRoute, createList, verticesPanel
*/
function initAutocomplete() {
    "use strict";
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
            styles: [
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
        }),

        directionsService = new google.maps.DirectionsService(),
        directionsDisplay = new google.maps.DirectionsRenderer(),

        //Create the search box and link it to the UI element.
        input = document.getElementById('pac-input'),
        searchBox = new google.maps.places.SearchBox(input),

        //Other variables: markers, temp - wrappedLocObj, locations, etc
        result = {},
        markers = [],
        temp = [null],
        locations = [],
        addLocationDiv = document.createElement('div'),
        addLocation = new AddLocation(addLocationDiv, map, temp, locations),

        //Variables: strictBounds, lastValidCenter
        strictBounds = new google.maps.LatLngBounds(
            new google.maps.LatLng(85, -180),           // top left corner of map
            new google.maps.LatLng(-85, 180)          // bottom right corner
        ),
        lastValidCenter = map.getCenter();

    directionsDisplay.setMap(map);
    map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(input);
    map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(addLocationDiv);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function () {
        searchBox.setBounds(map.getBounds());
    });

    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function () {
        var places = searchBox.getPlaces(),
            bounds = new google.maps.LatLngBounds();

        if (places.length === 0) {
            return;
        }

        // Clear out the old markers.
        markers.forEach(function (marker) {
            marker.setMap(null);
        });
        markers = [];

        // For each place, get the icon, name and location.

        places.forEach(function (place) {
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
        if (places.length === 1) {
            temp[0] = places[0];
        }
    });

    // Listen for the dragend event
    google.maps.event.addListener(map, 'center_changed', function () {
        if (strictBounds.contains(map.getCenter())) {
            lastValidCenter = map.getCenter();
        }
        var c = map.getCenter(),
            y = c.lat(),
            //maxX = strictBounds.getNorthEast().lng(),
            minY = strictBounds.getNorthEast().lat(),
            //minX = strictBounds.getSouthWest().lng(),
            maxY = strictBounds.getSouthWest().lat();

        // not valid anymore => return to last valid position
        if (y < minY || y > maxY) {
            map.panTo(lastValidCenter);
        } else {
            lastValidCenter = map.getCenter();
        }
    });

    // Nested functions in initAutocomplete below
    function callCalculateAndDisplay(listOfLocations) {
        return calculateAndDisplayRoute(directionsService, directionsDisplay, listOfLocations);
    }

    // Update button function called when loading a saved path
    function callUpdateButtons(listOfLocations) {

        // Remove current 'Add' controls at bottom center of map
        map.controls[google.maps.ControlPosition.BOTTOM_CENTER].removeAt(1);

        // Create new addLocationDiv to erase existing location buttons behind the scenes
        var newaddLocationDiv = document.createElement('div');
        temp = [null];
        addLocation = new AddLocation(newaddLocationDiv, map, temp, listOfLocations);
        map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(newaddLocationDiv);

        // Update buttons for the locations in the saved paths only
        updateButtons(listOfLocations, map);
    }

    function callVerticesPanel(listOfLocations) {
        verticesPanel(map, listOfLocations);
    }

    function initCalculateButton(calculateButtonDiv, map, listOfLocations) {
        return new CalculateButton(calculateButtonDiv, map, listOfLocations);
    }

    function setResult(response) {
        result = response;
        console.log(result);
    }

    initAutocomplete.callCalculateAndDisplay = callCalculateAndDisplay;
    initAutocomplete.callUpdateButtons = callUpdateButtons;
    initAutocomplete.callVerticesPanel = callVerticesPanel;
    initAutocomplete.initCalculateButton = initCalculateButton;
    initAutocomplete.setResult = setResult;
}
