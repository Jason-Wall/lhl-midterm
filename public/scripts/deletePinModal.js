//delete pin
const deletePin = (pinId) => {
  // Create buttons
  const modalDiv = `
  <section><h3>Are you sure you want to delete this pin?</h3></section>
    </section>
    <div class="modal-buttons">
      <span class="deletePin">DELETE</span>
      <span class="cancel">Cancel</span>
    </div>`;
  $(".modal-content").append(modalDiv);

  //create pin listener -deletes the pin (updates maps db table) and closes modal
  $(".deletePin").on("click", () => {
    console.log("pinID", pinId);
    const pinDeletion = {
      pin_id: pinId,
    };
    //updates maps db table
    $.ajax({
      type: "DELETE",
      url: `/pins/delete`,
      data: pinDeletion,
    }).then(({ mapObj, api }) => {
      // need to refesh the maps column talk about with Jason
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
