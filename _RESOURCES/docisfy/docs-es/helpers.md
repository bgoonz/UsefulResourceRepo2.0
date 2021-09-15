# Doc helper

!> Este archivo aún no está traducido al español, estamos traduciendo... si gustas, puedes ayudar.

docsify extends Markdown syntax to make your documents more readable.

## important content

Important content like:

```markdown
!> **Time** is money, my friend!
```

is rendered as:

!> **Time** is money, my friend!

## General tips

General tips like:

```markdown
?> _TODO_ unit test
```

are rendered as:

?> _TODO_ unit test

## Ignore to compile link

Some time we will put some other relative path to the link, you have to need to tell docsify you don't need to compile this link. For example

```md
[link](/es//demo/)
```

It will be compiled to `<a href="/#/demo/">link</a>` and will be loaded `/demo/README.md`. Maybe you want to jump to `/demo/index.html`.

Now you can do that

```md
[link](/es//demo/ ':ignore')
```

You will get `<a href="/demo/">link</a>`html. Do not worry, you can still set title for link.

```md
[link](/es//demo/ ':ignore title')

<a href="/demo/" title="title">link</a>
```

## Set target attribute for link

```md
[link](/es//demo ':target=_blank')
[link](/es//demo2 ':target=_self')
```

## Disable link

```md
[link](/es//demo ':disabled')
```

## Github Task Lists

```md
* [ ] foo
* bar
* [x] baz
* [] bam <~ not working
  * [ ] bim
  * [ ] lim
```

* [ ] foo
* bar
* [x] baz
* [] bam <~ not working
  * [ ] bim
  * [ ] lim
