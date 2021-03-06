---
id: 5a90376038fddaf9a66b5d3c
title: Allineare tutti gli elementi orizzontalmente usando justify-items
challengeType: 0
videoUrl: "https://scrimba.com/p/pByETK/cJbpECn"
forumTopicId: 301120
dashedName: align-all-items-horizontally-using-justify-items
---

# --description--

A volte si desidera che tutti gli elementi nella griglia CSS condividano lo stesso allineamento. Puoi utilizzare le proprietà apprese in precedenza e allinearle individualmente, oppure puoi allinearle tutte in una volta orizzontalmente utilizzando `justify-items` sul tuo contenitore griglia. Questa proprietà può accettare tutti i valori che hai appreso nelle due sfide precedenti, con la differenza che sposterà **tutti** gli elementi nella nostra griglia all'allineamento desiderato.

# --instructions--

Usa questa proprietà per centrare tutti gli elementi orizzontalmente.

# --hints--

La classe `container` dovrebbe avere una proprietà `justify-items` con il valore di `center`.

```js
assert(
  code.match(
    /.container\s*?{[\s\S]*justify-items\s*?:\s*?center\s*?;[\s\S]*}/gi
  )
);
```

# --seed--

## --seed-contents--

```html
<style>
  .item1 {
    background: LightSkyBlue;
  }
  .item2 {
    background: LightSalmon;
  }
  .item3 {
    background: PaleTurquoise;
  }
  .item4 {
    background: LightPink;
  }
  .item5 {
    background: PaleGreen;
  }

  .container {
    font-size: 40px;
    min-height: 300px;
    width: 100%;
    background: LightGray;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    grid-gap: 10px;
    /* Only change code below this line */

    /* Only change code above this line */
  }
</style>

<div class="container">
  <div class="item1">1</div>
  <div class="item2">2</div>
  <div class="item3">3</div>
  <div class="item4">4</div>
  <div class="item5">5</div>
</div>
```

# --solutions--

```html
<style>
  .container {
    justify-items: center;
  }
</style>
```
