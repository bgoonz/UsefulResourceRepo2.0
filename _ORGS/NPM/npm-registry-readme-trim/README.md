# npm-registry-readme-trim

Trim the `readme` fields on npm registry document objects.

This will pull a single version's readme to the top-level of the
document, and also reduce it in length to a max of 64kb.

Mutates the document in place, and returns `true` if it did anything.

## USAGE

```javascript
var trim = require('npm-registry-readme-trim')
var changed = trim(document)
if (changed) {
  // something was changed, probably have to PUT the doc back or whatever
} else {
  // everything was already in the right places, nothing to do
}
```

Or on the CLI, where it's JSON in, JSON out.

```bash
cat doc.json | npm-registry-readme-trim > trimmed.json
```
