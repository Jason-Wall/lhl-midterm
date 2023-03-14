// Accepts maps as an object of maps, class name of the container
// to be appended to. eg. <div class="test"> would be 'test'
const renderMapsList = (maps, container) => {
  $(`.${container}`).find(".mapListContainer").remove();
  for (let map of maps) {
    const newDiv = $(`
    <section class="mapListContainer">
      <div id = '${map.id}' class="mapList">
        <img class="mapListPic"
          src=${map.map_url}
          alt="map image">
        <div class="mapListDetails">
          <div>${map.map_title}</div>
          <div>Created by: Test Test</div>
          <div class="mapListIcons"></div>
        </div>
      </div>
      <div class"mapDescription">${map.map_description}</div>
    </section>
    `);
    $(`.${container}`).append(newDiv);
    // if user is logged in, create icons
    if ($('.logout').length){
      const icons = `
      <i class="fa-solid fa-heart"></i>
      <i class="fa-solid fa-pen-to-square"></i>`;
      newDiv.find('.mapListIcons').append(icons);

      icons.find(".fa-heart").on("click", () => {
        console.log(`Heart icon clicked for map ID: ${map.id}`);
      });

      icons.find(".fa-pen-to-square").on("click", () => {
        renderModal(editMapForm, map.id);
        console.log(`Edit icon clicked for map ID: ${map.id}`);
      });
    }
    populateMapArea(map.id)
  }
};

//renders nav area when a user is logged in
const renderNavArea = () => {
  $(".login").remove();
  const $newButtons = `
  <button class="discover reset button">Discover maps</button>
  <button class="createAMap reset button">Create a map</button>
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
  const $nonMemberArea = `
  <div class="discoverMapsArea">
    <div class="discoverMapsTitle">Discover Maps!</div>
  </div>
  <div class="mapArea">
    No potatoes here
  </div>`;
  $(".mainContainer").append($nonMemberArea);
  // renderMapArea(); need to try and figure out how to get a map object put inside
  // populate Discover maps
  $.ajax({
    type: "GET",
    url: "/maps",
  })
    .then((maps) => renderMapsList(maps, "discoverMapsArea"))
    .catch(function (xhr, status, error) {
      console.log("Error: " + error);
    });
};

//renders the member area
const renderMemberArea = (user) => {
  $(".mainContainer").empty();
  const $memberArea = `
  <section class="memberAreaContainer">
    <div class="myMapsContainer">
      <div class="myMapsArea">
        <section class="myMapsAreaContainer"></section>
      </div>
    </div>
    <div class="myFavMapsContainer">
      <div class="myFavMapsArea">
        <div class="myFavMapsTitle">My fav maps</div>
        <section class="myFavMapsAreaContainer"></section>
      </div>
    </div>
    <div class="myFavPinsContainer">
      <div class="myPinsArea">
        <div class="myFavPinsTitle">My fav pins</div>
        <section class="myFavPinsAreaContainer"></section>
      </div>
    </div>
  </section>
`;
  $(".mainContainer").append($memberArea);
  //2make an ajax call to get all related user information
  $.ajax({
    type: "GET",
    url: "/users-api/myinfo",
  }).then((data) => {
    //receive an object of user data from /myinfo route and use it to populate member page
    console.log("data:", data);
    // My Maps
    renderMapsList(data.maps, "myMapsArea");

    // My Fav Maps
    renderMapsList(data.favMaps, "myFavMapsArea");

    // My Fav Pins
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
