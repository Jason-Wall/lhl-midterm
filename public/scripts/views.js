//renders the member area
const viewMemberArea = () => {
  $(".mainContainer").empty();
  $(".mainContainer").off();
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
        <div class="myFavMapsTitle strong">My favourite maps</div>
        <section class="myFavMapsAreaContainer"></section>
      </div>
    </div>
    <div class="myMapContributions">
      <div class="myContributionsArea">
        <div class="myContributions strong">Map contributions</div>
        <section class="myContributionsAreaContainer"></section>
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
    renderMapsList(data.contributeMaps, "myContributionsArea");
  });
};

const viewAllMaps = () => {
  $(".mainContainer").empty();
  $(".mainContainer").off();

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
    .then(({ maps, api }) => {
      console.log(maps);
      renderMapsList(maps, "discoverMapsArea");
      renderBlankMap(api);
    })
    .catch(function (xhr, status, error) {
      console.log("Error: " + error);
    });
};
