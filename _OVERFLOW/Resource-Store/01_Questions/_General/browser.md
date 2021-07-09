Browser
=======

Glossary
--------

-   **BOM** - The Browser Object Model (BOM) is a browser-specific convention referring to all the objects exposed by the web browser. The `window` object is one of them.
-   **CSSOM** - CSS Object Model.
-   **DOM** - The Document Object Model (DOM) is a cross-platform and language-independent convention for representing and interacting with objects in HTML, XHTML, and XML documents.
-   **Reflow** - When the changes affect document contents or structure, or element position, a reflow (or relayout) happens.
-   **Repaint** - When changing element styles which don’t affect the element’s position on a page (such as `background-color`, `border-color`, `visibility`), the browser just repaints the element again with the new styles applied (that means a “repaint” or “restyle” is happening).
-   **Composite** - TODO

Rendering
---------

High level flow of how browsers render a webpage:

1.  DOM

-   The DOM (Document Object Model) is formed from the HTML that is received from a server.
-   Characters -&gt; Tokens -&gt; Nodes -&gt; DOM.
-   DOM construction is incremental.
-   CSS and JS are requested as the respective `<link>` and `<script>` tags are encountered.

1.  CSSOM

-   Styles are loaded and parsed, forming the CSSOM (CSS Object Model).
-   Characters -&gt; Tokens -&gt; Nodes -&gt; CSSOM.
-   CSSOM construction is not incremental.
-   Browser blocks page rendering until it receives and processes all the CSS.
-   CSS is render blocking.

1.  Render Tree

On top of DOM and CSSOM, a render tree is created, which is a set of objects to be rendered. Render tree reflects the DOM structure except for invisible elements (like the
