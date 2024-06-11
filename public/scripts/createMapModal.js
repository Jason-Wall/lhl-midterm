// create modal for creating a new map:

// Create Map form for modal()
const createMapForm = (id) => {
  const modalDiv = `
      <div class="create-map-modal">
        <span class="strong">Create a New Map</span>
        <br>
        <label for="map-title">Title:</label>
        <input class="newTitle" type="text" name="map-title" value="" placeholder="title"/>

        <label for="map-city">City:</label>
        <input class="newCity" type="text" name="map-city" value="" placeholder="city"/>

        <label for="map-country">Country:</label>
        <input class="newCountry" type="text" name="map-country" value="" placeholder="country"/>
        <label for="map-description">Description:</label>
        <input class="newDescription" type="text" name="map-description" value="" placeholder="description"/>

        <label for="map-url">Url:</label>
        <input class="newUrl" type="text" name="map-url" value="" placeholder="url"/>
      </div>
    <div class="modal-buttons">
      <span class="create">Create Map!</span>
      <span class="cancel">Cancel</span>
    </div>`;
  $(".modal-content").append(modalDiv);
  forceFocusOnModal();
  // Focus to first instance of input:
  $(".modal-content").find("input")[0].focus();

  //Creates a map (updates maps db table) and closes modal
  $(".create").on("click", (event) => {
    const mapCreation = {
      user_id: id,
      map_title: $(".newTitle").val(),
      map_description: $(".newDescription").val(),
      map_url: $(".newUrl").val(),
      city: $(".newCity").val(),
      country: $(".newCountry").val(),
    };
    //Inserts to maps db table
    $.ajax({
      type: "POST",
      url: `/maps/${id}/create`,
      data: mapCreation,
    }).then(() => {
      $(".modal").off();
      $(".modal").remove();
      viewMemberArea();
    });
  });

  // Event listener - close modal on cancel.
  $(".cancel").on("click", () => {
    $(".modal").off();
    $(".modal").remove();
  });
};
