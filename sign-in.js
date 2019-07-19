/*global document, window, alert, console, require, google, gapi, moment, $, setTimeout*/

var GrowlNotification;

// Welcome user notification
function welcome(profile) {
    "use strict";
    console.log("Welcome notification loading...");
    GrowlNotification.notify({
        title: "Welcome " + profile.getName().split(" ")[0],
        description: '',
        image: {
            visible: true,
            customImage: ''
            //profile.getImageUrl()
        },
        closeTimeout: 3000,
        type: 'default',
        closeWith: ['click', 'button'],
        animationDuration: 0.5,
        position: 'top-center'
    });
    console.log("Welcome complete!!");
}

// Sends user details to save-user
function updateUserData(profile) {
    "use strict";
    if (profile) {
        $.ajax({
            type: 'POST',
            url: 'save-user',
            data: {
                id: profile.getId(),
                name: profile.getName(),
                email: profile.getEmail()
            }
        }).done(function (data) {
            console.log(data);
            window.location.href = '#';
        });
    }
}

// Failed google login
function onFailure(error) {
    "use strict";
    console.log(error);
}

// Successful google login, trigger welcome notification
function onSuccess(googleUser) {
    "use strict";
    var profile = googleUser.getBasicProfile();
    window.location.href = '#';
    setTimeout(function () {
        welcome(profile);
    }, 1000);
    updateUserData(profile);
}

// Log user in
function renderButton() {
    "use strict";
    try {
        gapi.signin2.render('g-signin2', {
            'scope': 'profile email',
            'width': 240,
            'height': 50,
            'longtitle': true,
            'theme': 'dark',
            'onsuccess': onSuccess,
            'onfailure': onFailure
        });
    } catch (e) {
        console.log(e);
    }
}