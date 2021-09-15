const chai = require("chai");
chai.use(require("chai-spies"));
const { expect, spy } = chai;

const { Graph } = require("../problems/graph");

describe("Graph Implementation", () => {
  describe("#constructor()", () => {
    it("should initialize an `adjList` to an empty object", () => {
      let graph = new Graph();
      expect(graph).to.have.property("adjList");
      expect(graph.adjList).to.eql({});
    });
  });

  describe("#addVertex(vertex)", () => {
    context("when the vertex is not in the graph", () => {
      it("should initialize a value of a new vertex as an empty array", () => {
        let graph = new Graph();
        graph.addVertex("Kevin Bacon");
        expect(graph.adjList).to.eql({ "Kevin Bacon": [] });
      });
    });

    context("when the vertex is already in the graph", () => {
      it("should not add the vertex", () => {
        let graph = new Graph();
        graph.addVertex("James McAvoy");
        graph.addVertex("Kevin Bacon");
        graph.adjList["James McAvoy"] = ["Kevin Bacon"];
        graph.adjList["Kevin Bacon"] = ["James McAvoy"];
        graph.addVertex("James McAvoy"); // second entry
        expect(graph.adjList).to.eql({
          "James McAvoy": ["Kevin Bacon"],
          "Kevin Bacon": ["James McAvoy"],
        });
      });
    });
  });

  describe("#addEdges(edge1, edge2)", () => {
    context("when the graph does not include the edges", () => {
      it("should add the edges into the graph first", () => {
        let graph = new Graph();
        graph.addEdges("Kevin Bacon", "James McAvoy");
        expect(graph.adjList).to.eql({
          "Kevin Bacon": ["James McAvoy"],
          "James McAvoy": ["Kevin Bacon"],
        });
        graph.addEdges("Kevin Bacon", "Edward Asner");
        expect(graph.adjList).to.eql({
          "Kevin Bacon": ["James McAvoy", "Edward Asner"],
          "James McAvoy": ["Kevin Bacon"],
          "Edward Asner": ["Kevin Bacon"],
        });
      });
    });
    context("when the graph includes the edges", () => {
      beforeEach(() => {
        graph = new Graph();
        graph.addVertex("Kevin Bacon");
        graph.addVertex("James McAvoy");
        graph.addVertex("Edward Answer");
      });
      it("should add the edges as neighbors", () => {
        let graph = new Graph();
        graph.addEdges("Kevin Bacon", "James McAvoy");
        expect(graph.adjList).to.eql({
          "Kevin Bacon": ["James McAvoy"],
          "James McAvoy": ["Kevin Bacon"],
        });
        graph.addEdges("Kevin Bacon", "Edward Answer");
        expect(graph.adjList).to.eql({
          "Kevin Bacon": ["James McAvoy", "Edward Answer"],
          "Edward Answer": ["Kevin Bacon"],
          "James McAvoy": ["Kevin Bacon"],
        });
      });
    });
  });

  describe("#buildGraph(edgeList)", () => {
    context("takes an edge list as an argument and builds a graph", () => {
      it("should call `#addVertex` and `#addEdge`", () => {
        const edges = [
          ["Kevin Bacon", "James McAvoy"],
          ["Kevin Bacon", "Josh Brolin"],
          ["Kevin Bacon", "Dianne Wiest"],
          ["Dianne Wiest", "Gene Hackman"],
          ["James McAvoy", "Josh Brolin"],
          ["James McAvoy", "M. Night Shyamalan"],
          ["Josh Brolin", "Will Smith"],
          ["Josh Brolin", "Scarlett Johansson"],
          ["Will Smith", "Scarlett Johansson"],
        ];

        let graph = new Graph();

        const graph1 = {
          "Kevin Bacon": ["James McAvoy", "Josh Brolin", "Dianne Wiest"],
          "James McAvoy": ["Kevin Bacon", "Josh Brolin", "M. Night Shyamalan"],
          "Josh Brolin": [
            "Kevin Bacon",
            "James McAvoy",
            "Will Smith",
            "Scarlett Johansson",
          ],
          "Dianne Wiest": ["Kevin Bacon", "Gene Hackman"],
          "Gene Hackman": ["Dianne Wiest"],
          "M. Night Shyamalan": ["James McAvoy"],
          "Will Smith": ["Josh Brolin", "Scarlett Johansson"],
          "Scarlett Johansson": ["Josh Brolin", "Will Smith"],
        };

        expect(graph.buildGraph(edges)).to.eql(graph1);
      });
    });
  });

  describe("#breadthFirstTraversal(startingVertex)", () => {
    let graph;
    const edges = [
      ["Kevin Bacon", "James McAvoy"],
      ["Kevin Bacon", "Josh Brolin"],
      ["Kevin Bacon", "Dianne Wiest"],
      ["Dianne Wiest", "Gene Hackman"],
      ["James McAvoy", "Josh Brolin"],
      ["James McAvoy", "M. Night Shyamalan"],
      ["Josh Brolin", "Will Smith"],
      ["Josh Brolin", "Scarlett Johansson"],
      ["Will Smith", "Scarlett Johansson"],
      ["Joel McHale"],
    ];
    beforeEach(() => {
      graph = new Graph();
      for (let edge of edges) {
        if (edge.length === 1) {
          graph.addVertex(edge[0]);
        } else {
          graph.addEdges(edge[0], edge[1]);
        }
      }
    });
    it("should not be recursive", () => {
      spy.on(graph, "breadthFirstTraversal");
      graph.breadthFirstTraversal("Kevin Bacon");
      expect(graph.breadthFirstTraversal).to.have.been.called.once;
    });

    it("should return an array of vertices visited in a bfs order", () => {
      expect(
        graph.breadthFirstTraversal("Kevin Bacon")
      ).to.have.ordered.members([
        "Kevin Bacon",
        "James McAvoy",
        "Josh Brolin",
        "Dianne Wiest",
        "M. Night Shyamalan",
        "Will Smith",
        "Scarlett Johansson",
        "Gene Hackman",
      ]);
    });
  });

  describe("#depthFirstTraversalIterative(startingVertex)", () => {
    let graph;
    const edges = [
      ["Kevin Bacon", "James McAvoy"],
      ["Kevin Bacon", "Josh Brolin"],
      ["Kevin Bacon", "Dianne Wiest"],
      ["Dianne Wiest", "Gene Hackman"],
      ["James McAvoy", "Josh Brolin"],
      ["James McAvoy", "M. Night Shyamalan"],
      ["Josh Brolin", "Will Smith"],
      ["Josh Brolin", "Scarlett Johansson"],
      ["Will Smith", "Scarlett Johansson"],
      ["Joel McHale"],
    ];
    beforeEach(() => {
      graph = new Graph();
      for (let edge of edges) {
        if (edge.length === 1) {
          graph.addVertex(edge[0]);
        } else {
          graph.addEdges(edge[0], edge[1]);
        }
      }
    });
    it("should not be recursive", () => {
      spy.on(graph, "depthFirstTraversalIterative");
      graph.depthFirstTraversalIterative("Kevin Bacon");
      expect(graph.depthFirstTraversalIterative).to.have.been.called.once;
    });

    it("should return an array of vertices visited in a dfs order", () => {
      expect(
        graph.depthFirstTraversalIterative("Kevin Bacon")
      ).to.have.ordered.members([
        "Kevin Bacon",
        "Dianne Wiest",
        "Gene Hackman",
        "Josh Brolin",
        "Scarlett Johansson",
        "Will Smith",
        "James McAvoy",
        "M. Night Shyamalan",
      ]);
    });
  });

  describe("#DepthFirstTraversalRecursive(startingVertex)", () => {
    let graph;
    const edges = [
      ["Kevin Bacon", "James McAvoy"],
      ["Kevin Bacon", "Josh Brolin"],
      ["Kevin Bacon", "Dianne Wiest"],
      ["Dianne Wiest", "Gene Hackman"],
      ["James McAvoy", "Josh Brolin"],
      ["James McAvoy", "M. Night Shyamalan"],
      ["Josh Brolin", "Will Smith"],
      ["Josh Brolin", "Scarlett Johansson"],
      ["Will Smith", "Scarlett Johansson"],
      ["Joel McHale"],
    ];
    beforeEach(() => {
      graph = new Graph();
      for (let edge of edges) {
        if (edge.length === 1) {
          graph.addVertex(edge[0]);
        } else {
          graph.addEdges(edge[0], edge[1]);
        }
      }
    });
    it("should be recursive", () => {
      spy.on(graph, "depthFirstTraversalRecursive");
      graph.depthFirstTraversalRecursive("Kevin Bacon");
      expect(graph.depthFirstTraversalRecursive).to.have.been.called.above(1);
    });

    it("should return an array of vertices visited in a dfs order", () => {
      expect(graph.depthFirstTraversalRecursive("Kevin Bacon")).to.have.ordered.members([
        'Kevin Bacon',
        'James McAvoy',
        'Josh Brolin',
        'Will Smith',
        'Scarlett Johansson',
        'M. Night Shyamalan',
        'Dianne Wiest',
        'Gene Hackman'
      ]);
    });
  });
});
