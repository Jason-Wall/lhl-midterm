// brings the lat and long variables to the global scope
let lat;
let long;
let mapInfo;
// let google_api_key = process.env.GOOGLE_MAPS_API_KEY;

//update the maps information
function initMap() {
  console.log(mapInfo);
  let geocoder = new google.maps.Geocoder();
  let address = `${mapInfo.city}, ${mapInfo.country}`;
geocoder.geocode({ 'address': address }, function(results, status) {
  if (status == 'OK') {
    let location = results[0].geometry.location;
    lat = location.lat()
    long = location.lng()
    // console.log(location.lat());
    // console.log('Longitude: ' + location.lng());
  } else {
    console.log('Geocode was not successful for the following reason: ' + status);
  }
});
  let mapSetUp = {
    center: new google.maps.LatLng(lat, long),
    zoom: 20,
  };
  googleMap = new google.maps.Map(
    document.getElementById(`googleMap`),
    mapSetUp
  );
}

// updates the map variables and makes a request to the api if no map showing or calls initMap
const renderMapArea = (map) => {
  console.log(map)
  mapID = map.id;
  mapInfo = map
  // lat = 49.281059;
  // long = -123.119019;
  // console.log(map)
  if ($(".googleMap").length > 0) {
    initMap();
    return;
  }
  const $mapDiv = `
        <div id="googleMap" class="googleMap" style="width:100%;height:100%;"></div>
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBvCCsFn9dt3dc9kHCrRJvp0D44pNnikvg&callback=initMap"
 defer></script>
        `;
  $(".mapArea").empty();
  $(".mapArea").append($mapDiv);
};
