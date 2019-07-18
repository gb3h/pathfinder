/*global document, window, alert, console, confirm, google, gapi, moment, $, setTimeout*/

var Sortable, cleanPath, initAutocomplete;

function verticesPanel(map, listOfLocations) {
    "use strict";
    // Clearing out old buttons just in case (hard update)
    if (document.getElementById('VerticesPanel')) {
        document.getElementById('VerticesPanel').childNodes.forEach(function (child) {
            document.getElementById('VerticesPanel').removeChild(child);
        });
    } else {
        document.createElement('VerticesPanel');
    }
    map.controls[google.maps.ControlPosition.TOP_CENTER].clear();

    // Create vertices panel.
    var vp = document.createElement('ul'),
        sortable = new Sortable(vp, {
            animation: 150,
            filter: '.filtered',
            onUpdate: function () {
                var i, newOrderedLocations = [],
                    listElements = $("#sortable").children();
                console.log(listElements.length);
                for (i = 0; i < listElements.length; i += 1) {
                    console.log(listElements[i].innerText + " " + listElements[i].getAttribute('place_id'));
                    newOrderedLocations.push({
                        name: listElements[i].innerText,
                        place_id: listElements[i].getAttribute('place_id')
                    });
                }
                cleanPath(newOrderedLocations);
                initAutocomplete.callCalculateAndDisplay(newOrderedLocations, false);
            }
        });

    vp.setAttribute('id', 'sortable');
    listOfLocations.forEach(function (location) {
        var li = document.createElement("li"),                  // Create a <li> node
            arrow = document.createElement("span");
        li.setAttribute("class", "ui-state-default");
        li.innerHTML = location.name;
        li.setAttribute("place_id", location.place_id);

        arrow.setAttribute("class", "ui-icon ui-icon-arrowthick-2-n-s");
        li.appendChild(arrow);
        vp.appendChild(li);
    });
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(vp);
}
