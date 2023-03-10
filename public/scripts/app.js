// Client facing scripts here
$(document).ready(() => {
  addNewDiv();  // This is a sample function for SPA. In the future move all functions into their own helper function files.


});


const addNewDiv = () => {
  $('.test').on('click', () => {
    $.ajax({
      type: 'GET',
      url: '/maps',
    })
      .then((names) => {
        console.log(names);
        for (let entry of names) {
          const newDiv = $('<div>').text(entry.name);
          $('body').append(newDiv);
        };
      })
      .catch(function (xhr, status, error) {
        console.log("Error: " + error);
      })
  })
}
