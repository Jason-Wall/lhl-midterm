//renders nav area when a user is logged in
const renderNavArea = () => {
  $(".login").remove();
  $(".buttons").off();
  const $newButtons = `
  <button class="discover reset button">Discover maps</button>
  <button class="createAMap reset button">Create a map</button>
  <button class="myMaps reset button">My maps</button>
  <button class="logout reset button">Logout</button>`;
  $(".buttons").append($newButtons);
  discoverMapsEventListen();
  createMapEventListen();
  myMapsEventListen();
  logoutEventListen();
};

//resets the nav area when logged out
const resetNavArea = () => {
  $(".mainContainer").empty();
  $(".reset").remove();
  $(".buttons").off();
  const $login = $(`<button class="login button">Login</button>`);
  $(".buttons").append($login);
  loginEventListen();
};

//EVENT LISTENERS
const loginEventListen = () => {
  $(".login").on("click", () => {
    $.ajax({
      type: "POST",
      url: "/users-api/login/1",
    }).then((response) => {
      renderNavArea();
      viewMemberArea(response.user);
    });
  });
};

//logout event listener
const logoutEventListen = () => {
  $(".logout").on("click", () => {
    $.ajax({
      type: "POST",
      url: "/users-api/logout",
    }).then((response) => {
      resetNavArea();
      viewAllMaps();
    });
  });
};

//discover maps listener
const discoverMapsEventListen = () => {
  $(".buttons").on("click", ".discover", () => {
    viewAllMaps();
  });
};

//my maps listener
const myMapsEventListen = () => {
  $(".buttons").on("click", ".myMaps", () => {
    $.ajax({
      type: "POST",
      url: "/users-api/login/1",
    }).then((response) => {
      viewMemberArea(response.user);
    });
  });
};

//create a map listener (takes you to createMapModal)
const createMapEventListen = () => {
  $(".buttons").on("click", ".createAMap", () => {
    $.ajax({
      type: "GET",
      url: "/users-api/myinfo",
    }).then((data) => {
      renderModal(createMapForm, data.maps[0].user_id);
    });
  });
};

const logoOnClick = () =>{
  $(".logo").on("click", () => {
    viewAllMaps();
  })
};
