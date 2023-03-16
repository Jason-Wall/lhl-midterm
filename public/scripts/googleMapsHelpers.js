// brings the lat and long variables to the global scope
let latLong;
let mapInfo;
let pinInfo;
let pinLatLng;

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
      alert("Geocode was not successful for the following reason: " + status + " : please delete recently created map")

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
  geoCodeMarker();
};

const geoCodeMarker = () => {
  // Loop through pinInfo to create markers and info windows
  for (let i = 0; i < pinInfo.length; i++) {
    let pin = pinInfo[i];
    pinTitle = pin.pin_title;
    pinDescription = pin.pin_description;
    geoCode(pin);
  }
};

// find lat long based off of pin info
const geoCode = (info) => {
  let geocoder = new google.maps.Geocoder();
  let address = `${info.street_address}, ${info.city}, ${info.country}`;
  geocoder.geocode({ address: address }, function (results, status) {
    if (status == "OK") {
      let location = results[0].geometry.location;
      lat = location.lat();
      long = location.lng();
      pinLatLng = { lat, long };
      createMarker(pinLatLng, info);
    } else {
      console.log(
        "Geocode was not successful for the following reason: " + status
      );
      alert("Geocode was not successful for the following reason: " + status + " : please delete recently created pin")
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
