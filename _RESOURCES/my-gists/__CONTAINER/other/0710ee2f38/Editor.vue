<template>
  <div class="editor editor-squished">
    <MenuBar @save="emitSave" :editor="editor"></MenuBar>
    <MenuBubble :editor="editor"></MenuBubble>
    <client-only>
      <EditorContent class="editor__content" :editor="editor"></EditorContent>
    </client-only>
  </div>
</template>

<script>
import { Editor, EditorContent } from "tiptap";
import {
  Heading,
  Bold,
  Italic,
  Code,
  CodeBlock,
  Strike,
  Underline,
  Link,
  History,
  Blockquote,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  CodeBlockHighlight,
  Placeholder,
} from "tiptap-extensions";
import javascript from "highlight.js/lib/languages/javascript";
import css from "highlight.js/lib/languages/css";
import MenuBubble from "~/components/Editor/MenuBubble";
import MenuBar from "~/components/Editor/MenuBar";
import Title from "~/components/Editor/Components/Title";
import Subtitle from "~/components/Editor/Components/Subtitle";
import Doc from "~/components/Editor/Components/Doc";

export default {
  components: {
    EditorContent,
    MenuBubble,
    MenuBar,
  },
  props: {
    blog: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      editor: null,
    };
  },
  mounted() {
    if (this.blog) {
      this.initEditor(this.blog.content);
    }
  },
  beforeDestroy() {
    // Always destroy your editor instance when it's no longer needed
    this.editor.destroy();
  },
  methods: {
    emitSave() {
      const html = this.editor.getHTML();
      const title = this.getNodeValueByName("title");
      const subtitle = this.getNodeValueByName("subtitle");
      if (!this.blog) {
        this.$store.dispatch("instructor/blog/CREATE_BLOG", {
          title,
          subtitle,
          content: html,
        });
      } else {
        this.$store.dispatch("instructor/blog/UPDATE_BLOG", {
          payload: {
            title,
            subtitle,
            content: html,
          },
          id: this.blog._id,
        });
      }
    },
    getNodeValueByName(name) {
      const doc = this.editor.state.doc.content;
      const nodes = doc.content;
      console.log(nodes);
      const node = nodes.find((n) => n.type.name === name);
      if (node) {
        return node.textContent;
      }
      return "";
    },
    initEditor(content = "") {
      this.editor = new Editor({
        content,
        extensions: [
          new Doc(),
          new Title(),
          new Subtitle(),
          new Placeholder({
            showOnlyCurrent: false,
            emptyNodeText: (node) => {
              if (node.type.name === "title") {
                return "Inspirational Title";
              }
              if (node.type.name === "subtitle") {
                return "Some catchy subtitle";
              }
              return "Write your story...";
            },
          }),
          new Heading({ levels: [1, 2, 3] }),
          new Bold(),
          new Code(),
          new Italic(),
          new Strike(),
          new Underline(),
          new History(),
          new Blockquote(),
          new HorizontalRule(),
          new OrderedList(),
          new BulletList(),
          new ListItem(),
          new CodeBlockHighlight({
            languages: {
              javascript,
              css,
            },
          }),
        ],
      });
    },
  },
};
</script>

<style lang="css" scoped>
.editor__content {
  min-height: 25rem;
  padding: 2rem;
  border-bottom: 1.5px solid #000000;
  border-left: 1.5px solid #000000;
  border-right: 1.5px solid #000000;
  background: #b2afccb7;
}
</style>
