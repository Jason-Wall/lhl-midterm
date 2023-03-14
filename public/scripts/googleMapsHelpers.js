let lat;
let long;
// let google_api_key = process.env.GOOGLE_MAPS_API_KEY;

function initMap() {
  let mapSetUp = {
    center: new google.maps.LatLng(lat, long),
    zoom: 20,
  };
  googleMap = new google.maps.Map(
    document.getElementById(`googleMap`),
    mapSetUp
  );
}

const renderMapArea = (map) => {
  // let geocoder = new google.maps.Geocoder({
  //   address: map.city,
  //   location: LatLng,
  //   placeId: string,
  //   bounds: LatLngBounds,
  //   componentRestrictions: GeocoderComponentRestrictions,
  //   region: string
  //  });
  mapID = map.id;
  // mapCity = map
  lat = 49.281059;
  long = -123.119019;
  // console.log(map)
  if ($(".googleMap").length > 0) {
    initMap();
    return;
  }
  const $mapDiv = `
        <div id="googleMap" class="googleMap" style="width:100%;height:100%;"></div>
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBvCCsFn9dt3dc9kHCrRJvp0D44pNnikvg&callback=initMap"
 defer></script>
        `;
  $(".mapArea").empty();
  $(".mapArea").append($mapDiv);
};
