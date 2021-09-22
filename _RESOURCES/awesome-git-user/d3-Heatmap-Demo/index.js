var theUrl =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json";

// set the dimensions and margins of the graph
var margin = { top: 20, right: 20, bottom: 30, left: 50 },
  width = 1100 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

var svg = d3
  .select(".map-area")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var div = d3
  .select("#map-area")
  .append("div")
  .attr("id", "tooltip")
  .attr("class", "tooltip")
  .style("opacity", 0);

var svgLegend = d3
  .select("#legend")
  .append("svg")
  .attr("width", 350)
  .attr("height", 60)
  .append("g")
  .attr("transform", "translate(5, 5)");

d3.json(theUrl, function (error, data) {
  if (error) throw error;

  var bT = data.baseTemperature;
  var mV = data.monthlyVariance.map((item) => {
    var newItem = {};
    newItem.year = item.year;
    newItem.month = item.month - 1;
    newItem.variance = Math.round(10 * item.variance) / 10;
    newItem.temp = Math.round(10 * (item.variance + bT)) / 10;
    return newItem;
  });

  var temps = mV.map((item) => {
    return item.temp;
  });
  var color = d3
    .scaleThreshold()
    .domain([3, 6, 9, 12, 15])
    .range(["#40E0D0", "#6e7c5a", "#d8b8b3", "#FF7F50", "#b45554"]);

  var legX = d3.scaleLinear().domain([0, 15]).range([0, 350]);

  var legXAxis = d3
    .axisBottom(legX)
    .tickSizeOuter(0)
    .tickValues(color.domain())
    .tickFormat(function (d) {
      return d;
    });

  svgLegend
    .append("g")
    .attr("transform", "translate(0," + 37 + ")")
    .call(legXAxis)
    .attr("id", "legX-axis");

  var legendCells = svgLegend
    .selectAll("rect")
    .data(color.range())
    .enter()
    .append("g")
    .append("rect")
    .attr("width", 70)
    .attr("height", 18)
    .attr("y", 19)
    .attr("x", function (d, i) {
      return 70 * i;
    })
    .attr("fill", function (d, i) {
      return d;
    });

  svgLegend
    .append("text")
    .text("Temperature in degrees Celsius")
    .attr("y", 10)
    .attr("x", 50);

  var years = mV.map((item) => {
    return item.year;
  });

  var xVals = years.filter((_, i) => i % 12 == 0);
  var yVals = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  var itemWidth = width / xVals.length;
  var cellWidth = itemWidth;
  var itemHeight = height / 12;
  var cellHeight = itemHeight - 1;

  var xTicks = xVals.filter((item) => {
    return item % 10 === 0;
  });

  var xScale = d3.scaleLinear().domain(d3.extent(years)).range([0, width]);

  var xAxis = d3
    .axisBottom(xScale)
    .tickValues(xTicks)
    .tickFormat(function (d) {
      return d;
    });

  var monthByNo = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  var yScale = d3.scaleLinear().domain([-0.5, 11.5]).range([height, 0]);

  var yAxis = d3
    .axisLeft(yScale)
    .tickValues(monthByNo)
    .tickFormat(function (d, i) {
      return yVals[i];
    });

  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .attr("id", "x-axis");

  svg
    .append("g")
    .call(yAxis)
    .attr("id", "y-axis")
    .attr("transform", "translate(0, 0)")
    .selectAll("text")
    .attr("transform", "rotate(-30)");

  var cells = svg
    .selectAll("rect")
    .data(mV)
    .enter()
    .append("g")
    .append("rect")
    .attr("class", "cell")
    .attr("width", cellWidth)
    .attr("height", cellHeight)
    .attr("data-month", function (d) {
      return d.month;
    })
    .attr("data-year", function (d) {
      return d.year;
    })
    .attr("data-temp", function (d) {
      return d.temp;
    })
    .attr("y", function (d) {
      return yScale(d.month + 0.5);
    })
    .attr("x", function (d) {
      return xScale(d.year);
    })
    .attr("fill", function (d) {
      return color(d.temp);
    })
    .on("mouseover", function (d, i) {
      div.transition().duration(200).style("opacity", 0.9);
      div
        .html(
          d.year +
            " - " +
            yVals[d.month] +
            "<br/>" +
            d.temp +
            "&deg;C" +
            "<br/>" +
            d.variance +
            "&deg;C"
        )
        .attr("data-year", d.year)
        .style("left", d3.event.pageX - 47 + "px")
        .style("top", d3.event.pageY - 55 + "px");
    })
    .on("mouseout", function (d) {
      div.transition().duration(200).style("opacity", 0);
    });
});
