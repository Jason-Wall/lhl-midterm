//renders the member area
const viewMemberArea = () => {
  $(".mainContainer").empty();
  const $memberArea = `
  <section class="memberAreaContainer">
    <div class="myMapsContainer">
      <div class="myMapsArea">
      <div class="myMapsTitle strong">My maps</div>
        <section class="myMapsAreaContainer"></section>
      </div>
    </div>
    <div class="myFavMapsContainer">
      <div class="myFavMapsArea">
        <div class="myFavMapsTitle strong">My fav maps</div>
        <section class="myFavMapsAreaContainer"></section>
      </div>
    </div>
    <div class="myFavPinsContainer">
      <div class="myPinsArea">
        <div class="myFavPinsTitle strong">My fav pins</div>
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
    // console.log("data:", data);
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

const viewAllMaps = () => {
  $(".mainContainer").empty();
  const $discoverMaps = `<div class="discoverMapsArea">
    <div class="discoverMapsTitle strong">Discover Maps!</div>
    <section class="mapListContainer">
    </section>
  </div>
  <div class="mapArea">
  No potatoes here</div>`;
  $(".mainContainer").append($discoverMaps);

  $.ajax({
    type: "GET",
    url: "/maps",
  })
    .then((maps) => renderMapsList(maps, "discoverMapsArea"))
    .catch(function (xhr, status, error) {
      console.log("Error: " + error);
    });
};
