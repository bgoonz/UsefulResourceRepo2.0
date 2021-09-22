var theUrl =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json";

var margin = { top: 20, right: 20, bottom: 30, left: 50 },
  width = 960 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

var color = d3.scaleOrdinal(d3.schemeCategory10);

var timeFormat = d3.timeFormat("%M:%S");
// parse the date / time
var parseTime = d3.timeParse("%M:%S");

// set the ranges
var x = d3.scaleTime().range([0, width]);
var y = d3.scaleLinear().range([0, height]);

// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3
  .select("#plot-area")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var div = d3
  .select("#plot-area")
  .append("div")
  .attr("id", "tooltip")
  .attr("class", "tooltip")
  .style("opacity", 0);

// Get the data
d3.json(theUrl, function (error, data) {
  if (error) throw error;

  svg
    .append("text")
    .attr("x", -300)
    .attr("y", 20)
    .attr("transform", "rotate(-90)")
    .text("Time  (minutes:seconds)");

  svg
    .append("text")
    .attr("x", width - 20)
    .attr("y", height - 10)
    .text("Year");

  svg
    .append("text")
    .attr("x", width / 3 - 20)
    .attr("y", 20)
    .text("Same Stage of Bicycle Race Over the Years")
    .attr("font-family", "Source Sans Pro")
    .attr("font-size", "24px");
  // format the data
  data.forEach(function (d) {
    d.Time = parseTime(d.Time);
  });

  var years = data.map((item) => {
    return item.Year;
  });

  var xMin = d3.min(years);
  var xMax = d3.max(years);

  // Scale the range of the data
  y.domain(
    d3.extent(data, function (d) {
      return d.Time;
    })
  );
  x.domain([xMin - 1, xMax + 1]);

  // Add the scatterplot
  svg
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
    .attr("r", 10)
    .attr("cx", function (d) {
      return x(d.Year);
    })
    .attr("cy", function (d) {
      return y(d.Time);
    })
    .attr("class", "dot")
    .attr("stroke", "white")
    .attr("data-xvalue", function (d) {
      return d.Year;
    })
    .attr("data-yvalue", function (d) {
      return d.Time.toISOString();
    })
    .style("fill", function (d) {
      return color(d.Doping != "");
    })
    .on("mouseover", function (d) {
      div.transition().duration(200).style("opacity", 0.9);
      div
        .html(
          "Time: " +
            timeFormat(d.Time) +
            "<br/>" +
            d.Name +
            "<br/>" +
            "Year: " +
            d.Year
        )
        .attr("data-year", d.Year)
        .style("left", d3.event.pageX + 20 + "px")
        .style("top", d3.event.pageY - 28 + "px");
    })
    .on("mouseout", function (d) {
      div.transition().duration(200).style("opacity", 0);
    });

  // Add the X Axis
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).tickFormat(d3.format("d")))
    .attr("id", "x-axis");

  // Add the Y Axis
  svg
    .append("g")
    .call(d3.axisLeft(y).tickFormat(timeFormat))
    .attr("id", "y-axis");

  var legend = svg
    .selectAll(".legend")
    .data(color.domain())
    .enter()
    .append("g")
    .attr("class", "legend")
    .attr("id", "legend")
    .attr("transform", function (d, i) {
      return "translate(0," + (height / 4 - i * 20) + ")";
    });

  legend
    .append("rect")
    .attr("x", width - 18)
    .attr("width", 18)
    .attr("height", 18)
    .style("fill", color)
    .style("stroke", "white");

  legend
    .append("text")
    .attr("x", width - 30)
    .attr("y", 13)
    .style("text-anchor", "end")
    .text((d) => {
      return d ? "Alleged Doping" : "No Alleged Doping";
    });
});
