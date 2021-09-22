---
id: routing
title: Routing
---

To implement routing in Angular 4, we import RouterModule from `@angular/router`. Router module takes an input
as array. Array is made up of objects containing the path and the component.

## Example of Router Module

```tsx
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { AppComponent } from "./app.component";
import { NewCmpComponent } from "./new-cmp/new-cmp.component";
import { ChangeTextDirective } from "./change-text.directive";
import { SqrtPipe } from "./app.sqrt";
@NgModule({
  declarations: [SqrtPipe, AppComponent, NewCmpComponent, ChangeTextDirective],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {
        path: "new-cmp",
        component: NewCmpComponent,
      },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```
