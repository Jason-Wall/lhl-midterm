// Client facing scripts here
$(document).ready(() => {
  // addNewDiv();  // This is a sample function for SPA. In the future move all functions into their own helper function files.
  populateMapsList(); // This function establishes all initial event listeners around the page. See below.
  populateMapArea();

});

//Jasons demo:
// const addNewDiv = () => {
//   $('.discoverMapsTitle').on('click', () => {
//     $.ajax({
//       type: 'GET',
//       url: '/maps',
//     })
//       .then((names) => {
//         console.log(names);
//         for (let entry of names) {
//           const newDiv = $('<div>').text(entry.name);
//           $('.discoverMapsArea').append(newDiv);
//         };
//       })
//       .catch(function (xhr, status, error) {
//         console.log("Error: " + error);
//       })
//   })
// }

const populateMapsList = () => {
  $('.logo').on('click', () => {
    $.ajax({
      type: 'GET',
      url: '/maps',
    })
    .then((maps) => renderMapsList(maps))
    .catch(function (xhr, status, error) {
      console.log("Error: " + error);
    })
  })
}

const populateMapArea = (mapID) => {
  $(`#${mapID}`).on('click', () => {
    $.ajax({
      type: 'GET',
      url: `/maps/${mapID}` //this will be received in the backend route with the help of req.params
      //data: {mapid: mapID} //This will be received through req.body in the backend route
      // data: {mapid: mapID}
    })
    .then((map) =>
    renderMapArea(map),
  )
    .catch(function (xhr, status, error) {
      console.log("Error:", xhr, status, error);
      console.log("Error: " + error);
    })
  })
}
