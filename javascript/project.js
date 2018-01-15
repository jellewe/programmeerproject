window.onload = function() {

  // color domain to show in map
  colorDomain = ['red', 'orange', 'green']

  // load data json file
  d3.json("../doc/dataset.json", function(error, data) {
    if (error){
      window.alert("an error has occured: " + error)
    }

    // dict for color data per country
    var colorData = {}

    // get total production values per country from json file
    for (var country in data) {
      colorData[country] = parseInt(data[country]["total_production"][2013])
    }

    console.log(colorData)
    // scaler to map production to color shades
    mapScaler = d3.scale.quantize()
     .domain([d3.min(d3.values(colorData))), d3.max(d3.values(colorData))])
     .range(["LOW", "MEDIUM", "HIGH"])

    console.log(mapScaler(colorData["CHN"]))
    console.log(mapScaler(colorData["RUS"]))
    console.log(mapScaler(100000))


    console.log(colorData["CHN"])
    console.log(colorData["RUS"])

    console.log(mapScaler(parseInt(1622193)))
    console.log(d3.max(d3.values(colorData)))
    console.log(d3.min(d3.values(colorData)))

    var dict = {}
    // convert production data to color to show on map
    for (var country in colorData) {
      // dict[country] = mapScaler(colorData[country])
      dict[country] = { fillKey: mapScaler(colorData[country]) }
    }

    console.log(dict)

    // draw world map
    var map = new Datamap({
      element: document.getElementById("mapContainer"),
      fills: {
        LOW: colorDomain[0],
        MEDIUM: colorDomain[1],
        HIGH: colorDomain[2]
      },
      data: dict
    });
  });
};
