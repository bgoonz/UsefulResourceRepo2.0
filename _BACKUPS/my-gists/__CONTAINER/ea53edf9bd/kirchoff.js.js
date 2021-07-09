import _ from 'lodash';
import {Graph} from './graph';

function getVariable(nodeA, nodeB) {
  return 'I(' + nodeA + ', ' + nodeB + ')';
}

function generateEquations(graph, nodeStart, nodeEnd) {
  let components;

  graph.iterateNodes(function (node, value) {
    if (node !== nodeStart && node !== nodeEnd) {
      components = [];
      graph.iterateAdjacent(node, function (nodeAdj, value) {
        components.push(getVariable(node, nodeAdj));
      });
      console.log(components.join(' + ') + ' = 0');
    }
  });

  components = [];
  graph.iterateAdjacent(nodeStart, function (nodeAdj, value) {
    components.push(getVariable(nodeStart, nodeAdj));
  });
  graph.iterateAdjacent(nodeEnd, function (nodeAdj, value) {
    components.push(getVariable(nodeAdj, nodeEnd));
  });
  console.log(components.join(' + ') + ' = 0');

  graph.findAllLoops(function (loop) {
    components = [];
    loop.push(loop[0]);
    var nodeLast = null;
    _.forEach(loop, function (node) {
      if (nodeLast) {
        components.push([
          getVariable(nodeLast, node),
          graph.getEdgeValue(nodeLast, node)
        ].join(' * '));
      }
      nodeLast = node;
    });
    console.log(components.join(' + ') + ' = 0');
  });

}

let graph = new Graph({
  edges: {
    'a -> b': 10,
    'b -> c': 5,
    'a -> c': 5,
    'b -> d': 5,
    'c -> d': 10,
  }
});

generateEquations(graph, 'a', 'd');