// Client facing scripts here
$(document).ready(() => {
  addNewDiv();  // This is a sample function for SPA. In the future move all functions into their own helper function files.


});

//Jasons demo:
const addNewDiv = () => {
  $('.discoverMapsTitle').on('click', () => {
    $.ajax({
      type: 'GET',
      url: '/maps',
    })
      .then((names) => {
        console.log(names);
        for (let entry of names) {
          const newDiv = $('<div>').text(entry.name);
          $('.discoverMapsArea').append(newDiv);
        };
      })
      .catch(function (xhr, status, error) {
        console.log("Error: " + error);
      })
  })
}
