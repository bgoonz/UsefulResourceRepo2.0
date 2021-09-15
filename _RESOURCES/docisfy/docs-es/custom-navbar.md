# Personalizar navbar

## HTML

Si necesita una navegación personalizada, puede crear una barra de navegación basada en HTML.

!> Tenga en cuenta que los enlaces comienzan con `#/`.

```html
<!-- index.html -->

<body>
  <nav>
    <a href="#/">EN</a>
    <a href="#/zh-cn/">中文</a>
  </nav>
  <div id="app"></div>
</body>
```

## Markdown

Alternativamente, puede crear un archivo de navegación personalizada basado en markdown estableciendo `loadNavbar` en **true** y creando `_navbar.md`, comparar [configuración del loadNavbar](/es/configuration.md#loadnavbar).

```html
<!-- index.html -->

<script>
  window.$docsify = {
    loadNavbar: true
  }
</script>
<script src="//unpkg.com/docsify/lib/docsify.min.js"></script>
```

```markdown
<!-- _navbar.md -->

* [En](/)
* [chinese](/zh-cn/)
```

!> Necesita crear un `.nojekyll` en `./docs` para evitar que GitHub Pages ignoren los archivos que comienzan con un guión bajo.

`_navbar.md` es cargado desde cada directorio de nivel. Si el directorio actual no tiene `_navbar.md`, volverá al directorio padre. Si, por ejemplo, la ruta actual es `/guide/quick-start`, el `_navbar.md` wserá cargado desde `/guide/_navbar.md`.

## Anidando

Puede crear listas secundarias al sangrar (tabular) elementos que están bajo un determinado padre.

```markdown
<!-- _navbar.md -->

* Getting started

  * [Quick start](/es/quickstart.md)
  * [Writing more pages](/es/more-pages.md)
  * [Custom navbar](/es/custom-navbar.md)
  * [Cover page](/es/cover.md)

* Configuration
  * [Configuration](/es/configuration.md)
  * [Themes](/es/themes.md)
  * [Using plugins](/es/plugins.md)
  * [Markdown configuration](/es/markdown.md)
  * [Language highlight](/es/language-highlight.md)
```

produce

![Navbar anidado](/es/_images/nested-navbar.png 'Nesting navbar')

## Combinando barras de navegación personalizadas con el plugin emoji

Si usas el [plugin emoji](/es/plugins#emoji):

```html
<!-- index.html -->

<script>
  window.$docsify = {
    // ...
  }
</script>
<script src="//unpkg.com/docsify/lib/docsify.min.js"></script>
<script src="//unpkg.com/docsify/lib/plugins/emoji.min.js"></script>
```

podrias, por ejemplo, usar los emojis de banderas en tu archivo `_navbar.md`:

```markdown
<!-- _navbar.md -->

* [:us:, :uk:](/)
* [:cn:](/zh-cn/)
```
