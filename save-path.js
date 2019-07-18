/*global document, window, alert, console, require, google, gapi, moment, $*/
/*jslint nomen: true */
var locations = [], GrowlNotification, Mousetrap;

// Cleans location photos to give correct format
function cleanPhotos(location) {
    "use strict";
    var photourls = [];
    if (location.photos !== undefined) {

        // Checks if location photos is in the correct format before returning
        if ((location.photos[0] instanceof Array) || typeof location.photos[0] === "string") {
            return location.photos;
        }

        // Incorrect format, reformatting here
        console.log(location.photos);
        location.photos.forEach(function (photo) {
            if (photo !== undefined) {
                photourls.push(photo.getUrl());
            }
        });
        return photourls;

    }
}

// Cleans location opening_hours to give correct format
function cleanOperatingHours(location) {
    "use strict";
    if (location.opening_hours !== undefined) {

        // Formats location opening_hours
        var specific_opening_hours = [];
        location.opening_hours.weekday_text.forEach(function (day) {
            specific_opening_hours.push(day);
        });
        console.log("Opening hours present");
        return specific_opening_hours;
    }

    // No operating_hours field in place object
    console.log("Undefined opening hours");
    return [null];
}

// Cleans path to give correct format
// Called whenever calculate button is clicked
function cleanPath(listOfLocations) {
    "use strict";
    // Refresh everytime the path is updated
    locations = [];

    // Format the path properly
    listOfLocations.forEach(function (location) {
        locations.push({
            name: location.name,
            place_id: location.place_id,
            photos: cleanPhotos(location),
            rating: location.rating,
            opening_hours: {
                weekday_text: cleanOperatingHours(location)
            }
        });
    });
}

// Notify users if the save/update has failed/ succeeded
function notify(process) {
    "use strict";
    var type = "success",
        title = "Successful " + process,
        description = JSON.stringify(locations, ['name']);

    console.log("Saving in progress...");
    if (locations === undefined || locations.length <= 0) {
        title = process + " failed, no locations entered";
        description = "Please try again";
        type = "error";
    }
    GrowlNotification.notify({
        title: title,
        description: description,
        image: {
            visible: true,
            customImage: ''
        },
        closeTimeout: 3000,
        type: type,
        closeWith: ['click', 'button'],
        animationDuration: 0.5,
        position: 'top-center'
    });
}

// Sends path location details to save-path
function savePath() {
    "use strict";
    // Checks if user is signed in
    if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
        $.ajax({
            type: "POST",
            data: {locations: locations},
            url: "save-path"
        }).done(function () {
            window.location.href = '#';
        });
        notify("Save");
    } else {

        // Not signed in, trigger sign-in popup
        document.getElementById("save").setAttribute("href", "#popup1");
    }
}

// Sends path location details to update-path
function updatePath(path_id, locations) {
    "use strict";
    $.ajax({
        type: "POST",
        data: {_id: path_id, locations: locations},
        url: "update-path"
    }).done(function () {
        window.location.href = '#';
    });
    notify("Update");
}

// Changes save path button to update button
function changeSaveToUpdate(node) {
    "use strict";
    Mousetrap.unbind('s');
    var savebutton = document.querySelector("#save-path");
    savebutton.innerHTML = "Update Path";
    savebutton.onclick = function () {
        updatePath(node.id, locations);
    };
    Mousetrap.bind('s', function () {
        savebutton.click();
    });
}
