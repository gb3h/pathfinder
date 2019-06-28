function renderButton() {
  gapi.signin2.render('g-signin2', {
    'scope': 'profile email',
    'width': 240,
    'height': 50,
    'longtitle': true,
    'theme': 'dark',
    'onsuccess': onSuccess,
    'onfailure': onFailure
  });
}

function onSuccess(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId());
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail());
  //pass information to server to insert or update the user record
  window.location.href = '#';
  setTimeout(function() {welcome(profile);}, 1000);
}

function onFailure(error) {
  console.log(error);
}

function welcome(profile){
  console.log("Welcome notification");
  GrowlNotification.notify({
              title: "Welcome " + profile.getName().split(" ")[0],
              description: 'You have 3 saved paths with us',
              image: {
                visible: true,
                customImage: profile.getImageUrl()
              },
              type: 'alert',
              position: 'top-right',
              closeTimeout: 3000,
              animationDuration: 5,

            }); // or (new GrowlNotification(options)).show();
}
