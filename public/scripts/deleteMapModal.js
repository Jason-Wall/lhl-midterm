// create modal for creating a deleting a map:

// Render Delete Map Form into modal
const deleteMapForm = (mapId) => {
  const modalDiv = `
  <section><h3>Are you sure you want to delete this map?</h3></section>
    </section>
    <div class="modal-buttons">
      <span class="deleteMap">DELETE</span>
      <span class="cancel">Cancel</span>
    </div>`;
  $(".modal-content").append(modalDiv);
  $('.modal-content').find('.cancel').focus();

  //Deletes the map (updates maps db table) and closes modal
  $(".deleteMap").on("click", () => {
    const mapDeletion = {
      map_id: mapId,
    };
    //updates maps db table
    $.ajax({
      type: "DELETE",
      url: `/maps/delete`,
      data: mapDeletion,
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
