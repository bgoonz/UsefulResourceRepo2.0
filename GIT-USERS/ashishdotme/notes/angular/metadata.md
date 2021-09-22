---
id: metadata
title: Metadata/Decorators
---

Metadata is also called decorator which is used to decorate a class so that it can configure the expected behavior of the class. There are four types of decorators.

## Class decorators (@NgModule, @Component)

```tsx
import { NgModule, Component } from "@angular/core";

@Component({
  selector: "my-component",
  template: "<div>Class decorator</div>",
})
export class MyComponent {
  constructor() {
    console.log("Hey I am a component!");
  }
}

@NgModule({
  imports: [],
  declarations: [],
})
export class MyModule {
  constructor() {
    console.log("Hey I am a module!");
  }
}
```

## Property decorators (@Input, @Output)

Used for properties inside classes

```tsx
import { Component, Input } from "@angular/core";

@Component({
  selector: "my-component",
  template: "<div>Property decorator</div>",
})
export class MyComponent {
  @Input()
  title: string;
}
```

## Method decorators (@HostListener)

Used for methods inside classes

```tsx
import { Component, HostListener } from "@angular/core";

@Component({
  selector: "my-component",
  template: "<div>Method decorator</div>",
})
export class MyComponent {
  @HostListener("click", ["$event"])
  onHostClick(event: Event) {
    // clicked, `event` available
  }
}
```

## Parameter decorators (@Inject)

Used for parameters inside class constructors

```tsx
import { Component, Inject } from "@angular/core";
import { MyService } from "./my-service";

@Component({
  selector: "my-component",
  template: "<div>Parameter decorator</div>",
})
export class MyComponent {
  constructor(@Inject(MyService) myService) {
    console.log(myService); // MyService
  }
}
```
