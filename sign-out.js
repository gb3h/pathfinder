/*global document, window, alert, console, confirm, google, gapi, moment, $, setTimeout*/

// Signs user out
function signOut() {
    "use strict";
    var auth2 = gapi.auth2.getAuthInstance();

    // Alert confirmation for sign-out
    if (confirm("Clicking this button will sign you out from Google!\n Click OK to proceed.")) {
        auth2.signOut().then(function () {
            console.log('User signed out.');
        });
    }
}