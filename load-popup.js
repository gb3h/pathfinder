/*global document, window, alert, console, require, google, gapi, moment, XMLHttpRequest*/
/*jslint nomen: true */

var createDeleteButton, initAutocomplete, changeSaveToUpdate;

// Add li nodes dynamically according to the number of saved routes
function createList(all_routes) {
    "use strict";
    // Get the ul node
    var ul = document.getElementById("myList");

    // Check if the nodes have already been added before
    if (!ul.hasChildNodes()) {
        all_routes.forEach(function (routex) {

            //Create a <li> node for each route
            var node = document.createElement("li"),
                date = document.createElement("date");
            node.setAttribute("id", routex._id);

            // Add route name to the node <li>
            if (routex.route !== null) {
                routex.route.forEach(function (location, i) {
                    if (i >= 1) {
                        node.appendChild(document.createTextNode(", " + location.name));
                    } else {
                        node.appendChild(document.createTextNode(location.name));
                    }
                });
            }

            // Add route date to the node <li>
            date.appendChild(document.createTextNode(moment(routex.created_at).fromNow()));
            node.append(date);
            createDeleteButton(node);
            node.onclick = function () {
                initAutocomplete.callUpdateButtons(routex.route);
                initAutocomplete.callCalculateAndDisplay(routex.route);
                window.location.href = '#';
                changeSaveToUpdate(node);
            };

            // Append route node <li> to <ul> with id="myList"
            ul.appendChild(node);
        });
    } else {
        console.log("Already contain");
    }
}

// Gets all the paths by the user
function onLoad() {
    "use strict";
    var response = this.responseText,
        all_routes = JSON.parse(response);
    console.log(all_routes);
    createList(all_routes);
}

// Prints error message
function onError() {
    "use strict";
    console.log('error receiving async AJAX call');
}

// Gets all the paths by the user
function getPaths() {
    "use strict";
    var req = new XMLHttpRequest(),
        url = '/paths';
    req.open('GET', url, true);
    req.addEventListener('load', onLoad);
    req.addEventListener('error', onError);
    req.send();
}

// Checks if user is logged in, and load correct popup
function checkIfLoggedIn() {
    "use strict";
    // Signed in: load view paths popup
    if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
        alert("Signed in");
        document.getElementById("view").setAttribute("href", "#popup2");
        getPaths();

    // Signed out: load sign-in popup
    } else {
        alert("Signed out");
        document.getElementById("view").setAttribute("href", "#popup1");
    }
    return false;
}



// var options = { weekday: 'long',
//                 year: 'numeric',
//                 month: 'long',
//                 day: 'numeric' ,
//                 hour: 'numeric',
//                 minute: 'numeric'};

// details.appendChild(document.createTextNode(new Date(routex.created_at).toLocaleString("en-US", options)));
