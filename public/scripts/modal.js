// create modal for edit:
const renderModal = (modalForm, id) => {
  const modalDiv = `
    <div class="modal">
      <div class="modal-content">
      </div>
    </div>`;
  $("body").prepend(modalDiv);

  $(".modal").on("click", (event) => {
    if (event.target == $(".modal")[0]) {
      $(".modal").remove();
    }
  });
  modalForm(id);
};

// Render Edit Map Form
const editMapForm = (id) => {
  // Make request to get all map info for the relevant map.
  $.ajax({
    type: "GET",
    url: `/maps/${id}`,
  })
    // Create a series of text boxes with prepopulated map info
    .then((map) => {
      const modalDiv = `
    <img class="mapListPic"
          src=${map.map_url}
          alt="map image">
          <label for="cover-photo">Map Description:</label>
          <input type="text" id="cover-photo" name="map-url" value="${map.map_url}" />
    <section>
      <label for="map-title">Map Title:</label>
      <input type="text" id="map-title" name="map-title" value="${map.map_title}" />
      <label for="map-description">Map Description:</label>
      <input type="text" id="map-description" name="map-description" value="${map.map_description}" />
    </section>
    <div class="modal-buttons">
      <span class="accept">Accept Changes</span>
      <span class="cancel">Cancel</span>
      <span class="delete">Delete</span>
    </div>`;
      $(".modal-content").append(modalDiv);

      // Event listener, accept changes and write to db. Close modal and update maps table.
      $(".accept").on("click", () => {
        const mapEdits = {
          map_id: id,
          map_title: $("#map-title").val(),
          map_description: $("#map-description").val(),
          map_url: $("#cover-photo").val(),
        };
        // console.log("accept button", mapEdits);
        $.ajax({
          method: "PATCH",
          url: `/maps/${id}`,
          data: mapEdits,
        }).then(() => {
          $(".modal").off();
          $(".modal").remove();
          viewMemberArea();
          // Need to refresh the maps column. Work with Jenny on this.
        });
      });

      // Event listener - close modal on cancel.
      $(".cancel").on("click", () => {
        $(".modal").off();
        $(".modal").remove();
      });
    });
};

// Render Edit Pin Form
