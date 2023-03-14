// brings the lat and long variables to the global scope
// let lat;
// let long;
let latLong;
let mapInfo;

//update the maps information / callback from google maps api
function initMap() {
  geocode()
  }

//gets the maps latLong from its city and country
const geocode = () => {
  console.log(mapInfo);
  let geocoder = new google.maps.Geocoder();
  let address = `${mapInfo.city}, ${mapInfo.country}`;
geocoder.geocode({ 'address': address }, function(results, status) {
  if (status == 'OK') {
    let location = results[0].geometry.location;
    lat = location.lat()
    lng = location.lng()
    latLong = {lat, lng}
    mapSetUp(latLong)
    // console.log(location.lat());
    // console.log('Longitude: ' + location.lng());
  } else {
    console.log('Geocode was not successful for the following reason: ' + status);
  }
});
}

// updates the maps
const mapSetUp = (latLong) => {
  console.log(mapInfo)
  let lat = latLong.lat
  let long = latLong.lng
  let mapSetUp = {
    center: new google.maps.LatLng(lat, long),
    zoom: 10,
  };
  googleMap = new google.maps.Map(
    document.getElementById(`googleMap`),
    mapSetUp
  );
  console.log(latLong)
  new google.maps.Marker({
    position: latLong,
    map: googleMap,
    label: "🏁",
  });
}

// updates the map variables and makes a request to the api if no map showing or calls initMap
const renderMapArea = (map, api) => {
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
<script src="https://maps.googleapis.com/maps/api/js?key=${api}&callback=initMap"
 defer></script>
        `;
  $(".mapArea").empty();
  $(".mapArea").append($mapDiv);
};

//add a marker
// const addMarker = () => {
//   mapSetUp(latLong)
  // new google.maps.Marker({
  //   position: latLong,
  //   map,
  //   title: "Hello World!",
  // });
// }
