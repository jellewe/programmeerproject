var axisFontSize = "10px"

// dict for line data
var lineData = {}

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

function drawBarChart(data, country, year, xDomain) {
  // remove all children of html map div
  d3.select("#barChart").selectAll("*").remove()

  // if no data for country, render message
  if ((!data[country]) || data[country]["total_production"][year] == 0) {
    d3.select("#barChart")
      .append("text")
        .html("No data available")
  }

  // if data available, render bar chart
  else {

    // margins around chart in pixels
    var margin = {top: 70, right: 30, bottom: 120, left: 50}

    chartSize = d3.select("#barChart").node().getBoundingClientRect()

    // width and height of chart in pixels
    var width = chartSize.width - 20 - margin.left - margin.right
    var height = 450 - margin.top - margin.bottom

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

    if (!xDomain) {
      xDomain = Object.keys(data[country]["items"])
    }

    // convert dict to array for enter append data
    dataArray = []
    xDomain.forEach(function(item) {
      dataArray.push(data[country]["items"][item]["production"][year])
    });

    // if undefined datum, remove from xDomain
    // dataArray.forEach(function(datum, index) {
    //   if (datum == undefined) {
    //     indexXDomain = xDomain.indexOf(datum)
    //     xDomain.splice(indexXDomain, 1)
    //     indexDataArray = index
    //   }
    // })
    // dataArray.splice(indexDataArray, 1)

    // variable for width of bars
    var barWidth = width / xDomain.length

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
      .tickFormat(function(d) {
        return data[country]["items"][d]["name"]
      })
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
        .style("font-size", axisFontSize)
        .attr("dx", "-1em")
        .attr("dy", "-.5em")
        .attr("transform", "rotate(-60)")

    // append y axis
    barChart.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .selectAll("text")
        .style("font-size", axisFontSize)

    // make group element for bars
    barChart.append("g")
      .attr("class", "bars")

    // select all bars and make new bar for every data element
    var barSelection = barChart.select(".bars").selectAll("rect")
      .data(dataArray)
      .enter().append("rect")
      .attr("x", function(d, i) { return i * barWidth })
      .attr("y", function(d) { return yScale(d) })
      .attr("height", function(d) { return height - yScale(d) })
      .attr("width", barWidth - 1)


    // checkboxes = d3.select("#checkboxes")

    // remove all children of html checkbox div
    // checkboxes.selectAll("*").remove()

    items = Object.keys(data[country]["items"])
    drawCheckboxes(items, xDomain, data, country)

    items.forEach(function(item) {
      var checkboxId = "#checkbox" + item
      d3.select(checkboxId).on("change", function() {
        if ($.inArray(item, xDomain) > -1) {
          index = xDomain.indexOf(item)
          xDomain.splice(index, 1)
        }
        else {
          xDomain.push(item)
        }

        drawBarChart(data, country, year, xDomain)
      })
    });
  }
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
  return max
}


function drawLineChart(data, country) {
  if (country != "NLD") {

    // remove all children of html map div
    d3.select("#lineChart").selectAll("*").remove()

    // margins around graph in pixels
    var margin = {top: 70, right: 50, bottom: 120, left: 60}

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
      if (error) {
        window.alert("an error has occured: " + error)
      }

      exportArray = []
      yearArray = []
      for (key in exportData[country]) {
        console.log("hier")
        yearArray.push(parseInt(key))
        exportArray.push(parseInt(exportData[country][key]))
      }

      var noData = false
      exportArray.forEach(function(item) {
        if ((!item)) {
          noData = true
        }
      })

      if (noData) {
        noDataMessage(country)
      }

      // if line not yet drawn, draw it
      if (!(lineData[country]) && noData == false) {
        console.log(country)
        lineData[country] = exportArray
      }

      // if line already drawn or no data, remove it
      else {
        delete lineData[country]
      }

      console.log(lineData)

      var maxYDomain = 0
      for (key in lineData) {
        var tempMax = d3.max(lineData[key], function(d) { return d})
        if (tempMax > maxYDomain) {
          maxYDomain = tempMax
        }
      }

      // scales for x and y dimensions
      var xScale = d3.scale.linear()
        .domain([d3.min(yearArray, function(d) { return d }),
                 d3.max(yearArray, function(d) { return d })])
        .range([0, width]);
      var yScale = d3.scale.linear()
        .domain([0, maxYDomain])
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
        .selectAll("text")
          .style("font-size", axisFontSize)


      // g element for y axis
      lineChart.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .selectAll("text")
          .style("font-size", axisFontSize)

      var lineFunction = d3.svg.line()
        .defined(function(d) { return d })
        .x(function(d, i) { return xScale(yearArray[i]); })
        .y(function(d) { return yScale(d)})

      var dataIndex = 0
      lineColors = ["#e41a1c", "#377eb8", "#4daf4a", "#984ea3", "#ff7f00"]
      for (key in lineData) {
        lineChart.append("path")
          .data(lineColors)
          // .attr("stroke", "#006d2c")
          .attr("stroke", lineColors[dataIndex % lineColors.length])
          .attr("fill", "none")
          .attr("d", lineFunction(lineData[key]))

        var lastDatum = [yearArray.slice(-1)[0], lineData[key].slice(-1)[0]]
        lineChart.append("text")
          .data(lineData[key])
          .attr("transform", function(d, i) { ; return "translate (" + xScale(lastDatum[0]) + "," + yScale(lastDatum[1]) + ")"})
          // .attr("transform", lineDescription(lineData[key]))
          .text(key)

        dataIndex += 1
      }
    });
  }
}

function noDataMessage(country) {
  d3.select("#lineChart").select("svg").select("g")
    .append("text")
      .attr("id", "data-message")
      .attr("transform", "translate(0,300)")
      .text("No data available for: " + country)
}

function mapChart(mapData, year) {

  // remove all children of html map div
  d3.select("#mapContainer").selectAll("*").remove()

  // color domain to show in map
  colorDomain = ['#d3d3d3', '#edf8e9', '#bae4b3', '#74c476', '#31a354', '#006d2c']

  // dict for color data per country
  var colorData = {}

  // get total production values per country from json file, multiplying production weight by 1000000 to get value in kilograms
  for (var country in mapData) {
    colorData[country] = parseInt(mapData[country]["total_production"][year]) * 1000000 /
    parseInt(mapData[country]["population"][year])
  }

  // buckets for map color scaler
  buckets = [1, 200, 400, 800, 1600]

  // scaler to map production to color shades (< 1 means no data)
  mapScaler = d3.scale.threshold()
   .domain(buckets)
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
      highlightBorderOpacity: 0.2,
      popupTemplate: function(geography) {
        return tooltipInfo(geography.properties.name, geography.id, mapData, year)
      }
    }
  });
  d3.select("#mapContainer").select(".datamap")
    .selectAll(".datamaps-subunits")
      .selectAll("path")
        .on("click", function(geography) {
          countryCode = geography.id
          drawLineChart(mapData, countryCode)
          drawBarChart(mapData, countryCode, year)
          window.scrollTo(0, document.body.scrollHeight)
        })

  // group element for legend
  var legend = d3.select("#mapContainer").select(".datamap").append("g")
    .attr("class", "legend")
    .attr("transform", "translate(50,500)");

  bucketsLegend = ["No data", "0-200", "200-400", "400-800", "800-1600", "1600+"]

  // data to show in legend
  var legendData = [colorDomain, bucketsLegend]

  // append group elements to legend group for every element of legend
  legend.selectAll(".legenditem")
    .data(legendData[0])
    .enter().append("g")
        .attr("class", "legenditem")
        .attr("transform", function(d, i) { return "translate(0," + i * 10 + ")"});

  // make squares with specific for legend items
  legend.selectAll(".legenditem")
    .append("rect")
    .attr("width", 8)
    .attr("height", 8)
    .style("fill", function(d, i) { return d });

  // header to show above legend
  legend.append("text")
    .attr("class", "legend-header")
    .attr("transform", "translate(0, -10)")
    .text("Consumption in kilograms divided by population")

  // put text next to legend squares
  legend.selectAll(".legenditem")
    .attr("class", "legend-text")
    .append("text")
    .attr("x", 10)
    .attr("y", 4)
    .attr("dy", ".35em")
    .style("font-size", "10px")
    .text(function(d, i) { return legendData[1][i] });
};

function tooltipInfo(countryName, countryCode, data, year) {
  var htmlString =  "<div class=\"hoverinfo\"><strong>" + countryName + "<br />"
  htmlString += "</strong>"
  htmlString += "Consumption in 1000 tonnes: "
  htmlString += data[countryCode]["total_production"][year]
  htmlString += "<br />"
  htmlString += "Total population in thousands: "
  htmlString += Math.round(data[countryCode]["population"][year] / 1000)
  htmlString += "<br />"
  var totalProduction = parseInt(data[countryCode]["total_production"][year]) * 1000000
  var population = parseInt(data[countryCode]["population"][year])
  console.log(totalProduction, population)
  htmlString += "Consumption divided by population: "
  htmlString += (Math.round(totalProduction / population)).toString()
  htmlString += "</div>"
  return htmlString
}


function drawCheckboxes(checkboxData, checkedItems, data, country) {
  var checkboxes = d3.select("#checkboxes")

  // remove all children of html checkbox div
  d3.selectAll(".col").selectAll("*").remove()

  var columns = 3
  var rows = 7

  for (i = 0; i < columns; i++) {
    var columnId = "#col" + String(i)
    for (j = 0; j < rows; j++) {
      var checkboxNumber = j + i * rows

      // determine id for checkbox
      if (checkboxData[checkboxNumber]) {
        var checkboxId = "checkbox" + String(checkboxData[checkboxNumber])
      }
      else {
        var checkboxId = "checkbox" + String(checkboxNumber)
      }
      var checkDivId = "checkDiv" + String(checkboxNumber)
      checkboxes.select(columnId)
        .append("div")
          .attr("class", "form-check")
          .attr("id", checkDivId)
          .append("input")
            .attr("class", "form-check-input")
            .attr("type", "checkbox")
            .attr("value", "")
            .attr("id", checkboxId)
            .property("checked", true)

      // disabled checkboxes if no data for food group
      if (!checkboxData[checkboxNumber]) {
        d3.select("#" + checkboxId)
          .property("disabled", true)
          .property("checked", false)
      }

      if (!($.inArray(String(checkboxData[checkboxNumber]), checkedItems) > -1)) {
        d3.select("#" + checkboxId)
          .property("checked", false)
      }

      d3.select("#" + checkDivId)
        .append("label")
          .attr("class", "form-check-label")
          .attr("for", checkboxId)

      if (data[country]["items"][checkboxData[checkboxNumber]] != undefined) {
        d3.select("#" + checkDivId).select("label")
          .html(data[country]["items"][checkboxData[checkboxNumber]]["name"])
      }

      // disabled checkboxes are not displayed properly without this code
      else {
        d3.select("#" + checkDivId).select("label")
          .html("")
      }
    }
  }
}
