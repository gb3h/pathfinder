/*global document, window, alert, console, require, google, $*/
/*jslint nomen: true */

// Sends path details to delete-path
function deletePath(node) {
    "use strict";
    $.ajax({
        type: "POST",
        data: {_id: node.id},
        url: "delete-path"
    });
}

// Creates delete button on loaded paths page for each path
function createDeleteButton(node) {
    "use strict";
    var removeButton = document.createElement('button');
    removeButton.appendChild(document.createTextNode("delete"));
    node.appendChild(removeButton);
    removeButton.onclick = function (e) {
        deletePath(node);
        e.stopPropagation();
        node.removeChild(removeButton);
        node.remove();
    };
}
