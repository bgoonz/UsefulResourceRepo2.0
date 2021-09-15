# Создание страниц

Если вам нужно больше страниц, вы можете создать дополнительные файлы формата markdown в каталоге docsify. Если вы создаёте файл с именем `guide.md`, то он доступен через `/#/guide`.

Например, структура каталогов выглядит следующим образом:

```text
.
└── docs
    ├── README.md
    ├── guide.md
    └── zh-cn
        ├── README.md
        └── guide.md
```

Соответствующие маршруты

```text
docs/README.md        => http://domain.com
docs/guide.md         => http://domain.com/guide
docs/zh-cn/README.md  => http://domain.com/zh-cn/
docs/zh-cn/guide.md   => http://domain.com/zh-cn/guide
```

## Боковая панель

Для того, чтобы у вас отображалась боковая панель, вы можете создать файл `_sidebar.md` (см. раздел [Боковая панель в этой документации](https://github.com/QingWei-Li/docsify/blob/master/docs/ru-ru/_sidebar.md) для примера):

Во-первых, вам нужно установить `loadSidebar` в **true**. Подробности можно узнать в [соответствующей разделе конфигурации](ru-ru/configuration.md#loadsidebar).

```html
<!-- index.html -->

<script>
  window.$docsify = {
    loadSidebar: true
  }
</script>
<script src="//unpkg.com/docsify/lib/docsify.min.js"></script>
```

Создайте `_sidebar.md`:

```markdown
<!-- docs/_sidebar.md -->

* [Главая](/)
* [Руководство](guide.md)
```

Вам нужно создать `.nojekyll` в `./docs`, чтобы GitHub Pages предотвратил игнорировать файлы, начинающиеся с символа подчёркивания `_`.

Файл `_sidebar.md` загружается на каждом уровне каталога. Если у текущего каталога `_sidebar.md`, будет использоваться файл в родительском каталоге. Например, если текущий путь `/guide/quick-start`, файл `_sidebar.md` будет загружен из `/guide/_sidebar.md`.

Вы можете указать `alias` для того, чтобы избежать этого ненужного перехода использования родительского файла `_sidebar.md` .

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

## Оглавление

После создания `_sidebar.md` содержимое боковой панели автоматически генерируется на основе заголовков в markdown-файлах.

Пользовательская боковая панель также может автоматически генерировать оглавление, путём установки `subMaxLevel`, для получения подробностей смотрите описание [subMaxLevel в конфигурации](ru-ru/configuration.md#submaxlevel).

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

## Игнорирование подзаголовков

Когда `subMaxLevel` установлен, каждый заголовок автоматически добавляется к оглавлению по умолчанию. Если вы хотите игнорировать определённый заголовок, добавьте `{docsify-ignore}` к нему.

```markdown
# Начало работы

## Заголовок {docsify-ignore}

Этот заголовок не будет отображаться в оглавлении боковой панели.
```

Чтобы игнорировать все заголовки на определенной странице, вы можете использовать `{docsify-ignore-all}` в первом заголовке страницы.

```markdown
# Начало работы {docsify-ignore-all}

## Заголовок

Все заголовки не будут отображаться в таблице содержимого боковой панели.
```

Как `{docsify-ignore}`, так и `{docsify-ignore-all}` не будут отображаться на странице при их использовании.
