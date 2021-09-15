const EDUCATION =
  "https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/for_user_education.json";
const COUNTY =
  "https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/counties.json";

var margin = { top: 50, right: 50, bottom: 50, left: 50 },
  width = 1200 - margin.left - margin.right,
  height = 800 - margin.top - margin.bottom;

var svg = d3
  .select("#map")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + 3 * margin.left + "," + margin.top + ")");

var div = d3
  .select("#map")
  .append("div")
  .attr("id", "tooltip")
  .attr("class", "tooltip")
  .style("opacity", 0);

var svgLegend = d3
  .select("#legend")
  .append("svg")
  .attr("width", 350)
  .attr("height", 100)
  .append("g");

var threshold = d3
  .scaleThreshold()
  .domain([15, 30, 45, 60, 75, 90])
  .range(["#6e7c5a", "#a0b28f", "#d8b8b3", "#b45554", "#760000", "#FFA500"]);

d3.queue().defer(d3.json, COUNTY).defer(d3.json, EDUCATION).await(ready);

var path = d3.geoPath();

function ready(error, us, education) {
  if (error) throw error;

  var counties = topojson.feature(us, us.objects.counties).features;

  svg
    .selectAll(".county")
    .data(counties)
    .enter()
    .append("path")
    .attr("class", "county")
    .attr("data-fips", function (d) {
      return d.id;
    })
    .attr("data-education", function (d) {
      var result = education.filter(function (item) {
        return item.fips == d.id;
      });
      if (result[0]) {
        return result[0].bachelorsOrHigher;
      }
      console.log("could find data for: ", d.id);
      return 0;
    })
    .attr("fill", function (d) {
      var result = education.filter(function (item) {
        return item.fips == d.id;
      });
      if (result[0]) {
        return threshold(result[0].bachelorsOrHigher);
      }
      return color(0);
    })
    .attr("d", path)
    .on("mouseover", function (d) {
      div.transition().duration(200).style("opacity", 0.9);
      div
        .html(function () {
          var result = education.filter(function (item) {
            return item.fips == d.id;
          });
          if (result[0]) {
            return (
              result[0]["area_name"] +
              ", " +
              result[0]["state"] +
              ": " +
              result[0].bachelorsOrHigher +
              "%"
            );
          }
          return 0;
        })
        .attr("data-education", function () {
          var result = education.filter(function (item) {
            return item.fips == d.id;
          });
          if (result[0]) {
            return result[0].bachelorsOrHigher;
          }
          return 0;
        })
        .style("left", d3.event.pageX - 47 + "px")
        .style("top", d3.event.pageY - 55 + "px");
    })
    .on("mouseout", function (d) {
      div.transition().duration(200).style("opacity", 0);
    });

  var x = d3.scaleLinear().domain([0, 90]).range([0, 360]);

  var xAxis = d3
    .axisBottom(x)
    .tickSizeOuter(0)
    .tickValues(threshold.domain())
    .tickFormat(function (d) {
      return d + "%";
    });

  svgLegend
    .append("g")
    .attr("transform", "translate(0," + 50 + ")")
    .call(xAxis)
    .attr("id", "x-axis");

  var legendCells = svgLegend
    .selectAll("rect")
    .data(threshold.range())
    .enter()
    .append("g")
    .append("rect")
    .attr("width", 60)
    .attr("height", 18)
    .attr("y", 32)
    .attr("x", function (d, i) {
      return 60 * i;
    })
    .attr("fill", function (d, i) {
      return d;
    });

  var mesh = topojson.mesh(us, us.objects.states);

  svg
    .append("path")
    .attr("class", "state")
    .attr("fill", "none")
    .attr("stroke", "#000")
    .attr("stroke-width", 0.75)
    .attr("stroke-linejoin", "round")
    .attr("d", path(mesh));
}
