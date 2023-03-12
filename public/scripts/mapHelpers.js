// Renders
const renderMapsList = (maps) => {
  console.log('map helpers');
  for (let entry of maps) {
    const newDiv = $('<div>').text(entry.id);
    $('.discoverMapsArea').append(newDiv);
  };
};

