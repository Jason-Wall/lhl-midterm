// create modal for creating a new pin:

// Create pin form for modal()
const createPin = (mapId) => {
  const modalDiv = `
    <div class="create-map-modal">
      <label for="pin-title">Pin Title:</label>
      <input type="text" id="pin-title" name="pin-title" value="" placeholder="title"/>

      <label for="pin-description">Pin Description:</label>
      <input type="text" id="pin-description" name="pin-description" value="" placeholder="description"/>

      <label for="pin-street-address">Street Address:</label>
      <input type="text" id="pin-street-address" name="pin-street-address" value="" placeholder="1589 main st"/>

      <label for="pin-city">City:</label>
      <input type="text" id="pin-city" name="pin-city" value="" placeholder="city"/>

      <label for="pin-country">Country:</label>
      <input type="text" id="pin-country" name="pin-country" value="" placeholder="country"/>

      <label for="pin-url">Url:</label>
      <input type="text" id="pin-url" name="pin-url" value="" placeholder="url"/>
    </div>
    <div class="modal-buttons">
      <span class="createNewPin">Create Pin!</span>
      <span class="cancel">Cancel</span>
    </div>`;
  $(".modal-content").append(modalDiv);
  forceFocusOnModal();
  $(".modal-content").find("input")[0].focus();

  //Creates a pin (updates pins db table) and closes modal
  $(".createNewPin").on("click", () => {
    const pinCreation = {
      map_id: mapId,
      user_id: 1,
      pin_title: $("#pin-title").val(),
      pin_description: $("#pin-description").val(),
      pin_url: $("#pin-url").val(),
      street_address: $("#pin-street-address").val(),
      city: $("#pin-city").val(),
      country: $("#pin-country").val(),
    };
    //updates pins db table
    $.ajax({
      type: "POST",
      url: `/pins/${mapId}/create`,
      data: pinCreation,
    }).then(({ mapObj, api }) => {
      $(".modal").off();
      $(".modal").remove();
      renderMapArea(mapObj, api);
    });
  });

  // Event listener - close modal on cancel.
  $(".cancel").on("click", () => {
    $(".modal").off();
    $(".modal").remove();
  });
};
