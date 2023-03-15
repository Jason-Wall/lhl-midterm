// brings the lat and long variables to the global scope
let latLong;
let mapInfo;
let pinInfo;
let pinLatLng;

// updates the map variables and makes a request to the api if no map showing or calls initMap
const renderMapArea = (mapObj, api) => {
  mapInfo = mapObj.mapData
  pinInfo = mapObj.pinsData
  mapID = mapObj.mapData.id;
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
  renderMapInfo(mapInfo);
  for (pin of pinInfo) {
    renderPinInfo(pin);
// if user is logged in, create icons
if ($(".logout").length) {
  renderPinIcons(pin)
  }
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

const renderMapInfo = (mapInfo) => {
  const $discoverMaps = `
  <div class="discoverMapsTitle mapInfoTitle"><h1>${mapInfo.map_title}!</h1></div>
  <div class="discoverMapsTitle mapInfoDescription"><p>${mapInfo.map_description}!</p></div>
  <section class="mapListContainer pinContainer">
  </section>
`;
$(".discoverMapsArea").empty();
$(".discoverMapsArea").append($discoverMaps);
};

const renderPinInfo = (pin) => {
  const $pinDetails = `<div id ="${pin.id}" class="mapList">
  <img class="mapListPic"
    src=${pin.map_url}
    alt="map image">
  <div class="mapListDetails pinDetails">
    <div>${pin.pin_title}</div>
    <div>Created by: ${pin.user_id}</div>
    <div class="mapListIcons pinIcons"></div>
  </div>
</div>
<div class"mapDescription pinDesciption">${pin.pin_description}</div>
`;
$('.mapListContainer').append($pinDetails);
}

const renderPinIcons = (pin) => {
  const icons = $(`
  <i class="fa-solid fa-pen-to-square"></i>
  <i class="fa-regular fa-trash-can"></i>`);
  $pinDetails.find(".pinIcons").append(icons);

  $pinDetails.find(".fa-pen-to-square").on("click", () => {
    renderModal(editMapForm, map.id);
    console.log(`Edit icon clicked for pin ID: ${pin.id}`);
  });

  $pinDetails.find(".fa-trash-can").on("click", () => {
    console.log("clicked trash can");
    renderModal(deleteMapForm, map.id);
  });
}

//update the maps information / callback from google maps api
function initMap() {
  geoCodeMap();
}

//gets the maps latLong from its city and country
const geoCodeMap = () => {
  let geocoder = new google.maps.Geocoder();
  let address = `${mapInfo.city}, ${mapInfo.country}`;
  geocoder.geocode({ address: address }, function (results, status) {
    if (status == "OK") {
      let location = results[0].geometry.location;
      lat = location.lat();
      long = location.lng();
      latLong = { lat, long };
      mapSetUp(latLong);
    } else {
      console.log(
        "Geocode was not successful for the following reason: " + status
      );
    }
  });
};

// updates the maps
const mapSetUp = (latLong) => {
  let lat = latLong.lat;
  let long = latLong.long;
  let mapSetUp = {
    center: new google.maps.LatLng(lat, long),
    zoom: 10,
  };
  googleMap = new google.maps.Map(
    document.getElementById(`googleMap`),
    mapSetUp
  );
  geoCodeMarker()
};

const geoCodeMarker = () => {
  // Loop through pinInfo to create markers and info windows
for (let i = 0; i < pinInfo.length; i++) {
  let pin = pinInfo[i];
  pinTitle = pin.pin_title;
  pinDescription = pin.pin_description
  geoCode(pin);
}
}

// find lat long based off of pin info
const geoCode = (info) => {
  let geocoder = new google.maps.Geocoder();
  let address = `${info.street_address}, ${info.city}, ${info.country}`;
  geocoder.geocode({ address: address }, function (results, status) {
    if (status == "OK") {
      let location = results[0].geometry.location;
      lat = location.lat();
      long = location.lng();
      pinLatLng = {lat, long}
    createMarker(pinLatLng, info)
    } else {
      console.log(
        "Geocode was not successful for the following reason: " + status
        );
      }
    });
  };

  // Create a marker
  const createMarker = (pinLatLng, info) => {
  const marker = new google.maps.Marker({
    position: { lat: pinLatLng.lat, lng: pinLatLng.long },
    map: googleMap,
    title: info.pin_title,
  });

  // Add a click listener for the marker
  marker.addListener("click", () => {
    // Open an info window
    const infoWindow = new google.maps.InfoWindow({
      content: `<h1>${info.pin_title}</h1>
      <p>${info.pin_description}</p>`,
    });
    infoWindow.open(googleMap, marker);
  });
};



