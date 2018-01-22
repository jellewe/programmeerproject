window.onload = function() {

  d3.json("../doc/dataset_foodgroups.json", function(error, data) {
    if (error){
      window.alert("an error has occured: " + error)
    }
    // initialize map at year 1961
    mapChart(data, 1961)
    d3.select('#slider').call(d3.slider()
      .axis(true).min(1961).max(2013).step(1)
      .on("slide", function(evt, value) {
          mapChart(data, value)
      })
    )
  })
}

function drawBarChart(data, country, year) {
  // remove all children of html map div
  d3.select("#barChart").selectAll("*").remove()

  // margins around chart in pixels
  var margin = {top: 70, right: 30, bottom: 100, left: 50}

  chartSize = d3.select("#barChart").node().getBoundingClientRect()

  // width and height of chart in pixels
  var width = chartSize.width - 20 - margin.left - margin.right
  var height = 450 - margin.top - margin.bottom

  // variable for width of bars
  var barWidth = width / Object.keys(data[country]["items"]).length

  barChart = d3.select("#barChart")
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

  // scale for y dimension with domain of 0 to max production value
  var yScale = d3.scale.linear()
    .domain([0, maxValue(data[country], year)])
    .range([height, 0])

  // scale for x dimension, arbitrary country that contains information about all food types
  xDomain = Object.keys(data[country]["items"])

  // filter only elements which start with 29, indicating it's a product group
  // xDomain = xDomain.filter(function(element) {
  //   return (element.substring(0,2) == "29")
  // })
  var xScale = d3.scale.ordinal()
    .domain(xDomain)
    .rangeBands([0, width])

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
      .style("text-anchor", "end")
      .style("font-size", "7px")
      .attr("dx", "-1em")
      .attr("dy", "-1em")
      .attr("transform", "rotate(-90)")

  // append y axis
  barChart.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .selectAll("text")
      .style("font-size", "7px")

  // make group element for bars
  barChart.append("g")
    .attr("class", "bars")

  // convert dict to array for enter append data
  dataArray = []
  for (key in data[country]["items"]) {
    dataArray.push(data[country]["items"][key]["production"][year])
  }

  console.log(dataArray)

  // select all bars and make new bar for every data element
  var barSelection = barChart.select(".bars").selectAll("rect")
    .data(dataArray)
    .enter().append("rect")
    .attr("x", function(d, i) { return i * barWidth })
    .attr("y", function(d) { return yScale(d) })
    .attr("height", function(d) { return height - yScale(d) })
    .attr("width", barWidth - 1)
}


function maxValue(country, year) {
  max = 0
  for (item in country["items"]) {
    // if (item.substring(0,2) == "29") {
    // for (year in country["items"][item]["production"]) {
      productionValue = country["items"][item]["production"][year]
      if (productionValue > max) {
        max = productionValue
      }
    // }
  }
  console.log(max)
  return max
}


function drawLineChart(data, country) {
  // remove all children of html map div
  d3.select("#lineChart").selectAll("*").remove()

  // margins around graph in pixels
  var margin = {top: 30, right: 30, bottom: 50, left: 70};

    chartSize = d3.select("#lineChart").node().getBoundingClientRect()

    // width and height of graph in pixels
    var width = chartSize.width - 100 - margin.left - margin.right;
    var height = 450 - margin.top - margin.bottom;

  lineChart = d3.select("#lineChart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
  d3.json("../doc/export_data.json", function(error, exportData) {
    if (error){
      window.alert("an error has occured: " + error)
    }

    exportArray = []
    yearArray = []
    for (key in exportData["PRY"]) {
      yearArray.push(parseInt(key))
      exportArray.push(parseInt(exportData["PRY"][key]))
    }

    // scales for x and y dimensions
    var xScale = d3.scale.linear()
      .domain([d3.min(yearArray, function(d) { return d }),
               d3.max(yearArray, function(d) { return d })])
      .range([0, width]);
    var yScale = d3.scale.linear()
      .domain([0,
               d3.max(exportArray, function(d) { return d })])
      .range([height, 0])

    // variables for x and y axes
    var xAxis = d3.svg.axis()
      .scale(xScale)
      .orient("bottom")
      .ticks(21)
      .tickFormat(d3.format("d"))
    var yAxis = d3.svg.axis()
      .scale(yScale)
      .orient("left")

    // g element for x axis
    lineChart.append("g")
      .attr("class", "x axis")
      .style("font-size", "10px")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)

    // g element for y axis
    lineChart.append("g")
        .attr("class", "y axis")
        .call(yAxis)

    var lineFunction = d3.svg.line()
      .x(function(d, i) { return xScale(yearArray[i]); })
      .y(function(d) { return yScale(d)})

    lineChart.append("path")
      .attr("stroke", "#006d2c")
      .attr("fill", "none")
      .attr("d", lineFunction(exportArray))
  });
}


function mapChart(data, year) {

  // remove all children of html map div
  d3.select("#mapContainer").selectAll("*").remove()

  // color domain to show in map
  colorDomain = ['#d3d3d3', '#edf8e9', '#bae4b3', '#74c476', '#31a354', '#006d2c']

  // dict for color data per country
  var colorData = {}

  // get total production values per country from json file
  for (var country in data) {
    colorData[country] = parseInt(data[country]["total_production"][year])
  }

  // scaler to map production to color shades (< 1 means no data)
  mapScaler = d3.scale.threshold()
   .domain([1, 5000, 20000, 100000, 200000])
   .range(["0", "1", "2", "3", "4", "5"])

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
      4: colorDomain[4],
      5: colorDomain[5],
      defaultFill: colorDomain[0]
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
  d3.select("#mapContainer").select(".datamap")
    .selectAll(".datamaps-subunits")
      .selectAll("path")
        .on("click", function(geography) {
          countryCode = geography.id
          console.log(geography)
          drawLineChart(data, countryCode)
          drawBarChart(data, countryCode, year)
        })
};
