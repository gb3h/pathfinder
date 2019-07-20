/*global document: false */
/*jslint devel: true */

// Get elements for image panel.
var imagePanel = document.getElementById('image-panel');
var image = document.getElementById('location-image');
var info = document.getElementById('info');
var rating = document.getElementById('rating');

// Get image url of location for adding to src of img tag
function getImageUrl(location) {
    "use strict";
    var photo_url = '';
    if (location.photos !== undefined && image !== null) {
        if (typeof location.photos[0] === "string") {
            photo_url = location.photos[0];
        } else {
            photo_url = location.photos[0].getUrl();
        }
    } else {
        photo_url = "https://www.mygoyangi.com/wp-content/uploads/2016/11/download.jpeg";
    }
    return photo_url;
}

// Get rating of location
function getRating(location) {
    "use strict";
    var rating_title = "<br> Rating: ";
    if (location.rating !== undefined) {
        rating_title += location.rating + '</br>';
        rating.setAttribute('class', 'rating-static rating-' +
            Math.ceil(location.rating * 10 / 5) * 5);

    } else {
        rating_title += "none </br>";
    }
    return rating_title;
}

// Get opening_hours of location
function getOpeningHours(location) {
    "use strict";
    var opening_hours = '<br><br> <b> Operating hours </b> </br> ';
    if (location.opening_hours !== undefined) {
        location.opening_hours.weekday_text.forEach(function (txt) {
            opening_hours += '<br>' + txt + '</br>';
        });
    } else {
        opening_hours += '<br> No opening hours available </br>';
    }
    return opening_hours;
}

/* This function displays the image panel with the rating and operating hours
of a location button that the user hovers over. It calls getImageUrl,
getRating and getOpeningHours.
*/

function displayImagePanel(location) {
    "use strict";
    try {
        image.setAttribute('src', getImageUrl(location));
        image.style.height = '200px';
        image.style.width = '350px';
        if (info.innerHTML === '') {
            info.innerHTML += '<br><b>' + location.name + '</b></br>';
            info.innerHTML += getRating(location);
            info.innerHTML += getOpeningHours(location);
        }
        imagePanel.style.visibility = 'visible';
    } catch (e) {
        console.log(e);
    }
}

/* This function hides the image panel with the rating and operating hours
of a location button that the user moves away from.
*/
function hideImagePanel() {
    "use strict";
    try {
        info.innerHTML = '';
        rating.setAttribute('class', 'rating-static rating-0');
        imagePanel.style.visibility = 'hidden';
    } catch (e) {
        console.log(e);
    }
}

// if (location.opening_hours.open_now){
//   info.innerHTML += "<span style='color:green; position:absolute; top:340px; right:30px;' >Open</span>";
// } else {
//   info.innerHTML += "<span style='color:red;  position:absolute; top:340px; right:30px;'>Closed</span>";
// }