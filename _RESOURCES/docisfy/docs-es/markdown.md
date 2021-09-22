# Configuración de Markdown

**docsify** usa [marked](https://github.com/markedjs/marked) como _parser_ de Markdown. Puede personalizar cómo renderiza su contenido de Markdown en HTML personalizando el `renderer`:

```js
window.$docsify = {
  markdown: {
    smartypants: true,
    renderer: {
      link: function() {
        // ...
      }
    }
  }
}
```

?> Opciones de configuración Referencia [documentación de marked](https://github.com/markedjs/marked#options-1)

Incluso usted puede personalizar completamente las reglas de _parsing_.

```js
window.$docsify = {
  markdown: function(marked, renderer) {
    // ...

    return marked
  }
}
```

## Mermaid Soportado

```js
// Import mermaid
//  <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.css">
//  <script src="//cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"></script>

var num = 0;
mermaid.initialize({ startOnLoad: false });

window.$docsify = {
  markdown: {
    renderer: {
      code: function(code, lang) {
        if (lang === "mermaid") {
          return (
            '<div class="mermaid">' + mermaid.render('mermaid-svg-' + num++, code) + "</div>"
          );
        }
        return this.origin.code.apply(this, arguments);
      }
    }
  }
}
```
