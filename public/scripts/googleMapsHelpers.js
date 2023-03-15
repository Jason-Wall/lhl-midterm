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
  const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let labelIndex = 0;
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
   // This event listener calls addMarker() when the map is clicked.
   google.maps.event.addListener(googleMap, "click", (event) => {
    addMarker(event.latLng, googleMap);
  });
  // Adds a marker to the map.
function addMarker(location, map) {
  // Add the marker at the clicked location, and add the next-available label
  // from the array of alphabetical characters.
  new google.maps.Marker({
    position: location,
    label: labels[labelIndex++ % labels.length],
    map: googleMap,
  });
  // new google.maps.Marker({
  //   position: latLong,
  //   map: googleMap,
  //   label: "🏁",
  // });
}
}

// updates the map variables and makes a request to the api if no map showing or calls initMap
const renderMapArea = (map, api) => {
  mapID = map.id;
  mapInfo = map
  // lat = 49.281059;
  // long = -123.119019;
  // console.log(map)
  if ($(".mapArea").length === 0){
    console.log('hey')
    const $discoverMaps = `<div class="discoverMapsArea">
    <div class="discoverMapsTitle">Discover Maps!</div>
    <section class="mapListContainer">
    </section>
  </div>
  <div class="mapArea"></div>`;
    $(".mainContainer").empty();
   $(".mainContainer").append($discoverMaps);
  }
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
