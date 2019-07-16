function checkIfLoggedIn(){
  if(gapi.auth2.getAuthInstance().isSignedIn.get()){
    alert("Signed in");
    document.getElementById("view").setAttribute("href", "#popup2");
    getLocations();
  } else {
    alert("Signed out");
    document.getElementById("view").setAttribute("href", "#popup1");
  }
  return false;
}

function getLocations(){
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
   createList(all_routes);
}

function onError() {
  // handle error here, print message perhaps
  console.log('error receiving async AJAX call');
}

function createList(all_routes){
  //Adding li nodes dynamically according to the number of saved routes
  var ul = document.getElementById("myList");

 if (!ul.hasChildNodes()) {
   all_routes.forEach(function(routex, i) {

     var node = document.createElement("li");                     // Create a <li> node
     node.setAttribute("id", routex._id);
     routex.route.forEach(function(location, i) {
       if (i >= 1){
         node.appendChild(document.createTextNode(", " + location.name));
       } else {
         node.appendChild(document.createTextNode(location.name));
       }
     });

     var details = document.createElement("more-details");
     // var options = { weekday: 'long',
     //                 year: 'numeric',
     //                 month: 'long',
     //                 day: 'numeric' ,
     //                 hour: 'numeric',
     //                 minute: 'numeric'};

     // details.appendChild(document.createTextNode(new Date(routex.created_at).toLocaleString("en-US", options)));
     details.appendChild(document.createTextNode(moment(routex.created_at).fromNow()));
     node.append(details);

     createDeleteButton(node);
     node.onclick = function() {
        initAutocomplete.callUpdateButtons(routex.route);
        initAutocomplete.callCalculateAndDisplay(routex.route, false);
        window.location.href = '#';
     };
     ul.appendChild(node);
        // Append <li> to <ul> with id="myList"
   });
  } else {
     console.log("Already contain");
  }
}

function createDeleteButton(node){
  var removeButton = document.createElement('button');
  removeButton.appendChild(document.createTextNode("delete"));
  node.appendChild(removeButton);
  removeButton.onclick = function(e) {
    deletePath(node);
    e.stopPropagation();
    node.removeChild(removeButton);
    node.remove();
  }
}

function deletePath(node){
  $.ajax({
     type: "POST",
     data: {_id: node.id},
     url: "delete-path"
  });
}
