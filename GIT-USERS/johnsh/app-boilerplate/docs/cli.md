### CLI

> CLI for persisting and getting values that can be used across projects

**Set**

Set a value:

```sh
$ app --set foo=bar
#=> {foo: 'bar'}

$ app --set baz
#=> {baz: true}
```

**Get**

Get a value:

```sh
$ app --get foo
#=> bar

$ app --get baz
#=> true
```