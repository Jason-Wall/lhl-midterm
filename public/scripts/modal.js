// create modal for edit:
const renderModal = (modalForm, id) => {
  const modalDiv = `
    <div class="modal">
      <div class="modal-content">
      </div>
    </div>`;
    $('body').prepend(modalDiv);

  $('.modal').on('click', (event) => {
    if (event.target == $('.modal')[0]) {
      $('.modal').remove();
    }
  });
  modalForm(id);
}


// Render Edit Map Form
const editMapForm = (id) => {

  console.log('edit map form, id:',id)
  $.ajax({
    type: 'GET',
    url: `/maps/${id}`
  })
  .then((map) =>{
    const mapTitle = map.map_title;
    const mapDesc = map.map_description;
    console.log(mapDesc, mapTitle);
    const modalDiv = `
    <form>
      <label for="map-title">Map Title:</label>
      <input type="text" id="map-title" name="map-title" value="${map.map_title}" />
      <label for="map-description">Map Description:</label>
      <input type="text" id="map-description" name="map-description" value="${map.map_description}" />
    </form>
    <div class="modal-buttons">
      <span class="accept">Accept Changes</span>
      <span class="cancel">Cancel</span>
    </div>`;
  $('.modal-content').append(modalDiv);



  $('.cancel').on('click', () => {
      $('.modal').remove();
  });





  })





};







// Render Edit Pin Form
