
find duplicate files in your filesystem

# Install

```sh
npm i -g @exodus/find-duplicates
```

# Usage

```sh
# run in your project root
find-duplicates > duplicates.json

# the above is the equivalent of:
find-duplicates --glob "node_modules/**/.js" > duplicates.json

# you can specify multiple globs:
find-duplicates --glob "node_modules/**/.js" --glob "node_modules/**/*.json" > duplicates.json
```
