// Scripts that run on page load.
$(document).ready(() => {
  resetNavArea();
  logoOnClick();
  viewAllMaps();
  populateMapArea();
});


const populateMapArea = (mapID) => {
  $(`.map_id_${mapID}`).on("click", () => {
    $.ajax({
      type: "GET",
      url: `/maps/${mapID}`,
    })
      .then(({ mapObj, api }) => {
        renderMapArea(mapObj, api);
      })
      .catch(function (xhr, status, error) {
        console.log("Error: " + error, status, xhr);
      });
  });
};
