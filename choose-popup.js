function checkIfLoggedIn(){
  if(gapi.auth2.getAuthInstance().isSignedIn.get()){
    alert("Signed in");
    document.getElementById("link").setAttribute("href", "#popup2");
  } else {
    alert("Signed out");
    document.getElementById("link").setAttribute("href", "#popup1");
  }
  return false;
}
