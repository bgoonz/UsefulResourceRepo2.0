import { Block } from "slate";

export const schema = {
  document: {
    normalize: (change, { code, node, child, index }) => {
      switch (code) {
        case "child_type_invalid": {
          const type = index === 0 ? "heading-one" : "paragraph";
          return change.setNodeByKey(child.key, type);
        }
        case "child_required": {
          const block = Block.create(index === 0 ? "heading-one" : "paragraph");
          return change.insertNodeByKey(node.key, index, block);
        }
        case "last_child_type_invalid": {
          const paragraph = Block.create("paragraph");
          return change.insertNodeByKey(node.key, node.nodes.size, paragraph);
        }
      }
    },
  },
  blocks: {
    image: {
      isVoid: true,
    },
  },
};
