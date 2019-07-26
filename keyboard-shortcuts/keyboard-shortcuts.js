/*global Mousetrap, console, document*/

Mousetrap.bind('h', function (e) {
    "use strict";
    document.getElementById('help').click();
    console.log("User Guide");
});

// Add Keyboard shortcut 'ctrl+s or command+s' to save path
Mousetrap.bindGlobal('mod+s', function (e) {
    "use strict";
    document.getElementById('save').click();
    console.log('Saving');
    return false;
});

// Add Keyboard shortcut 'ctrl+v or command+v' to view existing paths
Mousetrap.bindGlobal('mod+v', function () {
    "use strict";
    document.getElementById('view').click();
    console.log("Viewing");
});

// Add Keyboard shortcut 'ctrl+d or command+d' to download path
Mousetrap.bindGlobal('mod+d', function (e) {
    "use strict";
    document.getElementById('download').click();
    console.log("Downloading");
    return false;
});