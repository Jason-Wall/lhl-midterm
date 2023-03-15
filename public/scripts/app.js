// Client facing scripts here
$(document).ready(() => {
  populateMapsList(); // This function establishes all initial event listeners around the page. See below.
  populateMapArea();

  //login event listener
  $(".buttons").on("click", ".login", () => {
    $.ajax({
      type: "POST",
      url: "/users-api/login/1",
    }).then((response) => {
      renderNavArea();
      //1calls renderMemberArea with the user object
      renderMemberArea(response.user);
    });
  });

  //logout event listener
  $(".buttons").on("click", ".logout", () => {
    $.ajax({
      type: "POST",
      url: "/users-api/logout",
    }).then((response) => {
      resetNavArea();
    });
  });

  //discover maps listener
  $(".buttons").on("click", ".discover", () => {
    $(".mainContainer").empty();
    const $discoverMaps = `<div class="discoverMapsArea">
      <div class="discoverMapsTitle">Discover Maps!</div>
      <section class="mapListContainer">
      </section>
    </div>
    <div class="mapArea">No potatoes here</div>`;
    $(".mainContainer").append($discoverMaps);
  });

  //my maps listener
  $(".buttons").on("click", ".myMaps", () => {
    $.ajax({
      type: "POST",
      url: "/users-api/login/1",
    }).then((response) => {
      // console.log(response);
      //1calls renderMemberArea with the user object
      renderMemberArea(response.user);
    });
  });

  //create a map listener (takes you to createMapModal)
  $(".buttons").on("click", ".createAMap", () => {
    $.ajax({
      type: "GET",
      url: "/users-api/myinfo",
    }).then((data) => {
      renderModal(createMapForm, data.user[0].id);
    });
  });
});

const populateMapsList = () => {
  $(".logo").on("click", () => {
    $.ajax({
      type: "GET",
      url: "/maps",
    })
      .then((maps) => renderMapsList(maps, "discoverMapsArea"))
      .catch(function (xhr, status, error) {
        console.log("Error: " + error);
      });
  });
};

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
