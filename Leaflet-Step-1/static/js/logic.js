//  Create our map, giving it the streetmap and earthquakes layers to display on load.
  var myMap = L.map("mapid", {
    center: [37.09, -95.71],
    zoom: 5
  });

  // var myMap = L.map('mapid').setView([37.09, -95.71], 5);

  var quakemap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});


// L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoic2Nod2FtYiIsImEiOiJja3BibTg0NzAwejFzMnVtdTdtbHl5Zzg4In0.-NRiPFnJSHZB87yEzFroTQ', {
//     maxZoom: 18,
//     attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
//                  '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
//                  'Imagery © <a href="http://mapbox.com">Mapbox</a>',
//     id: 'mapbox.streets'
//   }).addTo(myMap);

quakemap.addTo(myMap);

// Store our API endpoint as queryUrl.
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";

d3.json(queryUrl).then(function(data) {
  // Once we get a response, send the data.features object to the createFeatures function.
  function mapFeatures(feature) {
    return{
      opacity: 1,
      fillOpacity: 1,
      fillColor: magColor(feature.properties.mag),
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
  function magColor(magnitude){
    switch (true) {
      case magnitude >5:
        return "#C50000";
      case magnitude >4:
        return "#FF401C";
      case magnitude >3:
        return "#FEA83A";
      case magnitude >2:
        return "#FCF064";
      case magnitude >1:
        return "#B6FC64";
      default:
        return "#64FC79"
    }
  }

  function magRadius(magnitude) {
    if (magnitude === 0) {
      return 1;
    }
    return magnitude * 5;
  }

  L.geoJson(data, {
    pointToLayer: function(feature, latlng) {
        return new L.CircleMarker(latlng);
      },
        style: mapFeatures,

    onEachFeature: function(feature, layer) {
       layer.bindPopup(`<h2>${feature.properties.place}</h2><hr><h2>Magnitude: ${feature.properties.mag}</h2>`)
       console.log(feature.properties.place)
       console.log(feature.properties.mag)
  
    }

}).addTo(myMap)
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
