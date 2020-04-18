var data_1 = emissions_data;
//console.log(emissions_data);
//convert file to GeoJson
var jsonFeatures = [];


Object.entries(data_1).forEach(([key, value]) => {
    //get Country Names
    //console.log(key);
    //get Latitude
    //value.Latitude
    //get longitude
    //console.log(value.Longitude);
    var pct_change= value.Percent_Change
    var lat = value.Latitude;
    var lon = value.Longitude;

    var feature = {type: 'Feature',
        properties: value.pct_change,
        geometry: {
            type: 'Point',
            coordinates: [lat,lon]
        }
    };

    jsonFeatures.push(feature);
    // Once we get a response, send the data.features object to the createFeatures function
    createFeatures(data_1);
});

var geoJson_emit = { type: 'FeatureCollection', features: jsonFeatures};


//earthquakeData= data
function createFeatures(data) {
    function getRadius(pct_change) {
        if (pct_change == 0) {
            return 1;
        }
        return pct_change * 1;
    }
    function getColor(pct_change) {
        switch (true) {
            case pct_change > 3.1:
                return "#ea2c2c";
            case pct_change > 2.75:
                return "#ea822c";
            case pct_change > 2.25:
                return "#ee9c00";
            case pct_change > 1.75:
                return "#eecc00";
            case pct_change > .1:
                return "#d4ee00";
            default:
                return "#98ee00";
        }
    }
    function styleinfo(value) {
        return {
            opacity: 1,
            fillOpacity: 1,
            fillColor: getColor(pct_change),
            color: "#000",
            radius: getRadius(pct_change),
            stroke: true,
            weight: 0.5
        }
    }  // Define a function we want to run once for each feature in the features array
    // Give each feature a popup describing the place and time of the earthquake
    //function onEachFeature([Latitude, Longitude], layer) {
    // layer.bindPopup("<h3>" + Country_name +
    // "</h3><hr><p>" + new Date(feature.properties.time) + "</p> <hr> <h3> Magnitute : " + percent_change + "</h3>");
  // Create a GeoJSON layer containing the features array on the earthquakeData object
// Run the onEachFeature function once for each piece of data in the array
    var countries = L.geoJSON(geoJson_emit, {
        pointToLayer: function(feature) 
        {console.log(feature);
            return L.circleMarker([lat, lon]);},

    style: styleinfo
    }); 
 // Sending our earthquakes layer to the createMap function
createMap(countries);
}
function createMap(countries) {  // Define streetmap and darkmap layers
    var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.streets",
        accessToken: API_KEY
    }); 
    //var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        //attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        //maxZoom: 18,
        //: "mapbox.dark",
        //accessToken: API_KEY
    //});  // Define a baseMaps object to hold our base layers
    var baseMaps = {
        "Street Map": streetmap,
        //"Dark Map": darkmap
    };  // Create overlay object to hold our overlay layer
    var overlayMaps = {
        countries: countries
    };  // Create our map, giving it the streetmap and earthquakes layers to display on load
    var myMap = L.map("map", {
        center: [
            00, 00
        ],
        zoom: 2,
        layers: [streetmap, countries]
    });
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: true
    }).addTo(myMap);


//setting up legend
    var grades = [.1, 1.75, 2.25, 2.75, 3.1];
    var colors = [
        "#98ee00",
        "#d4ee00",
        "#eecc00",
        "#ee9c00",
        "#ea822c",
        "#ea2c2c"
    ]; var legend = L.control({
        position: "bottomright"
    }); legend.onAdd = function () {
        var div = L.DomUtil.create("div", "info legend");
        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
                '<i style="background:' + colors[i] + '">&nbsp&nbsp&nbsp&nbsp</i> ' +
                grades[i] + (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
        }
        return div;
    }; legend.addTo(myMap);
};
document.getElementById('map').innerHTML = "<div id='map' style='width: 100%; height: 100%;'></div>";