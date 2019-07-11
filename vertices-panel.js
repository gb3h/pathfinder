function VerticesPanel(resultObject, map) {
    //savePath(directionsService, directionsDisplay, listOfLocations);
    // Just in case.
    if (resultObject.geocoded_waypoints.length <= 0) {
      return;
    }
  
    // Clearing out old buttons just in case (hard update)
    if (document.getElementById('VerticesPanel')) {
      document.getElementById('VerticesPanel').childNodes.forEach(function(child){
        document.getElementById('VerticesPanel').removeChild(child);
      })
    } else {
      document.createElement('VerticesPanel');
    }
    var vp = document.createElement('VerticesPanel');
    vp.style.flex = "1";
    var sortable = new Sortable(vp, {animation: 150, filter: '.filtered', onUpdate: function (/**Event*/evt) {
        var itemEl = evt.item;  // dragged HTMLElement
        console.log(itemEl);    
        console.log("evt.to " + evt.to); // target list
		console.log("evt.from " + evt.from);  // previous list
		console.log("evt.oldIndex " + evt.oldIndex);  // element's old index within old parent
		console.log("evt.newIndex " + evt.newIndex);  // element's new index within new parent
		console.log("evt.oldDraggableIndex " + evt.oldDraggableIndex); // element's old index within old parent, only counting draggable elements
		console.log("evt.newDraggableIndex " + evt.newDraggableIndex); // element's new index within new parent, only counting draggable elements
		console.log("evt.clone " + evt.clone); // the clone element
		console.log(evt.pullMode);  // when item is in another sortable: `"clone"` if cloning, `true` if moving
        }
    });
    // Clearing the control MVC array just in case also.
    map.controls[google.maps.ControlPosition.TOP_CENTER].clear();
  
    // For each place in the list of locations, we add a button for it on the RIGHT_CENTER of the map.
    for (var i = 0; i < resultObject.geocoded_waypoints.length; i++) {
      var vertexDiv = document.createElement('div');
      vp.appendChild(vertexDiv);
      if ((i === 0) || (i === (resultObject.geocoded_waypoints.length - 1))) {
        var j = i;
        vertexDiv.className = "filtered";
      } else {
        var j = resultObject.routes[0].waypoint_order[i - 1] + 1;
      }
      var vertex = new VertexButton(vertexDiv, map, resultObject.geocoded_waypoints[j].place_id);
    }
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(vp);
  }
  
  function VertexButton(controlDiv, map, location) {
    // Set CSS for the button background.
    var controlUI = document.createElement('div');
    controlUI.style.backgroundColor = '#fff';
    controlUI.style.border = '2px solid #fff';
    controlUI.style.borderRadius = '3px';
    controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
    controlUI.style.cursor = 'pointer';
    controlUI.style.marginTop = '-3px';
    controlUI.style.marginBottom = '1px';
    controlUI.style.textAlign = 'center';
    controlUI.title = 'Click to view place';
    controlUI.draggable="true";
    controlDiv.appendChild(controlUI);
  
    // Set CSS for the control interior.
    var controlText = document.createElement('div');
    controlText.style.color = 'rgb(25,25,25)';
    controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
    controlText.style.fontSize = '16px';
    controlText.style.lineHeight = '38px';
    controlText.style.paddingLeft = '10px';
    controlText.style.paddingRight = '8px';
    controlText.innerHTML = location;
    controlText.draggable="true";
    controlUI.appendChild(controlText);
  
    // Setup the click event listeners: simply set the map to the chosen location.
  
    // Setup the click close listeners: simply remove the location button
    // and its contents.
  }