# Themes

Actualmente hay tres diseños (o themes) disponibles. Copie el diseño personalizado del sitio web de [Vue](//vuejs.org) o [buble](//buble.surge.sh) o la contribución de [@liril-net](https://github.com/liril-net) al diseño del estilo negro.

```html
<link rel="stylesheet" href="//unpkg.com/docsify/themes/vue.css">
<link rel="stylesheet" href="//unpkg.com/docsify/themes/buble.css">
<link rel="stylesheet" href="//unpkg.com/docsify/themes/dark.css">
<link rel="stylesheet" href="//unpkg.com/docsify/themes/pure.css">
```

!> Los archivos comprimidos están disponibles en `/lib/themes/`.

```html
<!-- compressed -->

<link rel="stylesheet" href="//unpkg.com/docsify/lib/themes/vue.css">
<link rel="stylesheet" href="//unpkg.com/docsify/lib/themes/buble.css">
<link rel="stylesheet" href="//unpkg.com/docsify/lib/themes/dark.css">
<link rel="stylesheet" href="//unpkg.com/docsify/lib/themes/pure.css">
```

Si tiene alguna idea o desea desarrollar un nuevo diseño, puede enviar un [pull request](https://github.com/QingWei-Li/docsify/pulls).

#### Clic para previsualizar

<div class="demo-theme-preview">
  <a data-theme="vue">vue.css</a>
  <a data-theme="buble">buble.css</a>
  <a data-theme="dark">dark.css</a>
  <a data-theme="pure">pure.css</a>
</div>

<style>
  .demo-theme-preview a {
    padding-right: 10px;
  }

  .demo-theme-preview a:hover {
    cursor: pointer;
    text-decoration: underline;
  }
</style>

<script>
  var preview = Docsify.dom.find('.demo-theme-preview');
  var themes = Docsify.dom.findAll('[rel="stylesheet"]');

  preview.onclick = function (e) {
    var title = e.target.getAttribute('data-theme')

    themes.forEach(function (theme) {
      theme.disabled = theme.title !== title
    });
  };
</script>
