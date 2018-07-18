var map;
var infowindow;
function initMap() {
  var losAngeles = {lat: 34.062545, lng: -118.308934};
  map = new google.maps.Map(document.getElementById('map'), {
    center: losAngeles,
    zoom: 13
  });
  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    location: losAngeles,
    radius: 10000,
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