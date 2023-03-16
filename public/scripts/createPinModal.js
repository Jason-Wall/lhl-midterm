// create modal for creating a new map:

// Render Create Map Form into modal
const createPin = (mapId) => {
  // Create a series of text boxes
  const modalDiv = `
    <section>
    <label for="pin-title">Pin Title:</label>
    <input type="text" id="pin-title" name="pin-title" value="" placeholder="title"/>

    <label for="pin-description">Pin Description:</label>
    <input type="text" id="pin-description" name="pin-description" value="" placeholder="description"/>

    <label for="street-address">Street Address:</label>
    <input type="text" id="pin-street-address" name="pin-street-address" value="" placeholder="1589 main st"/>

    <label for="city">City:</label>
    <input type="text" id="pin-city" name="pin-city" value="" placeholder="city"/>

    <label for="country">Country:</label>
    <input type="text" id="pin-country" name="pin-country" value="" placeholder="country"/>

    </section>
    <div class="modal-buttons">
      <span class="create">Create Pin!</span>
      <span class="cancel">Cancel</span>
    </div>`;
  $(".modal-content").append(modalDiv);

  //create map listener -creates a map (updates maps db table) and closes modal
  $(".create").on("click", () => {
    const pinCreation = {
          map_id: mapId,
          user_id: 1,
          pin_title: $("#pin-title").val(),
          pin_description: $("#pin-description").val(),
          pin_url: $("#cover-photo").val(),
          street_address: $("#pin-street-address").val(),
          city: $("#pin-city").val(),
          country: $("#pin-country").val()
    };
    //updates maps db table
    $.ajax({
      type: "POST",
      url: `/pins/${id}/create`,
      data: pinCreation,
    }).then(() => {
      // need to refesh the maps column talk about with Jason
      $(".modal").off();
      $(".modal").remove();
      renderMap1();
    });
  });

  // Event listener - close modal on cancel.
  $(".cancel").on("click", () => {
    $(".modal").off();
    $(".modal").remove();
  });
};
