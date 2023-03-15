// Accepts maps as an object of maps, class name of the container
// to be appended to. eg. <div class="test"> would be 'test'
const renderMapsList = (maps, container) => {
  $(`.${container}`).find(".mapListContainer").remove();
  for (let map of maps) {
    const newDiv = $(`
    <section class="mapListContainer">
      <div id = '${map.id}' class="mapList map_id_${map.id}">
        <img class="mapListPic"
          src=${map.map_url}
          alt="map image">
        <div class="mapListDetails">
          <div>${map.map_title}</div>
          <div>Created by: ${map.name}</div>
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
      <i class="fa-solid fa-heart"></i>
      <i class="fa-solid fa-pen-to-square"></i>
      <i class="fa-regular fa-trash-can"></i>`);
      newDiv.find(".mapListIcons").append(icons);

      newDiv.find(".fa-heart").on("click", () => {
        console.log(`Heart icon clicked for map ID: ${map.id}`);
      });

      newDiv.find(".fa-pen-to-square").on("click", () => {
        renderModal(editMapForm, map.id);
        console.log(`Edit icon clicked for map ID: ${map.id}`);
      });
      newDiv.find(".fa-trash-can").on("click", () => {
        console.log("clicked trash can");
        renderModal(deleteMapForm, map.id);
      });
    }
    populateMapArea(map.id);

  }
  //Assign favourite class
  if ($(".logout").length) {
    $.ajax({
      type: "GET",
      url: `/maps/favs`
    })
      .then((favmaps) => {
        for (let favmap of favmaps) {
          $(`.map_id_${favmap.id}`).each(function () {
            $(this).find('.fa-heart').addClass('favourite')
          })
        }
      })
      .catch(function (xhr, status, error) {
        console.log("Error: " + error, status, xhr);
      });
  }
};




