---
id: pipes
title: Pipes
---

Pipes in Angular are used to transform data. It takes integers, strings, arrays, and date as input separated with `|` to be converted in the format as required and display the same in the browser.

Below are the built in pipes provied by Angular

1. Lowercasepipe
1. Uppercasepipe
1. Datepipe
1. Currencypipe
1. Jsonpipe
1. Percentpipe
1. Decimalpipe
1. Slicepipe

## Custom pipe

To create a custom pipe, we have to import Pipe and Pipe transform from Angular/Core.
We can use our custom pipe by importing it in app module.

```tsx
import { Pipe, PipeTransform } from "@angular/core";
@Pipe({
  name: "sqrt",
})
export class SqrtPipe implements PipeTransform {
  transform(val: number): number {
    return Math.sqrt(val);
  }
}
```
