// Renders
const renderMapsList = (maps) => {
  $('.mapList').remove()
  for (let map of maps) {
    const newDiv = $(`
    <div class = 'mapList'>
      <div>pic</div>
      <div>
        <div>${map.map_title}</div>
        <div>${map.map_description}</div>
        <i>fav</i>
        <i>edit</i>
      </div>
    </div>
    `)
    $('.discoverMapsArea').append(newDiv);
  };
};

