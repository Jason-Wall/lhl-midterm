// Client facing scripts here
$(document).ready(() => {
  // addNewDiv();  // This is a sample function for SPA. In the future move all functions into their own helper function files.
  populateMapsList(); // This function establishes all initial event listeners around the page. See below.
  populateMapArea();
  // renderMapArea();
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

//users example
// Client facing scripts here
// $(() => {
//   $(".login").on("click", () => {
//     $.ajax({
//       method: "GET",
//       url: "/api/users",
//     }).done((response) => {
//       const $usersList = $("#users");
//       $usersList.empty();

//       for (const user of response.users) {
//         $(`<li class="user">`).text(user.name).appendTo($usersList);
//       }
//     });
//   });
// });

const populateMapsList = () => {
  $(".logo").on("click", () => {
    $.ajax({
      type: "GET",
      url: "/maps",
    })
      .then((maps) => renderMapsList(maps))
      .catch(function (xhr, status, error) {
        console.log("Error: " + error);
      });
  });
};

const populateMapArea = (mapID) => {
  console.log(mapID)
  $(`#${mapID}`).on('click', () => {
    $.ajax({
      type: 'GET',
      url: `/maps/${mapID}` //this will be received in the backend route with the help of req.params
      //data: {mapid: mapID} //This will be received through req.body in the backend route
      // data: {mapid: mapID}
    })
    .then((map) => {
    renderMapArea(map)
    }
  )
    .catch(function (xhr, status, error) {
      console.log("Error: " + error);
    })
  });

  //login event listener
  $(".buttons").on("click", ".login", () => {
    $.ajax({
      type: "POST",
      url: "/users-api/login/1",
    }).then((response) => {
      console.log(response);
      renderNavArea();
      renderMemberArea(response.user); //1
    });
  });
  //the below handler was not working for .logout button because it was created after the document loaded.  I got around this by targeting the parent .buttons and then adding a second parameter to the .on function of .logout
  $(".buttons").on("click", ".logout", () => {
    $.ajax({
      type: "POST",
      //change the below to /users/logout
      url: "/users-api/logout",
    }).then((response) => {
      console.log(response);
      resetNavArea();
    });
  });
};
