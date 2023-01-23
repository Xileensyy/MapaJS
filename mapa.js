
var map;
var directionsService;
var directionsRenderer;
var startAutocomplete;
var endAutocomplete;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: { lat: -33.01533915986377, lng: -71.55004640676421 }
  });
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer({
    map: map,
    suppressMarkers: true
  });

  startAutocomplete = new google.maps.places.Autocomplete(document.getElementById('start'));
  endAutocomplete = new google.maps.places.Autocomplete(document.getElementById('end'));

  // Agregar listener de clic al mapa
  google.maps.event.addListener(map, 'click', function (event) {
    var lat = event.latLng.lat();
    var lng = event.latLng.lng();
    var latLng = new google.maps.LatLng(lat, lng);
    var geocoder = new google.maps.Geocoder();

    geocoder.geocode({ 'latLng': latLng }, function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[0]) {
          var address = results[0].formatted_address;
          // Establecer la ubicación del clic en el campo de entrada correspondiente
          var originEnd = document.getElementById("start").value;
          var destinyEnd = document.getElementById("end").value;
          if (!originEnd) {
            document.getElementById("start").value = address;
          } else if (!destinyEnd) {
            document.getElementById("end").value = address;
          }
          calculateAndDisplayRoute();
        }
      }
    });
  });
}


function calculateAndDisplayRoute() {
  var start = document.getElementById('start').value;
  var end = document.getElementById('end').value;
  directionsService.route({
    origin: start,
    destination: end,
    travelMode: 'DRIVING'
  }, function (response, status) {
    if (status === 'OK') {
      var route = response.routes[0];
      var distance = route.legs[0].distance.text;
      var duration = route.legs[0].duration.text;
      document.getElementById('distance').innerHTML = 'Distancia: ' + distance;
      document.getElementById('duration').innerHTML = 'Tiempo: ' + duration;
      directionsRenderer.setDirections(response);
    }
  });
}