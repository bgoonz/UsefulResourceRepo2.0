# atom-underline-trailing-whitespace

An Atom package for providing a visual cue for trailing whitespace with a subtle underline. This
package also ignores the current cursor line.

![underline-trailing-whitespace](https://cloud.githubusercontent.com/assets/1424573/5618239/3a1825c0-94d4-11e4-95d5-85175d5191dd.png)

## Installation

```
apm install underline-trailing-whitespace
```

## Customization

You can change the underline color with the following:

```less
atom-text-editor,
atom-text-editor::shadow  {

  .trailing-whitespace {
    border-bottom-color: @my-new-color;
  }
}
```

## License

MIT

## Contributing

1. Fork it
4. Create your feature branch (`git checkout -b my-new-feature`)
5. Commit your changes (`git commit -am 'Add some feature'`)
6. Push to the branch (`git push origin my-new-feature`)
7. Create new Pull Request

Crafted with <3 by [John Otander](http://johnotander.com)([@4lpine](https://twitter.com/4lpine)).
