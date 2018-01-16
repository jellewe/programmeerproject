window.onload = function() {

  // color domain to show in map
  colorDomain = ['#edf8e9', '#bae4b3', '#74c476', '#31a354', '#006d2c']

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

    // scaler to map production to color shades
    mapScaler = d3.scale.threshold()
     .domain([5000, 20000, 50000, 200000])
     .range(["0", "1", "2", "3", "4"])

    // convert production data to color category
    var colorCategories = {}
    for (var country in colorData) {
      colorCategories[country] = { fillKey: mapScaler(colorData[country]) }
    }

    // draw world map
    var map = new Datamap({
      element: document.getElementById("mapContainer"),
      fills: {
        0: colorDomain[0],
        1: colorDomain[1],
        2: colorDomain[2],
        3: colorDomain[3],
        4: colorDomain[4]
      },
      data: colorCategories,
      geographyConfig: {
        borderColor: "#000000",
        borderOpacity: 0.2,
        highlightBorderColor: "#000000",
        highlightBorderWidth: 1,
        highlightBorderOpacity: 0.2
      }
    });

    barChart(data)
  });
};

function barChart(data) {
  // margins around chart in pixels
  var margin = {top: 70, right: 30, bottom: 100, left: 40}

  // width and height of chart in pixels
  var width = 900 - margin.left - margin.right
  var height = 450 - margin.top - margin.bottom

  barChart = d3.select("#barChart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)

  // scale for y dimension with domain of 0 to max production value
  var yScale = d3.scale.linear()
    .domain([0, maxValue(data["MAR"])])
    .range([height, 0])

  // scale for x dimension, arbitrary country that contains information about all food types
  xDomain = Object.keys(data["USA"]["items"])
  console.log(xDomain)
  var xScale = d3.scale.ordinal()
    .domain(xDomain)
    .rangeRoundBands(0, width)

  // variables for x and y axes
  var xAxis = d3.svg.axis()
    .scale(xScale)
    .ticks(xDomain.length)
    .orient("bottom")
  var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left")
    .ticks(10)

  // append x axis
  barChart.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .selectAll("text")

  // append y axis
  barChart.append("g")
      .attr("class", "y axis")
      .call(yAxis)

  // make group element for bars
  barChart.append("g")
    .attr("class", "bars")

  // select all bars and make new bar for every data element
  var barSelection = barChart.select(".bars").selectAll("rect")
    .data(data["USA"]["items"])
    .enter().append("rect")
    .attr("x", function(d, i) { return i * barWidth })
    .attr("y", function(d) { return yScale(d["production"][2013]) })
    .attr("height", function(d) { return height - yScale(d["production"][2013]) })

}

function maxValue(country) {
  max = 0
  for (item in country["items"]) {
    for (year in country["items"][item]["production"]) {
      productionValue = country["items"][item]["production"][year]
      if (productionValue > max) {
        max = productionValue
      }
    }
  }
  return max
}
