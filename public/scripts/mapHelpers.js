// Renders
const renderMapsList = (maps) => {
  $('.mapList').remove()
  for (let map of maps) {
    const newDiv = $(`
    <div id = ${map.id} class = 'mapList'>
      <div>pic</div>
      <div>
        <div>${map.map_title}</div>
        <div>${map.map_description}</div>
        <i>fav</i>
        <i>edit</i>
      </div>
    </div>
    `)
    $('.discoverMapsArea').append(newDiv);
    populateMapArea(map.id)
  };
};

let mapID;
let lat;
let long;

function initMap() {
  let geocoder = new google.maps.Geocoder();
  let mapSetUp = {
    center:new google.maps.LatLng(lat, long),
    zoom:20,
  };
  googleMap = new google.maps.Map(document.getElementById(`googleMap`),mapSetUp);
};

const renderMapArea = (map) => {
  mapID = map.id
  lat = 49.281059
  long = -123.119019
  console.log(map)
  if ($('.googleMap').length > 0) {
    initMap()
    return;
  };
        const $mapDiv = `
        <div id="googleMap" class="googleMap" style="width:100%;height:100%;"></div>
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBvCCsFn9dt3dc9kHCrRJvp0D44pNnikvg&callback=initMap"
 defer></script>
        `;
        $('.mapArea').empty();
        $('.mapArea').append($mapDiv);
};


// $('html').find('script[src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBvCCsFn9dt3dc9kHCrRJvp0D44pNnikvg&callback=initMap&libraries=places&v=beta"]').remove();
// let geocoder;
// let googleMap;
// function initialize() {
//   geocoder = new google.maps.Geocoder();
//   let latlng = new google.maps.LatLng(-34.397, 150.644);
//   let mapOptions = {
//     zoom: 8,
//     center: latlng
//   }
//   googleMap = new google.maps.Map(document.getElementById('map'), mapOptions);
// }

// function codeAddress() {
//   geocoder.geocode( { 'address': map.area}, function(results, status) {
//     if (status == 'OK') {
//       googleMap.setCenter(results[0].geometry.location);
//     } else {
//       alert('Geocode was not successful for the following reason: ' + status);
//     }
//   });
// }

{/* <body onload="initialize()">
<div id="map" style="width: 320px; height: 480px;"></div>
<div>
  <input id="address" type="textbox" value="Sydney, NSW">
  <input type="button" value="Encode" onclick="codeAddress()">
</div>
</body> */}

// var marker = new google.maps.Marker({
//   map: map,
//   position: results[0].geometry.location
// });
