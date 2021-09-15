# Más páginas

Si necesita más páginas, simplemente puede crear más archivos markdown en su directorio docsify. ISi crea un archivo llamado `guide.md`, entonces es accesible a través de `/#/guide`.

Por ejemplo, la estructura del directorio es la siguiente:

```text
.
└── docs
    ├── README.md
    ├── guide.md
    └── zh-cn
        ├── README.md
        └── guide.md
```

Rutas coincidentes

```text
docs/README.md        => http://domain.com
docs/guide.md         => http://domain.com/guide
docs/zh-cn/README.md  => http://domain.com/zh-cn/
docs/zh-cn/guide.md   => http://domain.com/zh-cn/guide
```

## Sidebar

Para tener sidebar, puedes crear tu propio `_sidebar.md` (vea [el sidebar de esta documentación](https://github.com/QingWei-Li/docsify/blob/master/docs/_sidebar.md) para un ejemplo):

En primer lugar, necesita establecer `loadSidebar` en **true**. Los detalles están disponibles en la [configuración del loadSidebar](/es/configuration.md#loadsidebar).

```html
<!-- index.html -->

<script>
  window.$docsify = {
    loadSidebar: true
  }
</script>
<script src="//unpkg.com/docsify/lib/docsify.min.js"></script>
```

Crear el `_sidebar.md`:

```markdown
<!-- docs/_sidebar.md -->

* [Home](/es/)
* [Guide](/es/guide.md)
```

Necesita crear un `.nojekyll` en `./docs` para evitar que GitHub Pages ignoren los archivos que comienzan con un guión bajo.

`_sidebar.md` es cargado desde cada directorio de nivel. Si el directorio actual no tiene `_sidebar.md`, volverá al directorio padre. Si, por ejemplo, la ruta actual es `/guide/quick-start`, el `_sidebar.md` será cargado desde `/guide/_sidebar.md`.

Puedes especificar un `alias` para evitar un repliegue innecesario.

```html
<script>
  window.$docsify = {
    loadSidebar: true,
    alias: {
      '/.*/_sidebar.md': '/_sidebar.md'
    }
  }
</script>
```

## Tabla de contenido

Una vez que hayas creado `_sidebar.md`, el contenido del sidebar se genera automáticamente en base a los encabezados en los archivos markdown.

Un sidebar personalizado también puede generar automáticamente una tabla de contenido configurando un `subMaxLevel`, comparar [configuración subMaxLevel](/es/configuration.md#submaxlevel).

```html
<!-- index.html -->

<script>
  window.$docsify = {
    loadSidebar: true,
    subMaxLevel: 2
  }
</script>
<script src="//unpkg.com/docsify/lib/docsify.min.js"></script>
```

## Ignorando subcabeceras

Cuando `subMaxLevel` está establecido, cada encabezado se agrega automáticamente a la tabla de contenido de forma predeterminada. Si quiere ignorar un encabezado específico, agregue `{docsify-ignore}`.

```markdown
# Getting Started

## Header {docsify-ignore}

Este encabezado (header) no aparecerá en la tabla de contenido del sidebar.
```

Para ignorar todos los encabezados en una página específica, puede usar `{docsify-ignore-all}` en el primer encabezado de la página.

```markdown
# Getting Started {docsify-ignore-all}

## Header

Este encabezado (header) no aparecerá en la tabla de contenido del sidebar.
```

Ambos `{docsify-ignore}` y `{docsify-ignore-all}` no se mostrarán en la página cuando se usen.
