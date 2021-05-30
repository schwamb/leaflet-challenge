var myMap = L.map("map", {
  center: [37, -92],
  zoom: 4
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);


// L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoic2Nod2FtYiIsImEiOiJja3BibTg0NzAwejFzMnVtdTdtbHl5Zzg4In0.-NRiPFnJSHZB87yEzFroTQ', {
//     maxZoom: 18,
//     attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
//                  '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
//                  'Imagery © <a href="http://mapbox.com">Mapbox</a>',
//     id: 'mapbox.streets'
//   }).addTo(myMap);

// quakemap.addTo(myMap);

// Store our API endpoint as queryUrl.
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_day.geojson";

d3.json(queryUrl).then(function(data) {
  // Once we get a response, send the data.features object to the createFeatures function.
  function mapFeatures(feature) {
    return{
      opacity: 1,
      fillOpacity: 1,
      fillColor: depthColor(feature.geometry.coordinates[2]),
      color: "#000000",
      radius: magRadius(feature.properties.mag),
      stroke: true,
      weight: 0.5
    };
  }
// Example code below found at: https://www.tutorialspoint.com/can-we-have-a-return-statement-in-a-javascript-switch-statement
//   function returnDay(val) {
//     switch (val) {
//        case 1:
//           return "It's monday";
//        case 2:
//           return "It's tuesday";
//        case 3:
//           return "It's wednesday";
//        case 4:
//           return "It's thursday";
//        case 5:
//           return "It's friday";
//        case 6:
//           return "It's saturday";
//        case 7:
//           return "It's sunday";
//        default:
//           return "Enter a value between 1 - 7";
//     }
//  }
  function depthColor(depth){
    switch (true) {
      case depth >50:
        return "#C50000";
      case depth >40:
        return "#FF401C";
      case depth >30:
        return "#FEA83A";
      case depth >20:
        return "#FCF064";
      case depth >10:
        return "#B6FC64";
      default:
        return "#64FC79"
    }
  }

  function magRadius(magnitude) {
    if (magnitude === 0) {
      return 1;
    }
    return magnitude * 3;
  }

  L.geoJson(data, {
    pointToLayer: function(feature, latlng) {
        return new L.CircleMarker(latlng);
      },
        style: mapFeatures,

    onEachFeature: function(feature, layer) {
       layer.bindPopup(`<h2>${feature.properties.place}</h2><hr><h3>Magnitude: ${feature.properties.mag}</h3><h3>Depth (km): ${feature.geometry.coordinates[2]}</h3>`)
       console.log(feature.properties.place)
       console.log(feature.properties.mag)
       console.log(feature.geometry.coordinates[2])
  
    }

}).addTo(myMap)


// var legend = L.control({position: "bottomright"});

// legend.onAdd = function (){
//   var div = L.DomUtil.create('div', 'info legend');

//   var grades = [0, 1, 2, 3, 4, 5];
  // var colors = [
  //   "#C50000",
  //   "#FF401C",
  //   "#FEA83A",
  //   "#FCF064",
  //   "#B6FC64",
  //   "#64FC79"
  // ];

//   for (var i = 0; i < grades.length; i++) {
//     div.innerHTML +=
//         '<i style="background:' + colors[i] + '"></i> ' +
//         grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');

// return div;
//   }
// }
// legend.addTo(map);

// });
var legend = L.control({
  position: "bottomright"
});

// details for the legend
legend.onAdd = function() {
  var div = L.DomUtil.create("div", "info legend");

  var grades = [0, 10, 20, 30, 40, 50];
  // var colors = [
  //   "#C50000",
  //   "#FF401C",
  //   "#FEA83A",
  //   "#FCF064",
  //   "#B6FC64",
  //   "#64FC79"
  // ];

  for (var i = 0; i < grades.length; i++) {
    div.innerHTML +=
        '<i style="background:' + depthColor(grades[i]) + '"></i> ' +
        grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
}
  return div;
};

// Finally, we our legend to the map.
legend.addTo(myMap);
});

// Loop through the cities array, and create one marker for each city object.
// for (var i = 0; i < cities.length; i++) {
//   L.circle(cities[i].location, {
//     fillOpacity: 0.75,
//     color: "white",
//     fillColor: "purple",
//     // Setting our circle's radius to equal the output of our markerSize() function:
//     // This will make our marker's size proportionate to its population.
//     radius: markerSize(cities[i].population)
//   }).bindPopup("<h1>" + cities[i].name + "</h1> <hr> <h3>Population: " + cities[i].population + "</h3>").addTo(myMap);
// }
