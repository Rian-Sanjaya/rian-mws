function showMap() {
    var mymap = L.map('mapid').setView([-8.701660,115.169856], 14);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 20,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1Ijoicmlhbi1zaiIsImEiOiJjam03bXBkNHYwOTZlM3FsaXp3cnN4cTVhIn0.I6eA_ZT_ZQ4KhYJKQVojZw'
    }).addTo(mymap);

    var arr_marker= [
        [-8.695329,115.188389],
        [-8.714446,115.185213],
        [-8.703265,115.218515],
        [-8.712413,115.202808],
        [-8.701660,115.169856]
    ];

    for (m of arr_marker) {
        let marker = L.marker(m).addTo(mymap);
        marker.bindPopup("<b>Resto top disini</b><br>Yes!").openPopup();
    }

    // var marker = L.marker([-8.701660,115.169856]).addTo(mymap);
    // marker.bindPopup("<b>Resto top disini</b><br>Yes!").openPopup();

    var circle = L.circle([-8.701660,115.169856], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 500
        }).addTo(mymap);
    circle.bindPopup("Ini sebuah circle.");

    // var popup = L.popup().setLatLng([-8.703315, 115.168869]).setContent("Restoran terbaik disini.").openOn(mymap);
    mymap.on('click', onMapClick);

    var popup = L.popup();

    function onMapClick(e) {
        // console.log("Peta diklik pada posisi " + e.latlng);
        popup.setLatLng(e.latlng).setContent("Peta diklik pada posisi: <br>" + e.latlng.toString()).openOn(mymap);
    }
}



showMap();