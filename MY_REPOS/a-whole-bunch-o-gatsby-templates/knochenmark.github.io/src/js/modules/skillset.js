var data = {
    "nodes": [{
        "name": "Webdevelopment",
        "group": 0
    },{
        "name": "Front-end",
        "group": 1
    },{
        "name": "Back-end",
        "group": 2
    },{
        "name": "CSS3",
        "group": 3
    }, {
        "name": "HTML5",
        "group": 1
    }, {
        "name": "Javascript",
        "group": 4
    },{
        "name": "Less",
        "group": 3
    }, {
        "name": "Stylus",
        "group": 3
    }, {
        "name": "Pug",
        "group": 1
    },{
        "name": "Bootstrap",
        "group": 3
    }, {
        "name": "Materialize",
        "group": 3
    }, {
        "name": "TypeScript",
        "group": 4
    }, {
        "name": "Task Runners",
        "group": 5
    },{
        "name": "Gulp",
        "group": 5
    }, {
        "name": "npm scripts",
        "group": 5
    },{
        "name": "Testing",
        "group": 6
    },{
        "name": "Mocha",
        "group": 6
    },{
        "name": "Jasmine",
        "group": 6
    },{
        "name": "Sinon",
        "group": 6
    },{
        "name": "Framework",
        "group": 7
    }, {
        "name": "Ampersand",
        "group": 7
    }, {
        "name": "Mithril",
        "group": 7
    }, {
        "name": "React",
        "group": 7
    }, {
        "name": "D3",
        "group": 7
    }, {
        "name": "General",
        "group": 8
    },{
        "name": "Git",
        "group": 8
    }, {
        "name": "Github",
        "group": 8
    },{
        "name": "Module Bundler",
        "group": 9
    },{
        "name": "Browserify",
        "group": 9
    }],
    "links": [{
        "source": 0,
        "target": 1,
        "value": 1
    },{
        "source": 0,
        "target": 2,
        "value": 1
    },{
        "source": 1,
        "target": 3,
        "value": 1
    },{
        "source": 1,
        "target": 4,
        "value": 1
    },{
        "source": 1,
        "target": 5,
        "value": 1
    },{
        "source": 3,
        "target": 6,
        "value": 1
    },{
        "source": 3,
        "target": 7,
        "value": 1
    },{
        "source": 4,
        "target": 8,
        "value": 1
    },{
        "source": 3,
        "target": 9,
        "value": 1
    },{
        "source": 3,
        "target": 10,
        "value": 1
    },{
        "source": 5,
        "target": 11,
        "value": 1
    },{
        "source": 5,
        "target": 12,
        "value": 1
    },{
        "source": 12,
        "target": 13,
        "value": 1
    },{
        "source": 12,
        "target": 14,
        "value": 1
    },{
        "source": 5,
        "target": 15,
        "value": 1
    },{
        "source": 15,
        "target": 16,
        "value": 1
    },{
        "source": 15,
        "target": 17,
        "value": 1
    },{
        "source": 15,
        "target": 18,
        "value": 1
    },{
        "source": 5,
        "target": 19,
        "value": 1
    },{
        "source": 19,
        "target": 20,
        "value": 1
    },{
        "source": 19,
        "target": 21,
        "value": 1
    },{
        "source": 19,
        "target": 22,
        "value": 1
    },{
        "source": 19,
        "target": 23,
        "value": 1
    },{
        "source": 0,
        "target": 24,
        "value": 1
    },{
        "source": 24,
        "target": 25,
        "value": 1
    },{
        "source": 24,
        "target": 26,
        "value": 1
    },{
        "source": 5,
        "target": 27,
        "value": 1
    },{
        "source": 27,
        "target": 28,
        "value": 1
    }]
};

export function init(){


//Constants for the SVG
var width = $(".light").width(),
    height = $(".light").height();

function dragstarted(d) {
    if (!d3.event.active) force.alphaTarget(0.5).restart();
    d.fx = d.x;
    d.fy = d.y;
}

function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
}

function dragended(d) {
    if (!d3.event.active) force.alphaTarget(0.5);
    d.fx = null;
    d.fy = null;
}

//Set up the colour scale
var color = d3.scaleOrdinal(d3.schemeCategory20);

//Set up the force layout
var force = d3.forceSimulation()
    .force("charge", d3.forceManyBody().strength(-700).distanceMin(100).distanceMax(1000))
    .force("link", d3.forceLink().id(function (d) { return d.index }))
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force("y", d3.forceY(0.001))
    .force("x", d3.forceX(0.001))

//Append a SVG to the body of the html page. Assign this SVG as an object to svg
var svg = d3.select(".light").append("svg")
    .attr("width", width)
    .attr("height", height);

force
    .nodes(data.nodes)
    .force("link").links(data.links)

var link = svg.selectAll(".link")
    .data(data.links)
    .enter()
    .append("line")
    .attr("class", "link")
    .attr('marker-end', 'url(#arrowhead)')

var node = svg.selectAll(".node")
    .data(data.nodes)
    .enter().append("g")
    .attr("class", "node")
    .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

node.append('circle')
    .attr('r', 13)
    .attr('fill', function (d) {
        return color(d.group);
    });

node.append("text")
      .attr("dx", 14)
      .attr("dy", ".35em")
      .text(function(d) { return d.name })
      .style("stroke", "black");

var padding = 1, // separation between circles
    radius=8;
function collide(alpha) {
  var quadtree = d3.quadtree(data.nodes);
  return function(d) {
    var rb = 2*radius + padding,
        nx1 = d.x - rb,
        nx2 = d.x + rb,
        ny1 = d.y - rb,
        ny2 = d.y + rb;
    quadtree.visit(function(quad, x1, y1, x2, y2) {
      if (quad.point && (quad.point !== d)) {
        var x = d.x - quad.point.x,
            y = d.y - quad.point.y,
            l = Math.sqrt(x * x + y * y);
          if (l < rb) {
          l = (l - rb) / l * alpha;
          d.x -= x *= l;
          d.y -= y *= l;
          quad.point.x += x;
          quad.point.y += y;
        }
      }
      return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
    });
  };
}

force.on("tick", function () {
    link.attr("x1", function (d) {
        return d.source.x;
    })
        .attr("y1", function (d) {
            return d.source.y;
        })
        .attr("x2", function (d) {
            return d.target.x;
        })
        .attr("y2", function (d) {
            return d.target.y;
        });
  node.each(collide(0.5)); //Added

    node.attr("transform", function (d) {
        return "translate(" + d.x + "," + d.y + ")";
    });
});

}
