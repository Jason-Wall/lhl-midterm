// brings the lat and long variables to the global scope
// let lat;
// let long;
let latLong;
let mapInfo;
let pinInfo;
let pinLatLng;
let pin;
let pinTitle;
let pinDescription;

//update the maps information / callback from google maps api
function initMap() {
  geoCodeMap();
}

// find lat long based off of pin info
const geoCode = (info) => {
  let geocoder = new google.maps.Geocoder();
  let address = `${info.street_address}, ${info.city}, ${info.country}`;
  geocoder.geocode({ address: address }, function (results, status) {
    if (status == "OK") {
      let location = results[0].geometry.location;
      console.log(results[0].geometry.location.lat())
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


const geoCodeMarker = () => {
  // let pinArr = []
  // for (pin of pinInfo) {
  //   console.log(pin)
  //   let tempArr = [];
  //   tempArr.push(pin.pin_title)
  //   tempArr.push(pin.pin_description)
  //   tempArr.push(pin.address)
  //   tempArr.push(pin.city)
  //   tempArr.push(pin.country)
  //   pinArr.push(tempArr);
  // }
  // console.log(pinArr)

  // Loop through pinInfo to create markers and info windows
for (let i = 0; i < pinInfo.length; i++) {
  let pin = pinInfo[i];
  pinTitle = pin.pin_title;
  pinDescription = pin.pin_description
  geoCode(pin);
}
}

  // Create a marker
  const createMarker = (pinLatLng, info) => {
    console.log('hey', pinLatLng)
  const marker = new google.maps.Marker({
    position: { lat: pinLatLng.lat, lng: pinLatLng.long },
    map: googleMap,
    title: info.pin_title,
  });

  // Add a click listener for the marker
  marker.addListener("click", () => {
    // Open an info window
    const infoWindow = new google.maps.InfoWindow({
      content: `<h1>${info.pin_title}</h1>${info.pin_description}`,
    });
    infoWindow.open(googleMap, marker);
  });
};

// // Create a marker
// const marker1 = new google.maps.Marker({
//   position: { lat: 49.2827, lng: -123.1207 },
//   map: googleMap,
//   title: `${pinArr[0][0]}`
// });

// // Add a click listener for the marker
// marker1.addListener('click', () => {
//   // Open an info window
//   const infoWindow = new google.maps.InfoWindow({
//     content: `<h1>${pinArr[0][0]}</h1>
//     ${pinArr[0][1]}`
//   });
//   infoWindow.open(googleMap, marker1);
// });

// // Create a marker
// const marker2 = new google.maps.Marker({
//   position: {lat: 49.2857, lng: -123.1201 },
//   map: googleMap,
//   title: `${pinArr[1][0]}`
// });

// // Add a click listener for the marker
// marker2.addListener('click', () => {
//   // Open an info window
//   const infoWindow = new google.maps.InfoWindow({
//     content: `<h1>${pinArr[1][0]}</h1>
//     ${pinArr[1][1]}`
//   });
//   infoWindow.open(googleMap, marker2);
// });

// // Create a marker
// const marker3 = new google.maps.Marker({
//   position: { lat: 49.2821, lng: -123.1217 },
//   map: googleMap,
//   title: `${pinArr[2][0]}`
// });

// // Add a click listener for the marker
// marker3.addListener('click', () => {
//   // Open an info window
//   const infoWindow = new google.maps.InfoWindow({
//     content: `<h1>${pinArr[2][0]}</h1>
//     ${pinArr[2][1]}`
//   });
//   infoWindow.open(googleMap, marker3);
// });


  // // Create an info window to share between markers.
  // const infoWindow = new google.maps.InfoWindow();

  // // Create the markers.
  // markerPositions.forEach(({ position, title }, i) => {
  //   const pinView = new google.maps.marker.PinView({
  //     glyph: `${i + 1}`,
  //   });
  //   const marker = new google.maps.marker.AdvancedMarkerView({
  //     position,
  //     googleMap,
  //     title: `${i + 1}. ${title}`,
  //     content: pinView.element,
  //   });

  //   // Add a click listener for each marker, and set up the info window.
  //   marker.addListener("click", ({ domEvent, latLng }) => {
  //     const { target } = domEvent;

  //     infoWindow.close();
  //     infoWindow.setContent(marker.title);
  //     infoWindow.open(marker.googleMap, marker);
  //   });
  // });


//gets the maps latLong from its city and country
const geoCodeMap = () => {
  // console.log(mapInfo);
  let geocoder = new google.maps.Geocoder();
  let address = `${mapInfo.city}, ${mapInfo.country}`;
  geocoder.geocode({ address: address }, function (results, status) {
    if (status == "OK") {
      let location = results[0].geometry.location;
      lat = location.lat();
      long = location.lng();
      latLong = { lat, long };
      mapSetUp(latLong);
      // console.log(location.lat());
      // console.log('Longitude: ' + location.lng());
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

// updates the map variables and makes a request to the api if no map showing or calls initMap
const renderMapArea = (mapObj, api) => {
  mapInfo = mapObj.mapData
  pinInfo = mapObj.pinsData
  mapID = mapObj.mapData.id;
  console.log(mapObj)
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
