var map, infoWindow;
      function initMap() {
        var losAngeles = {lat: 34.062545, lng: -118.308934};
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 34.062545, lng: -118.308934},
          zoom: 13
        });
        infoWindow = new google.maps.InfoWindow;
          var service = new google.maps.places.PlacesService(map);
            service.nearbySearch({
            location: losAngeles,
            radius: 1000000,
            keyword: 'dispensary'
  }, callback);
}
function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}
function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          handleLocationError(false, infoWindow, map.getCenter());
        }
      }
      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }
$("#add-strain-btn").on("click", function(event) {
  event.preventDefault();
  var strainName = $("#strain-name-input").val().trim();
  var queryURL = "https://cors-anywhere.herokuapp.com/https://www.cannabisreports.com/api/v1.0/strains/search/" + strainName;
  $.ajax({
    url: queryURL,
    method: "GET",
    headers: {
    },
  }).then(function(response) {
    addNewRow(response.data, strainName);
  });
 });
 function addNewRow (data, strainName) {
  var img = data[0].image;
  var newRow = $("<tr>").prepend(
    $("<td>").text(strainName),
    $("<td>").text(data[0].genetics.names),
    $("<td>").append($('<img>').attr('src', img))
  );
  $("#strain-table > tbody").prepend(newRow);
 }