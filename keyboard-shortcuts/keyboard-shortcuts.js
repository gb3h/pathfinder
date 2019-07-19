/*global Mousetrap, console, document*/

// Add Keyboard shortcut 'ctrl+s or command+s' to save path
Mousetrap.bind('mod+s', function () {
    "use strict";
    document.getElementById('save').click();
    console.log('Saving');
    return false;
});

// Add Keyboard shortcut 'ctrl+v or command+v' to view existing paths
Mousetrap.bind('mod+v', function () {
    "use strict";
    document.getElementById('view').click();
    console.log("Viewing");
});