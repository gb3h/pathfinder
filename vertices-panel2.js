/*global document, window, alert, console, confirm, google, gapi, moment, $, setTimeout*/

//var Sortable, getImageUrl;

function verticesPanel(map, resultObject, listOfLocations) {
    "use strict";
    // Clearing out old buttons just in case (hard update)
    if (document.getElementById('directions-panel')) {
        document.getElementById('directions-panel').childNodes.forEach(function (child) {
            document.getElementById('directions-panel').removeChild(child);
        });
    } else {
        document.createElement('directions-panel');
    }
    map.controls[google.maps.ControlPosition.TOP_CENTER].clear();

    // Create sortable vertices panel.
    console.log(listOfLocations);
    var newUnorderedLocations = [],
        vp = document.createElement('ul');
    vp.setAttribute('id', 'sortable');
    var sortable = new Sortable(vp, {
        animation: 150,
        sort: true,
        onUpdate: function (evt) {
            var i, newOrderedLocations = [],
                listElements = $("#sortable").children();
            console.log(listElements.length);
            console.log(evt.to);
            for (i = 0; i < listElements.length; i += 1) {
                console.log("test " + listElements[i].innerText + " " + listElements[i].getAttribute('place_id'));
                newOrderedLocations.push({
                    name: listElements[i].innerText,
                    place_id: listElements[i].getAttribute('place_id'),
                    formatted_address: listElements[i].getAttribute('formatted_address'),
                    rating: listElements[i].getAttribute('rating'),
                    lat: listElements[i].getAttribute('lat'),
                    lng: listElements[i].getAttribute('lng'),
                    photos: JSON.parse(listElements[i].getAttribute('photos'))
                });
            }
            cleanPath(newOrderedLocations);
            initAutocomplete.callCalculateAndDisplay(newOrderedLocations, false);
        }
    });



    // Create new unorderedlocations .
    resultObject.routes[0].legs.forEach(function (obj, i) {
        listOfLocations.forEach(function (location) {
            if (location.formatted_address === obj.start_address) {
                newUnorderedLocations.push(location);
            } else {
                console.log(location.formatted_address + " VS " +
                    obj.start_address);
                if (location.place_id === resultObject.geocoded_waypoints[i].place_id) {
                    newUnorderedLocations.push(location);
                } else {
                    console.log(location.place_id + "VS" + resultObject.geocoded_waypoints[i].place_id);
                }
            }
        });
    });

    // Create sortable vertices panel.
    newUnorderedLocations.forEach(function (location, i) {
        // Ignore last location(destination) because it is the first location (origin)
        if ((i !== newUnorderedLocations.length) || (i === 0)) {
            var li = document.createElement("li"), // Create a <li> node
                arrow = document.createElement("span"),
                photos = [];
            photos.push(getImageUrl(location));
            li.setAttribute("class", "ui-state-default");
            li.innerHTML = location.name;
            li.setAttribute("formatted_address", location.formatted_address);
            li.setAttribute("place_id", location.place_id);
            li.setAttribute("rating", location.rating);
            li.setAttribute("lat", location.lat);
            li.setAttribute("lng", location.lng);
            li.setAttribute("photos", JSON.stringify(photos));
            arrow.setAttribute("class", "ui-icon ui-icon-arrowthick-2-n-s");
            li.appendChild(arrow);
            vp.appendChild(li);
        }
    });
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(vp);

}