/**
 * @fileoverview
 * This transform creates a sync copy of all async functions and changes the
 * async function to call a delegate instead. I.e. the function
 *
 * export async function foo(a, b, c) {
 *  // implementation
 * }
 *
 * is converted to
 *
 * var delegateName = require('./path/to/delegateName');
 *
 * export function foo(a, b, c) {
 *   // implementation
 * }
 *
 * export function genFoo(a, b, c) {
 *   return delegateName('foo', [a, b, c]);
 * }
 *
 */

const babel = require('babel-core');
const path = require('path');

const t = babel.types;
const Transformer = babel.Transformer;

/**
 * This builds the call to the delegate function, i.e.
 *
 * return delegateName('functionName', args);
 */
function buildCallTo(delegateName, functionName, args) {
  return t.returnStatement(
    t.callExpression(
      t.identifier(delegateName),
      [
        t.literal(functionName),
        t.arrayExpression(args)
      ]
    )
  );
}

/**
 * This builds an require call to load the file located at `path` into `name`,
 * i.e.
 *
 * var name = require('path');
 */
function buildImportStatement(path, name) {
  return t.importDeclaration(
    [t.importDefaultSpecifier(t.identifier(name))],
    t.literal(path)
  );
}

function makeSync(node) {
  node.async = false;
}

function createAsyncCopy(node, scope) {
  const name = node.id.name;
  const asyncName = `gen${name[0].toUpperCase()}${name.substr(1)}`;
  // The function doesn't actually have to be marked as async, since the
  // delegate function returns a promise anyway.
  const params = node.params.map(param => {
    if (t.isAssignmentPattern(param)) {
      param = param.left;
    }
    // convert patters to single variables
    if (t.isObjectPattern(param) ||
        t.isArrayPattern(param)) {
      return scope.generateUidIdentifierBasedOnNode(param);
    }
    return t.identifier(param.name);
  });
  const exportDeclaration = t.exportNamedDeclaration(
    t.functionDeclaration(
      t.identifier(asyncName),
      params,
      t.blockStatement([
        buildCallTo(delegateName, node.id.name, params)
      ])
    )
  );
  return exportDeclaration;
}

var delegateName = 'delegate';
const delegatePath = './src/_internals';
let insertAsync = false;

module.exports = new Transformer('async-to-sync', {
  Program: {
    enter() {
      insertAsync = false;
    },

    exit(node, parent, scope, file) {
      if (insertAsync) {
        // If we found any async functions, we have to require the delegate
        // method.
        const resolvedDelegatePath = path.join(path.relative(
          path.dirname(file.log.filename),
          path.resolve(delegatePath)
        ), delegateName);

        const moduleBody = node.body;
        moduleBody.unshift(
          buildImportStatement(resolvedDelegatePath, delegateName)
        );
      }
    },
  },

  AwaitExpression(node) {
    return node.argument;
  },

  Function(node) {
    makeSync(node);
    return node;
  },

  ExportNamedDeclaration(node, parent, scope) {
    if (t.isFunctionDeclaration(node.declaration, {async: true})) {
      // If the function is async and at the top level, we make it
      // sync and insert an async version after it.
      const ex = createAsyncCopy(node.declaration, scope);
      this.insertAfter(ex);
      insertAsync = true;
    }
  },
});
