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

function onFailure(error) {
  console.log(error);
}

function onSuccess(googleUser) {
  var profile = googleUser.getBasicProfile();
  // console.log("Successful login. Loading user info...")
  // console.log('ID: ' + profile.getId());
  // console.log('Name: ' + profile.getName());
  // console.log('Image URL: ' + profile.getImageUrl());
  // console.log('Email: ' + profile.getEmail());
  //pass information to server to insert or update the user record
  window.location.href = '#';
  setTimeout(function() {welcome(profile);}, 1000);
  updateUserData(profile);
}

function welcome(profile){
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
    animationDuration: .5,
    position: 'top-center'

});
console.log("Welcome complete!!");
// or (new GrowlNotification(options)).show();
}

function updateUserData(profile){
  if(profile){
      $.ajax({
            type: 'POST',
            url: 'save-user',
            data: {id:profile.getId(), name:profile.getName(), email:profile.getEmail()}
        }).done(function(data){
            console.log(data);
            window.location.href = '#';
        })
  } 
}
