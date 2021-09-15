# Cover

Activa la característica de cover cambiando la configuración `coverpage` a **true**, comparar [configuración de coverpage](/es/configuration.md#coverpage).

## Uso básico

Poner `coverpage` a **true**, y crear un `_coverpage.md`:

```html
<!-- index.html -->

<script>
  window.$docsify = {
    coverpage: true
  }
</script>
<script src="//unpkg.com/docsify/lib/docsify.min.js"></script>
```

```markdown
<!-- _coverpage.md -->

![logo](/es/_media/icon.svg)

# docsify <small>4.8.5</small>

> A magical documentation site generator.

* Simple and lightweight (~21kB gzipped)
* No statically built html files
* Multiple themes

[GitHub](https://github.com/docsify/docsify/)
[Get Started](/es/#docsify)
```

## Background personalizado

El color de fondo (o color del background) es general aleatoriamente por defecto. Tu puedes personalizar el color de fondo o poner una imagen de fondo:

```markdown
<!-- _coverpage.md -->

# docsify <small>4.8.5</small>

[GitHub](https://github.com/docsify/docsify/)
[Get Started](/es/#quick-start)

<!-- background image -->

![](/es/_media/bg.png)

<!-- background color -->

![color](#f0f0f0)
```

## Coverpage como página de inicio

Normalmente, la portada y la página de inicio aparecen al mismo tiempo. Por supuesto, también puede separar la portada por [opción onlyCover](/es/configuration.md#onlycover).

## Portadas múltiples

Si el sitio de su documento está en más de un idioma, puede ser útil establecer varias cubiertas.

Por ejemplo, su estructura de documentos es como esta:

```text
.
└── docs
    ├── README.md
    ├── guide.md
    ├── _coverpage.md
    └── zh-cn
        ├── README.md
        └── guide.md
        └── _coverpage.md
```

Tu puedes configurar así:

```js
window.$docsify = {
  coverpage: ['/', '/zh-cn/']
};
```

O bien con un nombre de archivo especial:

```js
window.$docsify = {
  coverpage: {
    '/': 'cover.md',
    '/zh-cn/': 'cover.md'
  }
};
```
