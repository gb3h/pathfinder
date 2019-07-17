function VerticesPanel(resultObject, map, listOfLocations) {
    // Clearing out old buttons just in case (hard update)
    if (document.getElementById('VerticesPanel')) {
      document.getElementById('VerticesPanel').childNodes.forEach(function(child){
        document.getElementById('VerticesPanel').removeChild(child);
      })
    } else {
      document.createElement('VerticesPanel');
    }

    map.controls[google.maps.ControlPosition.TOP_CENTER].clear();
    var vp = document.createElement('ul');
    vp.setAttribute('id', 'sortable');
    listOfLocations.forEach(function(location){
      var li = document.createElement("li");                     // Create a <li> node
      li.setAttribute("class", "ui-state-default");
      li.innerHTML = location.name;
      li.setAttribute("place_id", location.place_id);

      var arrow = document.createElement("span");
      arrow.setAttribute("class", "ui-icon ui-icon-arrowthick-2-n-s");
      li.appendChild(arrow);
      vp.appendChild(li);

    });
    var sortable = new Sortable(vp, {animation: 150, filter: '.filtered', onUpdate: function (/**Event*/evt) {
        var newOrderedLocations = [];
        var listElements = $("#sortable").children();
        console.log(listElements.length);
        for (var i = 0; i < listElements.length; i++){
          console.log(listElements[i].innerText + " " + listElements[i].getAttribute('place_id'));
          newOrderedLocations.push({
            name: listElements[i].innerText,
            place_id: listElements[i].getAttribute('place_id')
          });
        }
        cleanPath(newOrderedLocations);
        initAutocomplete.callCalculateAndDisplay(newOrderedLocations, false);

      }
    });
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(vp);
  }
