## Adapter Pattern

Adapter Pattern is an abstraction for nasty or 3rd party code, you need in your main clean codebase.

It is basically a wrapper around a particular class or object, which provides a different API and utilizes the object’s original one in the background.

### Use Cases

- It is used to create a bridge between two different interfaces
- Removes incompabilities between the interfaces
- Prevents or minimizes refactoring client application code
- Lets you build packages with an opinionated API, with custom adapters for maxmium compability

```javascript
// index.js
import { v4 as uuidv4 } from "uuuid";

console.log(uuidv4()); // without adapter pattern
```

```javascript
// uuid.js
import { v4 as uuidv4 } from "uuuid";

class uuid {
  generate() {
    return uuidv4();
  }
}

export default new uuid();
```

```javascript
// App.js
import uuid from './uuid

console.log(uuid.generate())
```
