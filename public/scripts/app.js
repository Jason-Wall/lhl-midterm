// Scripts that run on page load.
$(document).ready(() => {
  resetNavArea();
  viewAllMaps();
  populateMapArea();
});


const populateMapArea = (mapID) => {
  // console.log(mapID);
  $(`#${mapID}`).on("click", () => {
    $.ajax({
      type: "GET",
      url: `/maps/${mapID}`, //this will be received in the backend route with the help of req.params
      //data: {mapid: mapID} //This will be received through req.body in the backend route
      // data: {mapid: mapID}
    })
      .then(({ map, api }) => {
        renderMapArea(map, api);
      })
      .catch(function (xhr, status, error) {
        console.log("Error: " + error);
      });
  });
};
