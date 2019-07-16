function checkIfLoggedIn(){
  if(gapi.auth2.getAuthInstance().isSignedIn.get()){
    alert("Signed in");
    document.getElementById("view").setAttribute("href", "#popup2");
    insertRoute();
  } else {
    alert("Signed out");
    document.getElementById("view").setAttribute("href", "#popup1");
  }
  return false;
}

function insertRoute(){
  var req = new XMLHttpRequest();
  var url = '/paths';
  req.open('GET',url,true);
  req.addEventListener('load',onLoad);
  req.addEventListener('error',onError);
  req.send();
}

function onLoad() {
   var response = this.responseText;
   console.log(response);
   var all_routes = JSON.parse(response);
   console.log(all_routes);

    //Adding li nodes dynamically according to the number of saved routes
    var ul = document.getElementById("myList");

   if (!ul.hasChildNodes()) {
     all_routes.forEach(function(routex, i) {

       var node = document.createElement("li");                     // Create a <li> node
       var textnode = document.createTextNode("Route " + (i + 1));  // Create a text node
       node.appendChild(textnode);                                  // Append the text to <li>
       ul.appendChild(node);     // Append <li> to <ul> with id="myList"
       node.onclick = function() {
          initAutocomplete.callUpdateButtons(routex.route);
          initAutocomplete.callCalculateAndDisplay(routex.route, false);
          window.location.href = '#';
       };
     });
    } else {
       console.log("Already contain");
    }

}

function onError() {
  // handle error here, print message perhaps
  console.log('error receiving async AJAX call');
}
