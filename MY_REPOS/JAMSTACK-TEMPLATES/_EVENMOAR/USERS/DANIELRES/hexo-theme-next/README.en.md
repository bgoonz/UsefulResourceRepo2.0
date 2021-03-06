# NexT

> NexT is a high quality elegant [Hexo](http://hexo.io) theme. It is crafted from scratch, with love.

[Live Preview](http://notes.iissnan.com)

## Screenshots

- Desktop
  ![Desktop Preview](http://iissnan.com/nexus/next/desktop-preview.png)

- Sidebar

![Desktop Sidebar Preview](http://iissnan.com/nexus/next/desktop-sidebar-preview.png)

- Sidebar (Post details page)

![Desktop Sidebar Preview](http://iissnan.com/nexus/next/desktop-sidebar-toc.png)

- Mobile

![Mobile Preview](http://iissnan.com/nexus/next/mobile.png)

## Installation

1.  Get it from GitHub

        $ git clone https://github.com/iissnan/hexo-theme-next themes/next

2.  Add it to `_config.yml`

        theme: next

## Update

```shell
cd theme/next
git pull
```

## Features

### English/Simplified Chinese language support.

> Default language is English.
> Set `language` field as following in site `_config.yml` to change to Chinese.

```yml
language: zh-Hans
```

### DuoShuo comment support.

> Add `duoshuo` field to site `_config.yml`. For instance

```yml
duoshuo:
  enable: true
  shortname: duoshuo-shortname
```

### Tags page.

> Add a tags page contains all tags in your site.

- Create a page named `tags`

        hexo new page "tags"

- Edit tags page, set page type to `tags`.

        title: All tags
        date: 2014-12-22 12:39:04
        type: "tags"

- Add `tags` to theme `_config.yml`:

        menu:
          home: /
          archives: /archives
          tags: /tags

### Feed link.

> Show a feed link.

Set `rss` field in theme's `_config.yml`, as the following value:

1. `rss: false` will totally disable feed link.
2. `rss: ` use sites' feed link. This is the default option.

   Follow the installation instruction in the plugin's README. After the configuration is done for this plugin, the feed link is ready too.

3. `rss: http://your-feed-url` set specific feed link.

### Up to 5 code highlight themes built-in.

NexT uses [Tomorrow Theme](https://github.com/chriskempson/tomorrow-theme) with 5 themes for you to choose from.
Next use `normal` by default. Have a preview about `normal` and `night`:

![Tomorrow Normal Preview](http://iissnan.com/nexus/next/tomorrow-normal.png)
![Tomorrow Night Preview](http://iissnan.com/nexus/next/tomorrow-night.png)

Head over to [Tomorrow Theme](https://github.com/chriskempson/tomorrow-theme) for more details.

## Configuration

NexT comes with few configurations.

```yml
# Menu configuration.
menu:
  home: /
  archives: /archives

# Favicon
favicon: /favicon.ico

# Code highlight theme
# available: normal | night | night eighties | night blue | night bright
highlight_theme: normal

# Fancybox for image gallery
fancybox: true

# Specify the date when the site was setup
since: 2013
```

## Browser support

![Browser support](http://iissnan.com/nexus/next/browser-support.png)

## Contributing

Contribution is welcome, feel free to open an issue and fork. Waiting for your pull request.

[![hexo-image]][hexo-url]
[![bower-image]][bower-url]
[![jquery-image]][jquery-url]

[hexo-image]: http://img.shields.io/badge/Hexo-2.4+-2BAF2B.svg?style=flat-square
[hexo-url]: http://hexo.io
[bower-image]: http://img.shields.io/badge/Bower-*-2BAF2B.svg?style=flat-square
[bower-url]: http://bower.io
[jquery-image]: https://img.shields.io/badge/jquery-1.9-blue.svg?style=flat-square
[jquery-url]: http://jquery.com/
