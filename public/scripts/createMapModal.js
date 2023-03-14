// create modal for edit:
const renderMapModal = (modalForm, id) => {
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
const createMapForm = (id) => {
  // Create a series of text boxes
  const modalDiv = `
    <section>
    <div><label for="map-title">Title:</label>
    <input type="text" name="map-title" value="" placeholder="title"/>

    <label for="map-city">City:</label>
    <input type="text" name="map-city" value="" placeholder="city"/>

    <label for="map-country">Country:</label>
    <input type="text" name="map-country" value="" placeholder="country"/></div>

    <div><label for="map-description">Description:</label>
    <input type="text" name="map-description" value="" placeholder="description"/>

    <label for="map-url">Url:</label>
    <input type="text" name="map-url" value="" placeholder="url"/></div>

    </section>
    <div class="modal-buttons">
      <span class="accept">Accept Changes</span>
      <span class="cancel">Cancel</span>
    </div>`;
  $(".modal-content").append(modalDiv);

  //create map listener -creates a map (updates maps db table) and closes modal
  $(".buttons").on("click", ".create", () => {
    // const mapCreation = {
    //   map_id: id,
    //   map_title: $("#map-title").val(),
    //   map_description: $("#map-description").val(),
    //   map_url: $("#cover-photo").val(),
    // };
    //   //updates maps db table
    //   $.ajax({
    //     type: "POST",
    //     url: `/maps/${id}/create`,
    //     data: mapCreate,
    //   }).then((response) => {
    //     console.log(response);
    //     // need to refesh the maps column
    //     $(".modal").remove();
    //   });
  });

  // Event listener - close modal on cancel.
  $(".cancel").on("click", () => {
    $(".modal").remove();
  });
};
