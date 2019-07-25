/*global document, window, alert, console, require, google, $, confirm*/
/*jslint nomen: true */

// Sends path details to delete-path
function deletePath(node) {
    "use strict";
    $.ajax({
        type: "POST",
        data: {
            _id: node.id
        },
        url: "delete-path"
    });
}

//Confirms deletion
function confirmDeletion(node, removeButton) {
    "use strict";
    if (confirm("Warning. This will delete the path forever.")) {
        deletePath(node);
        node.removeChild(removeButton);
        node.remove();
    }
}

// Creates delete button on loaded paths page for each path
function createDeleteButton(node) {
    "use strict";
    var removeButton = document.createElement('button');
    removeButton.appendChild(document.createTextNode("delete"));
    node.appendChild(removeButton);
    removeButton.onclick = function (e) {
        confirmDeletion(node, removeButton);
        e.stopPropagation();
    };
}