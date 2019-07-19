/*global document, window, alert, console, require, google*/

var updateButtons, Mousetrap, displayImagePanel, hideImagePanel, CalculateButton;
/*
This function adds a selected location to the list 'locations' (stored in the initAutocomplete function).
Whenever a location is added, we also call UpdateButtons.
*/

function AddLocation(controlDiv, map, wrappedLocObj, locations) {
    "use strict";

    // Set CSS for the control border.
    var controlUI = document.createElement('div'),
        controlText = document.createElement('div');

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
    controlUI.addEventListener('click', function () {
        var i;
        if (wrappedLocObj[0] === null) {
            return;
        }
        for (i = 0; i < locations.length; i += 1) {
            if (wrappedLocObj[0].place_id === locations[i].place_id) {
                return;
            }
        }
        locations.push(wrappedLocObj[0]);
        updateButtons(locations, map);
    });

    // Add Keyboard shortcut 'a' to add location button
    Mousetrap.bindGlobal('a', function () {
        controlUI.click();
    });
}

/*
This function creates and adds a button for 'location'.
Whenever a location button is clicked: map is recentered.
Whenever user hovers over a location button: its image panel appears.
It calls ImagePanel and hideImagePanel.
*/
function PlaceButton(controlDiv, map, location, listOfLocations) {
    "use strict";

    //Create close icon and set CSS for it.
    var closeButton = document.createElement('a'),
        controlUI = document.createElement('div'),
        controlText = document.createElement('div');

    closeButton.style.color = '#800000';
    closeButton.style.fontFamily = 'Arial, sans-serif';
    closeButton.style.fontSize = '24px';
    closeButton.style.marginTop = '15px';
    closeButton.style.paddingRight = '35px';
    closeButton.innerHTML = "×";
    controlDiv.appendChild(closeButton);

    // Set CSS for the button background.
    controlUI.style.backgroundColor = '#fff';
    controlUI.style.border = '2px solid #fff';
    controlUI.style.borderRadius = '3px';
    controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
    controlUI.style.cursor = 'pointer';
    controlUI.style.marginTop = '-3px';
    controlUI.style.marginBottom = '1px';
    controlUI.style.textAlign = 'center';
    controlUI.title = 'Click to view place';
    controlUI.draggable = "true";
    controlDiv.appendChild(controlUI);

    // Set CSS for the control interior.
    controlText.style.color = 'rgb(25,25,25)';
    controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
    controlText.style.fontSize = '16px';
    controlText.style.lineHeight = '38px';
    controlText.style.paddingLeft = '10px';
    controlText.style.paddingRight = '8px';
    controlText.innerHTML = location.name;
    controlText.draggable = "true";
    controlUI.appendChild(controlText);

    // Setup the click event listeners: simply set the map to the chosen location.
    controlUI.addEventListener('click', function () {
        console.log(location);
        console.log(location.opening_hours.open_now);
        map.setCenter(location.geometry.location);
    });


    // Setup the mouseover event listeners: display image panel.
    controlUI.addEventListener('mouseover', function () {
        try {
            displayImagePanel(location);
        } catch (e) {
            console.log(e);
        }
    });

    // Setup the mouseout event listeners: make image panel disappear.
    controlUI.addEventListener("mouseout", function () {
        hideImagePanel();
    });

    // Setup the click close listeners: simply remove the location button
    // and its contents.
    closeButton.addEventListener('click', function () {
        var ind = listOfLocations.indexOf(location);
        listOfLocations.splice(ind, 1);
        controlDiv.removeChild(closeButton);
        controlUI.removeChild(controlText);
        controlDiv.removeChild(controlUI);
        updateButtons(listOfLocations, map);
    });
}

/*
This function adds location buttons for each 'location' in listOfLocations
by calling placeButton for each location. It also creates the calculate button
by calling CalculateButton.
*/
function updateButtons(listOfLocations, map) {
    "use strict";
    // Just in case.
    if (listOfLocations.length <= 0) {
        return;
    }

    // Clearing out old buttons just in case (hard update)
    if (document.getElementById('NavButtons')) {
        document.getElementById('NavButtons').childNodes.forEach(function (child) {
            document.getElementById('NavButtons').removeChild(child);
        });
    } else {
        document.createElement('NavButtons');
    }
    if (document.getElementById('CalculateButton')) {
        document.getElementById('CalculateButton').childNodes.forEach(function (child) {
            document.getElementById('CalculateButton').removeChild(child);
        });
    } else {
        document.createElement('CalculateButton');
    }

    // Clearing the control MVC array just in case also.
    map.controls[google.maps.ControlPosition.TOP_CENTER].clear();
    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].clear();

    // Create new locations buttons. For each place in the list of locations,
    // we add a button for it on the RIGHT_CENTER of the map with placeButton.
    var i,
        placeButtonDiv,
        placeButton,
        newButtons = document.createElement('NavButtons'),
        calculateButtons = document.createElement('CalculateButton'),
        calculateButtonDiv = document.createElement('div'),
        calculateButton = new CalculateButton(calculateButtonDiv, listOfLocations);

    for (i = 0; i < listOfLocations.length; i += 1) {
        placeButtonDiv = document.createElement('div');
        newButtons.appendChild(placeButtonDiv);
        placeButton = new PlaceButton(placeButtonDiv, map, listOfLocations[i], listOfLocations);
        map.controls[google.maps.ControlPosition.TOP_CENTER].push(placeButtonDiv);
    }

    // Create calculate button.
    calculateButtons.appendChild(calculateButtonDiv);
    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(calculateButtonDiv);
}