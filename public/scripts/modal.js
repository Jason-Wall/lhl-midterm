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
    .then(({ mapObj, api }) => {
      map = mapObj.mapData;
      const modalDiv = `
      <span class="strong">Edit Map</span>
      <br>
      <section class="edit-modal">
      <div class="edit-modal-left">
        <img class="popUpPic"
              src=${map.map_url}
              alt="map image">
              <label for="cover-photo">Cover Photo Url:</label>
              <input type="text" id="cover-photo" name="map-url" value="${map.map_url}" />
      </div>
      <div class="edit-modal-right">
        <label for="map-title">Map Title:</label>
        <input type="text" id="map-title" name="map-title" value="${map.map_title}" />
        <label for="map-description">Map Description:</label>
        <input type="text" id="map-description" name="map-description" value="${map.map_description}" />

        <label for="city">city:</label>
        <input type="text" id="map-city" name="city" value="${map.city}" />
        <label for="country">country:</label>
        <input type="text" id="map-country" name="country" value="${map.country}" />
      </div>
    </section>
    <div class="modal-buttons">
      <span class="accept">Accept Changes</span>
      <span class="cancel">Cancel</span>
    </div>`;
      $(".modal-content").append(modalDiv);
      forceFocusOnModal();
      $(".modal-content").find("input")[0].focus();

      // Event listener, accept changes and write to db. Close modal and update maps table.
      $(".accept").on("click", () => {
        const mapEdits = {
          map_id: id,
          map_title: $("#map-title").val(),
          map_description: $("#map-description").val(),
          map_url: $("#cover-photo").val(),
        };
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
const editPinForm = (pin) => {
  // Make request to get all pin info for the relevant pin.
  $.ajax({
    type: "GET",
    url: `/pins/${pin.id}`,
  })
    // Create a series of text boxes with prepopulated map info
    .then((pin) => {
      const modalDiv = `

    <section>
    <img class="PinListPic popUpPic"
    src=${pin.pin_url}
    alt="Pin image">
    <label for="cover-photo">Pin Url:</label>
    <input type="text" id="cover-photo" name="map-url" value="${pin.pin_url}" />
      <label for="pin-title">Pin Title:</label>
      <input type="text" id="pin-title" name="pin-title" value="${pin.pin_title}" /><br>
      <label for="pin-description">Pin Description:</label>
      <input type="text" id="pin-description" name="pin-description" value="${pin.pin_description}" />
      <label for="street-address">Street Address:</label>
      <input type="text" id="pin-street-address" name="pin-street-address" value="${pin.street_address}" /> <br>
      <label for="city">City:</label>
      <input type="text" id="pin-city" name="pin-city" value="${pin.city}" />
      <label for="country">Country:</label>
      <input type="text" id="pin-country" name="pin-country" value="${pin.country}" />
    </section>
    <div class="modal-buttons">
      <span class="acceptPinEdit">Accept Changes</span>
      <span class="cancel">Cancel</span>
    </div>`;
      $(".modal-content").append(modalDiv);
      forceFocusOnModal();
      $(".modal-content").find("input")[0].focus();

      // Event listener, accept changes and write to db. Close modal and update maps table.
      $(".acceptPinEdit").on("click", () => {
        const pinEdits = {
          id: pin.id,
          pin_title: $("#pin-title").val(),
          pin_description: $("#pin-description").val(),
          pin_url: $("#cover-photo").val(),
          street_address: $("#pin-street-address").val(),
          city: $("#pin-city").val(),
          country: $("#pin-country").val(),
        };
        $.ajax({
          method: "PATCH",
          url: `/pins/${pin.id}`,
          data: pinEdits,
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
    });
};
