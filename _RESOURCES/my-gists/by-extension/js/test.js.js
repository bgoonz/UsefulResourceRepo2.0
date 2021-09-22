import _ from 'lodash';

import {Graph} from './graph';
import should from 'should';

describe('Graph', () => {

  let nodes = {
    'a' : 1,
    'b' : 2,
    'c' : 3,
    'd' : 4
  };
  let edges = {
    'a -> b' : 5,
    'a -> c' : 10,
    'b -> c' : 5,
    'b -> d' : 10,
    'c -> d' : 5
  };

  describe('constructor', function() {
    it('should create graph successfully', () => {
      should.exist(Graph);
      should.exist(new Graph());
    });

    it('should create graph with initial data successfully', () => {
      let graph = new Graph({ nodes: nodes, edges: edges });
      should.exist(graph);
      graph.getNodeValue('a').should.equal(1);
      graph.getNodeValue('b').should.equal(2);
      graph.getNodeValue('c').should.equal(3);
      graph.getNodeValue('d').should.equal(4);
      graph.getEdgeValue('a', 'b').should.equal(5);
      graph.getEdgeValue('b', 'a').should.equal(5);
      graph.getEdgeValue('a', 'c').should.equal(10);
      graph.getEdgeValue('c', 'a').should.equal(10);
      graph.getEdgeValue('b', 'c').should.equal(5);
      graph.getEdgeValue('c', 'b').should.equal(5);
      graph.getEdgeValue('b', 'd').should.equal(10);
      graph.getEdgeValue('d', 'b').should.equal(10);
      graph.getEdgeValue('c', 'd').should.equal(5);
      graph.getEdgeValue('d', 'c').should.equal(5);
    });

    it('should create graph with no value.', () => {
      let graph = new Graph({
        nodes: ['a', 'b', 'c'],
        edges: [ 'a -> b', 'b -> c', 'a -> c' ]
      });
      should.exist(graph);
      graph.adjacent('a', 'b').should.be.true;
      graph.adjacent('b', 'c').should.be.true;
      graph.adjacent('a', 'c').should.be.true;
    });
  });

  it('should add nodes successfully', () => {
    let graph = new Graph();
    graph.addNode('a').should.equal(graph);
    should.not.exist(graph.getNodeValue('a'));
    graph.addNode('b', 10).should.equal(graph);
    graph.getNodeValue('b').should.equal(10);
    graph.ensureNode('c').should.equal(graph);
    should.not.exist(graph.getNodeValue('c'));
    graph.ensureNode('b').should.equal(graph);
    graph.getNodeValue('b').should.equal(10);
  });

  describe('addEdge', function() {
    it('should add edges successfully', () => {
      let graph = new Graph();
      graph.addNode('a').addNode('b').addEdge('a', 'b', 10).should.equal(graph);
      graph.getEdgeValue('a', 'b').should.equal(10);
      graph.getEdgeValue('b', 'a').should.equal(10);
      graph.addEdge('b', 'c', 20).should.equal(graph);
      graph.getEdgeValue('b', 'c').should.equal(20);
      graph.getEdgeValue('c', 'b').should.equal(20);
    });

    it('should add edges with name successfully', () => {
      let graph = new Graph();
      graph.addEdge('a -> b', 1).should.equal(graph);
      graph.adjacent('a', 'b').should.be.true;
      graph.getEdgeValue('a', 'b').should.equal(1);
      graph.addEdge('b -> c', 'bc').should.equal(graph);
      graph.adjacent('b', 'c').should.be.true;
      graph.getEdgeValue('b', 'c').should.equal('bc');
      graph.addEdge('a -> c' ).should.equal(graph);
      graph.adjacent('a', 'c').should.be.true;
    });
  });

  describe('searches', function() {
    let graph, visited;

    let defaultOptions = {
      visitNode: function (node, value) {
        value.should.equal(nodes[node]);
        visited.push(node);
      },
      visitEdge: function (nodeA, nodeB, value) {
        visited.push(nodeA + ' -> ' + nodeB);
      }
    };

    beforeEach(function () {
      graph = new Graph({ nodes: nodes, edges: edges });
      visited = [];
    });

    describe('dfs', function() {
      it('should visit all nodes by default', function() {
        graph.dfs('a', defaultOptions);
        visited.should.deepEqual([
          'a',
          'a -> b', 'b',
          'b -> c', 'c',
          'c -> d', 'd'
        ]);
      });

      it('should visit all edges with willFollowEdge IfUnvisited', function () {
        graph.dfs('a', _.defaults({
          willFollowEdge: 'IfUnvisited'
        }, defaultOptions));

        visited.should.deepEqual([
          'a',
          'a -> b', 'b',
          'b -> c', 'c',
          'c -> a', 'a',
          'c -> d', 'd',
          'd -> b', 'b'
        ]);
      });

      it('should call enter/leave node callback with right order.', function() {
        let stack = [];
        let trace = [];
        graph.dfs('a', _.defaults({
          willFollowEdge: function (nodeFrom, nodeTo, options) {
            return !(options.nodeVisited(nodeTo) ||
              (nodeFrom === 'b' && nodeTo === 'c') ||
              (nodeFrom === 'c' && nodeTo === 'b'));
          },
          onEnterNode: function (n) {
            stack.push(n);
            trace.push(stack.join(' -> '));
          },
          onLeaveNode: function (n) {
            stack.pop().should.equal(n);
          }
        }));
        trace.should.deepEqual([
          'a',
          'a -> b',
          'a -> b -> d',
          'a -> b -> d -> c'
        ]);
      });
    });

    describe('bfs', function() {
      it('should visit all nodes by default', function () {
        graph.bfs('a', defaultOptions);
        visited.should.deepEqual([
          'a',
          'a -> b', 'b',
          'a -> c', 'c',
          'b -> d', 'd'
        ]);
      });

      it('should visit all edges with willFollowEdge IfUnvisited', function () {
        graph.bfs('a', _.defaults({
          willFollowEdge: 'IfUnvisited',
        }, defaultOptions));
        visited.should.deepEqual([
          'a',
          'a -> b', 'b',
          'a -> c', 'c',
          'b -> c', 'c',
          'b -> d', 'd',
          'c -> d', 'd'
        ]);
      });
    });
  });

  describe('findAllLoops', function() {
    it('should find all loops without duplication', function() {
      let graph = new Graph({
        edges: [
          'a -> b',
          'b -> c',
          'a -> c',
          'b -> d',
          'c -> d',
          'd -> a'
        ]
      });
      let loops = [];
      graph.findAllLoops('a', function (loop) {
        loops.push(loop);
      });
      loops.should.deepEqual([
        [ 'a', 'b', 'c' ],
        [ 'b', 'c', 'd' ],
        [ 'a', 'b', 'c', 'd' ]
      ]);
    });

    it('should find all loops in all distributed parts', function() {
      let graph = new Graph({
        edges: [
          'a -> b',
          'b -> c',
          'c -> a',
          'd -> e',
          'e -> f',
          'f -> g',
          'g -> e',
          'f -> d'
        ]
      });
      let loops = [];
      graph.findAllLoops(function (loop) {
        loops.push(loop);
      });
      loops.should.deepEqual([
        [ 'a', 'b', 'c' ],
        [ 'e', 'f', 'g' ],
        [ 'd', 'e', 'f' ]
      ]);
    });
  });
});