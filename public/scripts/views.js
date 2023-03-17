//Creates the members view
const viewMemberArea = () => {
  // Clear out existing content and event listeners
  $(".mainContainer").empty();
  $(".mainContainer").off();
  // Template for member area
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

  //Get data for all tables
  $.ajax({
    type: "GET",
    url: "/users-api/myinfo",
  }).then((data) => {
    renderMapsList(data.maps, "myMapsArea");
    renderMapsList(data.favMaps, "myFavMapsArea");
    renderMapsList(data.contributeMaps, "myContributionsArea");
  });
};


// Create the All Maps view
const viewAllMaps = () => {
  // Clear out existing content and event listeners
  $(".mainContainer").empty();
  $(".mainContainer").off();
  // Template for all maps
  const $discoverMaps = `<div class="discoverMapsArea">
    <div class="discoverMapsTitle strong">Discover Maps!</div>
    <section class="mapListContainer">
    </section>
  </div>
  <div class="mapArea"></div>`;
  $(".mainContainer").append($discoverMaps);

  //Get data for all maps
  $.ajax({
    type: "GET",
    url: "/maps",
  })
    .then(({ maps, api }) => {
      renderMapsList(maps, "discoverMapsArea");
      renderBlankMap(api);
    })
    .catch(function (xhr, status, error) {
      console.log("Error: " + error);
    });
};
