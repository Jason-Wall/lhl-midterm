// Scripts that run on page load.
$(document).ready(() => {
  resetNavArea();
  logoOnClick();
  viewAllMaps();
  populateMapArea();
});


const populateMapArea = (mapID) => {
  // console.log(mapID);
  $(`.map_id_${mapID}`).on("click", () => {
    $.ajax({
      type: "GET",
      url: `/maps/${mapID}`, //this will be received in the backend route with the help of req.params
      //data: {mapid: mapID} //This will be received through req.body in the backend route
      // data: {mapid: mapID}
    })
      .then(({ mapObj, api }) => {
        renderMapArea(mapObj, api);
      })
      .catch(function (xhr, status, error) {
        console.log("Error: " + error, status, xhr);
      });
  });
};
