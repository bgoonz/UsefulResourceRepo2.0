---
title: Assign a list type value to the Markdown front matter variable
categories:
  - programming
tags:
  - Markdown
  - YAML
---

When we need to assign a _**list type**_ value to the front matter block variable of a Markdown file we can use the _array like_ syntax ...

```
---
categories: [cat1, cat2, cat3]
---
```

... or the _YAML sequence_ syntax.

```
---
categories:
  - cat1
  - cat2
  - cat3
---
```

I had been using the first one, but the second is much more convenient. More about **YAML** syntax on [Front-end web development with Greg](https://dev.greglobinski.com/)
