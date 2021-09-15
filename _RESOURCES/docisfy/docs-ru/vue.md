# Совместимость с Vue

Вы можете писать компоненты Vue непосредственно в файлах Markdown, и он будет исполнен. Вы можете использовать эту возможность для написания примеров на Vue и документации совместно.

## Основное использование

Загружает Vue из `./index.html`.

```html
<script src="//unpkg.com/vue"></script>
<script src="//unpkg.com/docsify"></script>

<!-- Или использовать минифицированные версии файлов -->
<script src="//unpkg.com/vue/dist/vue.min.js"></script>
<script src="//unpkg.com/docsify/lib/docsify.min.js"></script>
```

Затем вы можете сразу же написать Vue-код в файле Markdown. 
Выражение `new Vue({ el: '#main' })` выполнится по умолчанию для создания экземпляра.

*README.md*

````markdown
# Руководство по Vue

Использование `v-for`.

```html
<ul>
  <li v-for="i in 10">{{ i }}</li>
</ul>
```

<ul>
  <li v-for="i in 10">{{ i }}</li>
</ul>
````

Вы можете вручную инициализировать экземпляр Vue.

*README.md*

```markdown
# Пример на Vue

<div>Привет {{ msg }}</div>

<script>
  new Vue({
    el: '#main',
    data: { msg: 'Vue' }
  })
</script>
```

!> В файле Markdown выполняется скрипт только в первом теге скрипта.

## Комбинация Vuep для создания площадки кода

[Vuep](https://github.com/QingWei-Li/vuep) — компонент для отрисовки компонентов Vue с редактором в режиме реального времени без перезагрузки страницы и с предварительным просмотром. Поддерживает спецификацию компонентов Vue и JSX.

*index.html*

```html
<!-- Подключить файл CSS -->
<link rel="stylesheet" href="//unpkg.com/vuep/dist/vuep.css">

<!-- Подключить файлы JavaScript -->
<script src="//unpkg.com/vue"></script>
<script src="//unpkg.com/vuep"></script>
<script src="//unpkg.com/docsify"></script>

<!-- Или использовать минифицированные версии файлов -->
<script src="//unpkg.com/vue/dist/vue.min.js"></script>
<script src="//unpkg.com/vuep/dist/vuep.min.js"></script>
<script src="//unpkg.com/docsify/lib/docsify.min.js"></script>
```

*README.md*
```markdown
# Vuep

<vuep template="#example"></vuep>

<script v-pre type="text/x-template" id="example">
  <template>
    <div>Привет, {{ name }}!</div>
  </template>

  <script>
    module.exports = {
      data: function () {
        return { name: 'Vue' }
      }
    }
  </script>
</script>
```

?> Пример опирается на [документацию Vuep](https://qingwei-li.github.io/vuep/).


