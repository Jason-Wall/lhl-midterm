// Renders
const renderMapsList = (maps) => {
  $('.mapList').remove()
  for (let map of maps) {
    const newDiv = $(`
    <div id = '${map.id}' class = 'mapList'>
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
    populateMapArea()
  };
};

const renderMapArea = () => {
        const $mapDiv = `
        <div id="googleMap4" style="width:100%;height:100%;"></div>
        <script>
        function initMap() {
          let mapProp = {
            center:new google.maps.LatLng(49.281059, -123.119019),
            zoom:20,
          };
          let map = new google.maps.Map(document.getElementById("googleMap4"),mapProp);
          }
</script>
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBvCCsFn9dt3dc9kHCrRJvp0D44pNnikvg&callback=initMap"></script>
        `;
        $('.mapArea').empty();
        $('.mapArea').append($mapDiv);
};
