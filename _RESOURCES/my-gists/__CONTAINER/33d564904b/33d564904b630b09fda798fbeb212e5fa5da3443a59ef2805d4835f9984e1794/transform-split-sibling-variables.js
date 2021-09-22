// transform-split-sibling-variables
// Opposite of http://babeljs.io/docs/plugins/transform-merge-sibling-variables/

export default function ({ types: t }) {
  return {
    visitor: {
      VariableDeclaration(path) {
        if (!path.inList) {
          return;
        }

        const { kind, declarations } = path.node;
        if (declarations.length === 1) {
          return;
        }
        
        path.replaceWithMultiple(
          declarations.map(({ id, init }) => {
            return t.variableDeclaration(kind, [
              t.variableDeclarator(id, init)
            ])
          })
        );                                                                                                                                                                                                                                               
      }
    }
  };
}