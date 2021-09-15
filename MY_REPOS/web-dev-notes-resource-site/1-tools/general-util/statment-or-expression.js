(() => {
  'use strict';
  function isExpression ( node ) {
    if ( node == null ) { return false; }
    switch ( node.type ) {
      case 'ArrayExpression':
      case 'AssignmentExpression':
      case 'BinaryExpression':
      case 'CallExpression':
      case 'ConditionalExpression':
      case 'FunctionExpression':
      case 'Identifier':
      case 'Literal':
      case 'LogicalExpression':
      case 'MemberExpression':
      case 'NewExpression':
      case 'ObjectExpression':
      case 'SequenceExpression':
      case 'ThisExpression':
      case 'UnaryExpression':
      case 'UpdateExpression':
        return true;
    }
    return false;
  }

  function isIterationStatement ( node ) {
    if ( node == null ) { return false; }
    switch ( node.type ) {
      case 'DoWhileStatement':
      case 'ForInStatement':
      case 'ForStatement':
      case 'WhileStatement':
        return true;
    }
    return false;
  }

  function isStatement ( node ) {
    if ( node == null ) { return false; }
    switch ( node.type ) {
      case 'BlockStatement':
      case 'BreakStatement':
      case 'ContinueStatement':
      case 'DebuggerStatement':
      case 'DoWhileStatement':
      case 'EmptyStatement':
      case 'ExpressionStatement':
      case 'ForInStatement':
      case 'ForStatement':
      case 'IfStatement':
      case 'LabeledStatement':
      case 'ReturnStatement':
      case 'SwitchStatement':
      case 'ThrowStatement':
      case 'TryStatement':
      case 'VariableDeclaration':
      case 'WhileStatement':
      case 'WithStatement':
        return true;
    }
    return false;
  }

  function isSourceElement ( node ) {
    return isStatement( node ) || node != null && node.type === 'FunctionDeclaration';
  }

  function trailingStatement ( node ) {
    switch ( node.type ) {
      case 'IfStatement':
        if ( node.alternate != null ) {
          return node.alternate;
        }
        return node.consequent;

      case 'LabeledStatement':
      case 'ForStatement':
      case 'ForInStatement':
      case 'WhileStatement':
      case 'WithStatement':
        return node.body;
    }
    return null;
  }

  function isProblematicIfStatement ( node ) {
    var current;

    if ( node.type !== 'IfStatement' ) {
      return false;
    }
    if ( node.alternate == null ) {
      return false;
    }
    current = node.consequent;
    do {
      if ( current.type === 'IfStatement' ) {
        if ( current.alternate == null ) {
          return true;
        }
      }
      current = trailingStatement( current );
    } while ( current );

    return false;
  }

  module.exports = {
    isExpression: isExpression,
    isStatement: isStatement,
    isIterationStatement: isIterationStatement,
    isSourceElement: isSourceElement,
    isProblematicIfStatement: isProblematicIfStatement,

    trailingStatement: trailingStatement
  };
}());
