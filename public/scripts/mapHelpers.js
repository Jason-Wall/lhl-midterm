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
    $(".myFavPinsTitle").text(`You have ${data.pins.length} pins`);
    for (let map of data.maps) {
      console.log("maps:", map);
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
    for (let mapFav of data.map_favourites) {
      const mapId = mapFav.id;
      const $myFavMaps = $(`
      <div id = '${data.maps[mapId]}' class="mapList">
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
      $(".myFavMapsAreaContainer").append($myFavMaps);
    }

    $(".myFavPinsAreaContainer").append();
  });
};
