// Populates map lists on member page and allmaps view.

// Accepts maps as an object of maps, class name of the container
// to be appended to. eg. <div class="test"> would be 'test'
const renderMapsList = (maps, container) => {
  // clear target container of divs.
  $(`.${container}`).find(".mapListContainer").remove();

  for (let map of maps) {
    const newDiv = $(`
    <section class="mapListContainer">
      <div id = '${map.id}' class="mapList map_id_${map.id}">
        <img class="mapListPic"
          src=${map.map_url}
          alt="map image">
        <div class="mapListDetails">
          <div class="title strong">${map.map_title}</div>
          <div class="createdBy">Created by: ${map.name}</div>
          <div class="mapListIcons"></div>
        </div>
      </div>
      <div class = "mapDescription">${map.map_description}</div>
    </section>
    `);
    $(`.${container}`).append(newDiv);

    // if user is logged in, create icons
    if ($(".logout").length) {
      const icons = $(`
      <i class="icon map-fav fa-solid fa-heart"></i>
      <i class="icon fa-solid fa-pen-to-square"></i>
      <i class="icon fa-regular fa-trash-can"></i>`);
      newDiv.find(".mapListIcons").append(icons);

      // Icon event listeners
      newDiv.find(".fa-heart").on("click", function (event) {
        event.stopPropagation();
        toggleFavourite(map.id).then(() => {
          if ($(".myFavMapsContainer").length) {
            return $.ajax({
              type: "GET",
              url: "/users-api/myinfo",
            }).then((data) => {
              renderMapsList(data.favMaps, "myFavMapsArea");
            });
          } else {
            assignFavouritesClass();
          }
        });
      });
    }

    newDiv.find(".fa-pen-to-square").on("click", function (event) {
      event.stopPropagation();
      renderModal(editMapForm, map.id);
    });
    newDiv.find(".fa-trash-can").on("click", function (event) {
      event.stopPropagation();
      renderModal(deleteMapForm, map.id);
    });
    populateMapArea(map.id);
  }
  assignFavouritesClass();
};

// toggles favourite status in db for individual map.
const toggleFavourite = (map_id) => {
  return $.ajax({
    method: "PATCH",
    url: `/maps/${map_id}/favs`,
  });
};

//Assign favourite class to all available maps with favourite status = true.
const assignFavouritesClass = () => {
  $(".map-fav").removeClass("favourite");
  $.ajax({
    type: "GET",
    url: `/maps/favs`,
  })
    .then((favmaps) => {
      for (let favmap of favmaps) {
        $(`.map_id_${favmap.id}`).each(function () {
          $(this).find(".fa-heart").addClass("favourite");
        });
      }
    })
    .catch(function (xhr, status, error) {
      console.log("Error: " + error, status, xhr);
    });
};

// add all the elements inside modal which you want to make focusable
const forceFocusOnModal = () => {
  const focusableElements = "input";
  const modal = $(".modal"); // select the modal by it's id

  const firstFocusableElement = modal.find(focusableElements)[0]; // get first element to be focused inside modal
  const focusableContent = modal.find(focusableElements);
  const lastFocusableElement =
    modal.find(focusableElements)[focusableContent.length - 1]; // get last element to be focused inside modal

  $(document).on("keydown", function (e) {
    let isTabPressed = e.key === "Tab" || e.keyCode === 9;

    if (!isTabPressed) {
      return;
    }
    if (e.shiftKey) {
      // if shift key pressed for shift + tab combination
      if (document.activeElement === firstFocusableElement) {
        lastFocusableElement.focus(); // add focus for the last focusable element
        e.preventDefault();
      }
    } else {
      // if tab key is pressed
      if (document.activeElement === lastFocusableElement) {
        // if focused has reached to last focusable element then focus first focusable element after pressing tab
        firstFocusableElement.focus(); // add focus for the first focusable element
        e.preventDefault();
      }
    }
  });

  firstFocusableElement.focus();
};
