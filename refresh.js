function refresh() {
  // if (confirm("Clicking OK will delete any path made. \nClick cancel and save this path if you have not before proceeding" )) {
  //   window.location.reload();
  // } else {}

  GrowlNotification.notify({
              title: "Warning",
              description: 'This will delete any unsaved path made.',
              type: 'error',
              position: 'top-right',
              closeTimeout: 3000,
              animationDuration: 5,
              image: {
                  visible: true,
                  customImage: ''
              },
              showButtons: true,
              buttons: {
                  cancel: {
                      text: 'Cancel',
                      callback: function() {}
                  },
                  action: {
                      text: 'Ok',
                      callback: function() {window.location.reload();}
                  },
              },

            }); // or (new GrowlNotification(options)).show();
}
