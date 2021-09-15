// babel 5.x plugin
export default function ({ Plugin, types: t }) {
  return new Plugin("async-arrow", {
    visitor: {
      ArrowFunctionExpression(node) {
        if (node.async) {
          // just running the ArrowFunctionExpression transformer
          this.ensureBlock();
          node.expression = false;
          node.type = "FunctionExpression";
          node.shadow = node.shadow || true;
        }
      }
    }
  });
}