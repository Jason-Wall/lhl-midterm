// create modal for edit:
const renderModal = (modalForm, id) => {
  const modalDiv = `
    <div class="modal">
      <div class="modal-content">
      </div>
    </div>`;
    $('body').prepend(modalDiv);

  $('.modal').on('click', (event) => {
    console.log(event.target)
    if (event.target == $('.modal')[0]) {
      $('.modal').remove();
    }
  });
  modalForm(id);
}


// Render Edit Map Form
const editMapForm = (id) => {
  console.log('edit map form, id:',id)



  const modalDiv = `
  <div class="edit-form">
        <p>this is an edit form</p>
      </div>`
$('.modal-content').append(modalDiv);
};







// Render Edit Pin Form
