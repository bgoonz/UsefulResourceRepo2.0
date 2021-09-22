const theUrl =
  "https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/movie-data.json";

var margin = { top: 50, right: 50, bottom: 50, left: 50 },
  width = 1055 - margin.left - margin.right,
  height = 755 - margin.top - margin.bottom;

var svg = d3
  .select("#treemap")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var div = d3
  .select("#treemap")
  .append("div")
  .attr("id", "tooltip")
  .attr("class", "tooltip")
  .style("opacity", 0);

var svgLegend = d3
  .select("#legend")
  .append("svg")
  .attr("width", 500)
  .attr("height", 75)
  .append("g");

d3.json(theUrl, function (error, data) {
  if (error) throw error;

  var categories = data.children.map((item) => {
    return item.name;
  });

  var color = d3
    .scaleOrdinal()
    .domain(categories)
    .range([
      "#9370DB",
      "#A52A2A",
      "#FFE4E1",
      "#48D1CC",
      "#3CB371",
      "#FA8072",
      "#FFD700",
    ]);

  var format = d3.format(",d");

  var legendCells = svgLegend
    .selectAll("rect")
    .data(color.range())
    .enter()
    .append("g")
    .append("rect")
    .attr("class", "legend-item")
    .attr("width", 18)
    .attr("height", 18)
    .attr("y", 19)
    .attr("x", function (d, i) {
      return 70 * i;
    })
    .attr("fill", function (d, i) {
      return d;
    });

  var legendText = svgLegend
    .selectAll("text")
    .data(categories)
    .enter()
    .append("text")
    .attr("y", 50)
    .attr("x", function (d, i) {
      return 70 * i;
    })
    .text((d) => d)
    .style("fill", "white")
    .style("font-size", "12px");

  //inspiration for the following code courtesy of Ashish Singh -- "https://bl.ocks.org/git-ashish/1913813e83ac72b1ee99c37d9e83ba78" and freeCodeCamp --"https://codepen.io/freeCodeCamp/full/KaNGNR/"
  var treemap = d3.treemap().size([width, height]).paddingInner(1);

  var root = d3
    .hierarchy(data)
    .eachBefore(function (d) {
      d.data.id = (d.parent ? d.parent.data.id + "." : "") + d.data.name;
    })
    .sum(sumBySize)
    .sort(function (a, b) {
      return b.height - a.height || b.value - a.value;
    });

  treemap(root);

  var cell = svg
    .selectAll("g")
    .data(root.leaves())
    .enter()
    .append("g")
    .attr("transform", function (d) {
      return "translate(" + d.x0 + "," + d.y0 + ")";
    });

  cell
    .append("rect")
    .attr("id", function (d) {
      return d.data.id;
    })
    .attr("class", "tile")
    .attr("width", function (d) {
      return d.x1 - d.x0;
    })
    .attr("height", function (d) {
      return d.y1 - d.y0;
    })
    .attr("data-name", function (d) {
      return d.data.name;
    })
    .attr("data-category", function (d) {
      return d.data.category;
    })
    .attr("data-value", function (d) {
      return d.data.value;
    })
    .attr("fill", function (d) {
      return color(d.data.category);
    })
    .on("mousemove", function (d) {
      console.log("mouseover");
      div.style("opacity", 0.9);
      div
        .html(
          "Name: " +
            d.data.name +
            "<br>Category: " +
            d.data.category +
            "<br>Value: " +
            "$" +
            d.data.value
        )
        .attr("data-value", d.data.value)
        .style("left", d3.event.pageX + 10 + "px")
        .style("top", d3.event.pageY - 28 + "px");
    })
    .on("mouseout", function (d) {
      div.style("opacity", 0);
    });

  cell
    .append("clipPath")
    .attr("id", function (d) {
      return "clip-" + d.data.id;
    })
    .append("use")
    .attr("xlink:href", function (d) {
      return "#" + d.data.id;
    });

  cell
    .append("text")
    .attr("class", "tile-text")
    .attr("clip-path", function (d) {
      return "url(#clip-" + d.data.id + ")";
    })
    .selectAll("tspan")
    .data(function (d) {
      return d.data.name.split(/(?=[A-Z][^A-Z])/g);
    })
    .enter()
    .append("tspan")
    .style("font-size", "10px")
    .attr("x", 4)
    .attr("y", function (d, i) {
      return 13 + i * 10;
    })
    .text(function (d) {
      return d;
    });
});

function sumBySize(d) {
  return d.value;
}
