let map;

async function MapPosition () {
    //const { Map } = await google.maps.importLibrary("maps");

    var mapProp = {
        center: new google.maps.LatLng(51.508742,-0.120850),
        zoom:5,
    };

    var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);

}

MapPosition();