// import React from 'react';
// import BaseLayout from '../components/BaseLayout.js';
// import ImageAdd from '../components/blog/ImageAdd';
// import {
//   EditorState,
//   convertToRaw,
//   convertFromRaw,
//   DefaultDraftBlockRenderMap,
//   RichUtils,
//   Modifier
// } from "draft-js";
// import "draft-js/dist/Draft.css";

// import Editor, { composeDecorators } from "draft-js-plugins-editor";

// import createFocusPlugin from 'draft-js-focus-plugin';
// import createBlockDndPlugin from 'draft-js-drag-n-drop-plugin';
// import createAlignmentPlugin from 'draft-js-alignment-plugin';
// import createImagePlugin from 'draft-js-image-plugin';
// import createSideToolbarPlugin from 'draft-js-side-toolbar-plugin';
// import createLinkPlugin from 'draft-js-anchor-plugin';
// import createResizeablePlugin from 'draft-js-resizeable-plugin';
// import createInlineToolbarPlugin, {
//   Separator
// } from "draft-js-inline-toolbar-plugin";
// import "draft-js-inline-toolbar-plugin/lib/plugin.css";
// import 'draft-js-side-toolbar-plugin/lib/plugin.css';
// import 'draft-js-image-plugin/lib/plugin.css';

// import {
//   ItalicButton,
//   BoldButton,
//   UnderlineButton,
//   CodeButton,
//   HeadlineOneButton,
//   HeadlineTwoButton,
//   HeadlineThreeButton,
//   UnorderedListButton,
//   OrderedListButton,
//   BlockquoteButton,
//   CodeBlockButton
// } from "draft-js-buttons";

// // import 'react-quill/dist/quill.snow.css';
// // import 'react-quill/dist/quill.bubble.css';

// // import ReactQuill from 'react-quill'; // ES6
// const focusPlugin = createFocusPlugin();
// const blockDndPlugin = createBlockDndPlugin();
// const alignmentPlugin = createAlignmentPlugin();
// const linkPlugin = createLinkPlugin();
// const sideToolbarPlugin = createSideToolbarPlugin();
// const resizeablePlugin = createResizeablePlugin();

// const decorator = composeDecorators(
//   resizeablePlugin.decorator,
//   alignmentPlugin.decorator,
//   focusPlugin.decorator,
//   blockDndPlugin.decorator
// );

// const imagePlugin = createImagePlugin({decorator, theme: {image: 'blog-image'}});
// const inlineToolbarPlugin = createInlineToolbarPlugin();

// const { AlignmentTool } = alignmentPlugin;
// const { InlineToolbar } = inlineToolbarPlugin;
// const { SideToolbar } = sideToolbarPlugin;
// const plugins = [
//   inlineToolbarPlugin,
//   linkPlugin,
//   sideToolbarPlugin,
//   blockDndPlugin,
//   focusPlugin,
//   alignmentPlugin,
//   resizeablePlugin,
//   imagePlugin
// ];

// class BlogCreate extends React.Component {

//   constructor(props) {
//     super(props);

//     this.state = {editorState: EditorState.createEmpty()};
//     this.onChange = (editorState) => this.setState({editorState});

//     this.setEditor = (editor) => {
//       this.editor = editor;
//     };

//     this.focusEditor = () => {
//       if (this.editor) {
//         this.editor.focus();
//       }
//     };
//   }

//     componentDidMount() {
//       this.setState({ editor: Editor })
//     }

//   render() {
//     const { editorState } = this.state;

//     return (
//       <BaseLayout>
//         <section className="blogCreate-page">
//           <div className="container">
//           { this.state.editor &&
//             <div className="editor" onClick={this.focus}>
//               <Editor
//                 onChange={this.onChange}
//                 editorState={this.state.editorState}
//                 plugins={plugins}
//                 ref={element => {
//                   this.editor = element;
//                 }}
//                 placeholder="Go on, type something or paste a link and see it linkify itself."
//               />
//               <InlineToolbar >
//                 {
//                   (externalProps) => (
//                     <div>
//                       <HeadlineOneButton {...externalProps}/>
//                       <HeadlineTwoButton {...externalProps}/>
//                       <HeadlineThreeButton {...externalProps}/>
//                       <BoldButton {...externalProps} />
//                       <ItalicButton {...externalProps} />
//                       <UnderlineButton {...externalProps} />
//                       <CodeButton {...externalProps} />
//                       <Separator {...externalProps} />
//                       <UnorderedListButton {...externalProps} />
//                       <OrderedListButton {...externalProps} />
//                       <BlockquoteButton {...externalProps} />
//                       <CodeBlockButton {...externalProps} />
//                       <linkPlugin.LinkButton {...externalProps} />
//                     </div>
//                   )
//                 }

//               </InlineToolbar>
//               <SideToolbar />
//               <ImageAdd
//                 editorState={this.state.editorState}
//                 onChange={this.onChange}
//                 modifier={imagePlugin.addImage}
//               />
//             </div>
//           }
//           </div>
//         </section>
//       </BaseLayout>
//     )
//   }
// }

// export default BlogCreate;
