function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  if (confirm("Clicking this button will sign you out from Google!\n Click OK to proceed." )) {
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  } else {}
}
