// renders a blankmap for the starter map/ homepage
const renderBlankMap = (api) => {
  const $mapDiv = $(`
  <div id="googleMap" class="googleMap" style="width:100%;height:100%;"></div>
<script src="https://maps.googleapis.com/maps/api/js?key=${api}&callback=blankMap"
defer></script>
  `);
  $(".mapArea").empty();
  $(".mapArea").append($mapDiv);
};


//callback from google api for blank renderBlankMap
function blankMap() {
  lat = 37.3875
  long = -122.0575
  let mapSetUp = {
    center: new google.maps.LatLng(lat, long),
    zoom: 10,
  };
  googleMap = new google.maps.Map(
    document.getElementById(`googleMap`),
    mapSetUp
  );
}


// updates the map variables and makes a request to the api if no map showing or calls initMap
const renderMapArea = (mapObj, api) => {
  console.log('renderMapArea/mapObj', mapObj)
  mapInfo = mapObj.mapData;
  pinInfo = mapObj.pinsData;
  mapID = mapObj.mapData.id;
  console.log(pinInfo);
  if ($(".mapArea").length === 0) {
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


//will gather all of the map information from the database and display it
const renderMapInfo = (mapInfo) => {
  const $discoverMaps = $(`
  <div class="discoverMapsTitle mapInfoTitle strong">${mapInfo.map_title}!</div>
  <div class="mapInfoDescription">${mapInfo.map_description}!</div>
  <container class="addPin">
  <div class="createAPin"><i class="icon fa-solid fa-location-dot">Add A Pin</i></div>
  </container>
  <section class="mapListContainer pinContainer">
  </section>
`);
  $(".discoverMapsArea").empty();
  $(".discoverMapsArea").append($discoverMaps);
  if (!$('.logout').length) {
    $('.addPin').empty()
  }
  $discoverMaps.find(".fa-location-dot").on("click", () => {
    console.log("clicked add pin");
    renderModal(createPin, mapInfo.id);
  });
};


//will gather all of the pin information from the database and display it
const renderPinInfo = (pin) => {
  console.log(pin);
  const pinDetails = $(`<div id ="${pin.id}" class="mapList">
  <img class="mapListPic"
    src=${pin.pin_url}
    alt="map image">
  <div class="pinDetails">
    <div class="title strong">${pin.pin_title}</div>
    <div class="createdBy">Created by: ${pin.name}</div>
    <div class="mapListIcons pinIcons"></div>
  </div>
</div>
<div class"mapDescription pinDesciption">${pin.pin_description}</div>
`);
  $(".mapListContainer").append(pinDetails);
  const $icons = `
  <i class="icon fa-solid fa-pen-to-square"></i>
  <i class="icon fa-regular fa-trash-can"></i>`;
  if ($('.logout').length > 0) {
  pinDetails.find(".pinIcons").append($icons);

  pinDetails.find(".fa-pen-to-square").on("click", () => {
    renderModal(editPinForm, pin);
    console.log(`Edit icon clicked for pin ID: ${pin.id}`);
  });
  pinDetails.find(".fa-trash-can").on("click", () => {
    console.log("clicked trash can");
    renderModal(deletePin, pin.id);
  });
}
};
