// babel 5.8.22 with astexplorer.net
export default function ({ Plugin, types: t }) {
  function addCurly(body) {
    if (t.isExpressionStatement(body)) {
      return t.blockStatement([body]);
    } else if (Array.isArray(body) && body.length > 0 && !t.isBlockStatement(body[0])) {
      return [t.blockStatement(body)];
    } else {
      return body;
    }
  }
  
  return new Plugin("add-curly", {
    visitor: {
      IfStatement({ test, consequent, alternate }) {
        consequent = addCurly(consequent);
        alternate  = addCurly(alternate);

        if (alternate == null) {
          return t.ifStatement(test, consequent);
        } else {
          return t.ifStatement(test, consequent, alternate);
        }
      },
      WhileStatement({ test, body }) {
        body = addCurly(body);

        return t.WhileStatement(test, body);
      },
      ForStatement({ init, test, update, body }) {
        body = addCurly(body);

        return t.ForStatement(init, test, update, body);
      },
      ForInStatement({ left, right, body }) {
        body = addCurly(body);

        return t.ForInStatement(left, right, body);
      },
      ForOfStatement({ left, right, body }) {
        body = addCurly(body);
        
        return t.ForOfStatement(left, right, body);
      },
      DoWhileStatement({ body, test }) {
        body = addCurly(body);

        return t.DoWhileStatement(body, test);
      },
      SwitchCase({ consequent, test }) {
        consequent = addCurly(consequent);

        return t.SwitchCase(test, consequent);
      }
    }
  });
}