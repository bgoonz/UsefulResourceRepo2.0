# Inicio Rápido

Se recomienda instalar `docsify-cli` globalmente, lo que ayuda a inicializar y obtener una vista previa del sitio web localmente.

```bash
npm i docsify-cli -g
```

## Inicializar

Si desea escribir la documentación en el subdirectorio `./docs`, puede usar el comando `init`.

```bash
docsify init ./docs
```

## Escribir contenido

Después de que se complete `init`, puede ver la lista de archivos en el subdirectorio `./docs`.

* `index.html` como el archivo de entrada
* `README.md` como la página de inicio (la principal)
* `.nojekyll` impide que las páginas de GitHub ignoren los archivos que comienzan con un guión bajo

Puede actualizar fácilmente la documentación en `./docs/README.md`, por supuesto puede agregar [más páginas](/es/more-pages.md).

## Vista previa de su sitio

Ejecute el servidor local con `docsify serve`. Puede obtener una vista previa de su sitio en su navegador `http://localhost:3000`.

```bash
docsify serve docs
```

?> Para más casos de uso de `docsify-cli`, dirígete a la [documentación de docsify-cli](https://github.com/QingWei-Li/docsify-cli).

## Inicialización manual

Si no te gusta `npm` o tiene problemas para instalar la herramienta, puede crear manualmente `index.html`:

```html
<!-- index.html -->

<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta charset="UTF-8">
  <link rel="stylesheet" href="//unpkg.com/docsify/themes/vue.css">
</head>
<body>
  <div id="app"></div>
  <script>
    window.$docsify = {
      //...
    }
  </script>
  <script src="//unpkg.com/docsify/lib/docsify.min.js"></script>
</body>
</html>
```

Si instaló Python en su sistema, puede usarlo fácilmente para ejecutar un servidor estático para obtener una vista previa de su sitio.

```bash
cd docs && python -m SimpleHTTPServer 3000
```

## Diálogo de carga

Si desea, puede mostrar un diálogo de carga antes de que docsify comience a mostrar su documentación:

```html
  <!-- index.html -->

  <div id="app">Please wait...</div>
```

Debes de configurar el atributo `data-app` si cambiaste `el`:

```html
  <!-- index.html -->

  <div data-app id="main">Please wait...</div>

  <script>
    window.$docsify = {
      el: '#main'
    }
  </script>
```

Comparar la [configuración de el](/es/configuration.md#el).
