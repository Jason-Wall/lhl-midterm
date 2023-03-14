const renderMapsList = (maps) => {
  $(".mapListContainer").remove();
  for (let map of maps) {
    const newDiv = $(`
    <section class="mapListContainer">
      <div id = '${map.id}' class="mapList">
        <img class="mapListPic"
          src=${map.map_url}
          alt="map image">
        <div class="mapListDetails">
          <div>${map.map_title}</div>
          <div>Created by: Jenny!</div>
          <div class="mapListIcons">
            <i class="fa-solid fa-heart"></i>
            <i class="fa-solid fa-pen-to-square"></i>
          </div>
        </div>
      </div>
      <div class"mapDescription">${map.map_description}</div>
    </section>
    `);
    $(".discoverMapsArea").append(newDiv);
    newDiv.find(".fa-heart").on("click", () => {
      console.log(`Heart icon clicked for map ID: ${map.id}`);
    });
    newDiv.find(".fa-pen-to-square").on("click", () => {
      renderModal(editMapForm, map.id);
      console.log(`Edit icon clicked for map ID: ${map.id}`);
    });
    populateMapArea(map.id);
  }
};

let mapID;
let lat;
let long;

function initMap() {
  // let geocoder = new google.maps.Geocoder();
  let mapSetUp = {
    center: new google.maps.LatLng(lat, long),
    zoom: 20,
  };
  googleMap = new google.maps.Map(
    document.getElementById(`googleMap`),
    mapSetUp
  );
}

const renderMapArea = (map) => {
  mapID = map.id;
  lat = 49.281059;
  long = -123.119019;
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

//renders nav area when a user is logged in
const renderNavArea = () => {
  $(".login").remove();
  const $newButtons = `
  <button class="discover reset button">Discover maps</button>
  <button class="create reset button">Create a map</button>
  <button class="myMaps reset button">My maps</button>
  <button class="logout reset button">Logout</button>`;
  $(".buttons").append($newButtons);
};

//resets the nav area when logged out
const resetNavArea = () => {
  $(".mainContainer").empty();
  $(".reset").remove();
  const $login = `<button class="login button">Login</button>`;
  $(".buttons").append($login);
  const $nonMemberArea = `<div class="discoverMapsArea">
    <div class="discoverMapsTitle">Discover Maps!
    </div>
    </section>
    <section class="mapListContainer">
    </section>
  </div>
  <div class="mapArea">
    No potatoes here
  </div>`;
  $(".mainContainer").append($nonMemberArea);
  // renderMapArea(); need to try and figure out how to get a map object put inside
};

//renders the member area
const renderMemberArea = (user) => {
  $(".mainContainer").empty();
  const $memberArea = `
  <section class="memberAreaContainer">
  <div class="myMapsContainer"><div class="myMapsArea">
  <div class="discoverMapsTitle">My Maps</div>
  <section class="myMapsAreaContainer">
  </section></div></div>
  <div class="myFavMapsContainer"><div class="myMapsArea">
<div class="myFavMapsTitle">My fav maps</div>
<section class="myFavMapsAreaContainer">
</section></div></div>
<div class="myFavPinsContainer">
<div class="myMapsArea">
  <div class="myFavPinsTitle">My fav pins</div>
  <section class="myFavPinsAreaContainer"></section>
</div>
</div>
  </section>
`;
  $(".mainContainer").append($memberArea);
  $.ajax({
    //2make an ajax call to get all related user information
    type: "GET",
    url: "/users-api/myinfo",
  }).then((data) => {
    console.log("data:", data);
    //receive an object of user data from /myinfo route and use it to populate member page
    for (let map of data.maps) {
      const $maps = $(`
        <div id = '${map.id}' class="mapList">
          <img class="mapListPic"
            src=${map.map_url}
            alt="map image">
          <div class="mapListDetails">
            <div>${map.map_title}</div>
            <div>Created by: ${data.user[0].name}</div>
            <div class="mapListIcons">
              <i class="fa-solid fa-heart"></i>
              <i class="fa-solid fa-pen-to-square"></i>
            </div>
          </div>
        </div>
        <div class"mapDescription">${map.map_description}</div>

      `);
      $(".myMapsAreaContainer").append($maps);
    }
    for (let mapFav of data.favMaps) {
      console.log("mapFav", mapFav);
      const $myFavMaps = $(`
      <div id = '${mapFav.map_id}' class="mapList">
        <img class="mapListPic"
          src=${mapFav.map_url}
          alt="map image">
        <div class="mapListDetails">
          <div>${mapFav.map_title}</div>
          <div>Created by: ${data.user[0].name}</div>
          <div class="mapListIcons">
            <i class="fa-solid fa-heart"></i>
            <i class="fa-solid fa-pen-to-square"></i>
          </div>
        </div>
      </div>
      <div class"mapDescription">${mapFav.map_description}</div>
    `);
      $(".myFavMapsAreaContainer").append($myFavMaps);
    }
    for (let pinFav of data.favPins) {
      const $myFavPins = $(`
      <div class="pinList">
      <div>${pinFav.pin_title}</div>
      <div>${pinFav.pin_description}</div>
      </div>`);
      $(".myFavPinsAreaContainer").append($myFavPins);
    }
  });
};
