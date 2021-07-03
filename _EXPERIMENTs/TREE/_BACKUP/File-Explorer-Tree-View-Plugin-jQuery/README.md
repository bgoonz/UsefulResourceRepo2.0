# Explr.js

Explorer-like tree jQuery plugin

## Usage

```html
<!-- include the required CSS -->
<link rel="stylesheet" type="text/css" href="jquery.explr.css" />

<!-- include any version of jQuery before including plugin -->
<script type="text/javascript" src="jquery-1.7.1.min.js"></script>

<!-- include the plugin -->
<script type="text/javascript" src="jquery.explr-1.1.min.js"></script>

<ul class="explr">
  <li class="icon-home">
    <a href="#">1st item 1st level</a>
    <ul>
      <li>
        <a href="#">1st item 2nd level</a>
      </li>
    </ul>
  </li>
  <li>
    <a href="#">2nd item 1st level</a>
  </li>
</ul>

<script type="text/javascript">
  $(".explr").explr();
</script>
```

### Options

| option            | type                | default                      | description                                                            |
| ----------------- | ------------------- | ---------------------------- | ---------------------------------------------------------------------- |
| `ajaxContainerId` | `string`            | `"explr-content"`            | id element of AJAX container                                           |
| `ajaxLoadingText` | `string`            | `"<p>loading data..</p>"`    | HTML to be displayed when loading AJAX request                         |
| `ajaxOptions`     | `object`            | `{}`                         | See `$.ajax()` API reference                                           |
| `animDuration`    | `string`            | `"fast"`                     | Duration of toggle animation, set 0 to disable                         |
| `folderTooltip`   | `string`            | `"click to expand/collapse"` | Tooltip to be displayed when mouse hover the folders                   |
| `rememberState`   | `bool`              | `true`                       | Store tree state in cookie                                             |
| `startCollapsed`  | `bool`              | `true`                       | Collapsed/expanded at start                                            |
| `treeHeight`      | `string` / `number` | `"auto"`                     | Height of tree in number (of pixels) or 'auto' to adjust automatically |
| `treeWidth`       | `string` / `number` | `"auto"`                     | Width of tree in number (of pixels) or 'auto' to adjust automatically  |

Example:

```js
$(".explr").explr({
  startCollapsed: true,
  treeHeight: 200,
  treeWidth: 400,
});
```

To load AJAX content when clicking node, add `rel="explr-ajax"` attribute to the link elements like this:

```html
<div class="tree-wrapper">
  <ul id="id">
    <li>
      <a href="#">External content loaded with AJAX</a>
      <ul>
        <li>
          <a href="test.html" rel="explr-ajax">load test.html</a>
        </li>
        <li>
          <a href="test.php?getdata=hello" rel="explr-ajax"
            >load test.php along with a GET data</a
          >
        </li>
      </ul>
    </li>
    <li>
      <a href="#">Internal content</a>
      <ul>
        <li>
          <a href="#top">go to top of page</a>
        </li>
        <li>
          <a href="#bottom">go to bottom of page</a>
        </li>
      </ul>
    </li>
  </ul>
</div>

<div id="ajax-content-wrapper"></div>

<script type="text/javascript">
  $(".tree-wrapper").explr({
    ajaxContainerId: "ajax-content-wrapper",
  });
</script>
```

### Icons

| ![](css/img/pc.de/address.png) `icon-address`       | ![](css/img/pc.de/archives.png) `icon-archives`     | ![](css/img/pc.de/bestseller.png) `icon-badge`    | ![](css/img/pc.de/bank.png) `icon-bank`         | ![](css/img/pc.de/basket.png) `icon-basket`             |
| --------------------------------------------------- | --------------------------------------------------- | ------------------------------------------------- | ----------------------------------------------- | ------------------------------------------------------- |
| ![](css/img/pc.de/order.png) `icon-board`           | ![](css/img/pc.de/order-1.png) `icon-board2`        | ![](css/img/pc.de/library.png) `icon-book`        | ![](css/img/pc.de/bookmark.png) `icon-bookmark` | ![](css/img/pc.de/business-contact.png) `icon-business` |
| ![](css/img/pc.de/calendar.png) `icon-calendar`     | ![](css/img/pc.de/credit-card.png) `icon-card`      | ![](css/img/pc.de/my-account.png) `icon-card2`    | ![](css/img/pc.de/link.png) `icon-chain`        | ![](css/img/pc.de/statistics.png) `icon-chart`          |
| ![](css/img/pc.de/lock.png) `icon-lock`             | ![](css/img/pc.de/check.png) `icon-check`           | ![](css/img/pc.de/full-time.png) `icon-clock`     | ![](css/img/pc.de/comment.png) `icon-comment`   | ![](css/img/pc.de/config.png) `icon-config`             |
| ![](css/img/pc.de/customers.png) `icon-customers`   | ![](css/img/pc.de/cv.png) `icon-cv`                 | ![](css/img/pc.de/milestone.png) `icon-direction` | ![](css/img/pc.de/flag.png) `icon-flag`         | ![](css/img/pc.de/folder.png) `icon-folder`             |
| ![](css/img/pc.de/finished-work.png) `icon-folder2` | ![](css/img/pc.de/upcoming-work.png) `icon-folder3` | ![](css/img/pc.de/freelance.png) `icon-hand`      | ![](css/img/pc.de/heart.png) `icon-heart`       | ![](css/img/pc.de/consulting.png) `icon-help`           |
| ![](css/img/pc.de/home.png) `icon-home`             | ![](css/img/pc.de/lightbulb.png) `icon-lamp`        | ![](css/img/pc.de/sign-out.png) `icon-left`       | ![](css/img/pc.de/login.png) `icon-left2`       | ![](css/img/pc.de/contact.png) `icon-mail`              |
| ![](css/img/pc.de/email.png) `icon-mail2`           | ![](css/img/pc.de/drawings.png) `icon-palette`      | ![](css/img/pc.de/edit.png) `icon-pencil`         | ![](css/img/pc.de/pencil.png) `icon-pencil2`    | ![](css/img/pc.de/phone.png) `icon-phone`               |
| ![](css/img/pc.de/photography.png) `icon-photo`     | ![](css/img/pc.de/print.png) `icon-print`           | ![](css/img/pc.de/project.png) `icon-project`     | ![](css/img/pc.de/refresh.png) `icon-refresh`   | ![](css/img/pc.de/sign-in.png) `icon-right`             |
| ![](css/img/pc.de/logout.png) `icon-right2`         | ![](css/img/pc.de/star.png) `icon-star`             | ![](css/img/pc.de/tag.png) `icon-tag`             | ![](css/img/pc.de/attibutes.png) `icon-text`    | ![](css/img/pc.de/issue.png) `icon-text2`               |
| ![](css/img/pc.de/future-projects.png) `icon-text3` | ![](css/img/pc.de/old-versions.png) `icon-text4`    | ![](css/img/pc.de/user.png) `icon-user`           | ![](css/img/pc.de/world.png) `icon-world`       | ![](css/img/pc.de/zoom.png) `icon-zoom`                 |

To define another custom icon class name you have to edit the CSS file

```css
.explr-tree .icon-mycustomicon > li,
.explr-tree li.icon-mycustomicon {
  background-image: url("img/mycustomicon.png");
}
```

Then you can use it like this:

```html
<li class="icon-mycustomicon"></li>
```

## Credits

- Stuttgart icon set from PC.DE

## License

Dual licensed under GPLv2 & MIT

Copyright © 2010-2011 Faisal Salman <<f@faisalman.com>>

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the
Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
