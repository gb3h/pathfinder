function route1() {
  console.log("Loading route 1.....");
  window.location.href = '#';
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
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
  var locations = [{name: "Four Seasons Hotel Singapore", place_id: "ChIJqbrxYIwZ2jERV9rTVcsl1Lk"},
  {name: "Singapore Art Museum", place_id: "ChIJW8o1nqQZ2jERynZN2M1BODM"},
  {name: "Marina Bay Sands", place_id: "ChIJnWdQKQQZ2jER8tbowGy5nn4"},
  {name: "East Coast Park", place_id: "ChIJ0QX_Brki2jER-pZKNdqk_a8"}
    ];
  directionsDisplay.setMap(map);
  UpdateButtons(locations, map, directionsService, directionsDisplay);
  calculateAndDisplayRoute(directionsService, directionsDisplay, locations);
};

function route2() {
  console.log("Loading route 2.....");
  window.location.href = '#';
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
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
  directionsDisplay.setMap(map);
  var locations = [{name: "Westgate", place_id: "ChIJ82AoVA8Q2jERkHnr1RPW9B4"},
  {name: "Jurong East", place_id: "ChIJL52pCg8Q2jERgiWsODe3X9I"}];
  directionsDisplay.setMap(map);
  UpdateButtons(locations, map, directionsService, directionsDisplay);
  calculateAndDisplayRoute(directionsService, directionsDisplay,locations);
};

function route3() {
  console.log("Loading route 3.....");
  window.location.href = '#';
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
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
  var locations = [{name: "Westgate", place_id: "ChIJ82AoVA8Q2jERkHnr1RPW9B4"},
  {name: "Jurong East", place_id: "ChIJL52pCg8Q2jERgiWsODe3X9I"}];
  directionsDisplay.setMap(map);
  UpdateButtons(locations, map, directionsService, directionsDisplay);
  calculateAndDisplayRoute(directionsService, directionsDisplay,locations);
};
