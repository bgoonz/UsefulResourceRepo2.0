---
id: data-binding
title: Data Binding
---

Data binding defines the communication between a component and DOM. There are three types

1. From the component to the DOM  
   `<li>Age: {{user.age}}</li>`
2. From the DOM to the Component  
   `<button (click)="register()"></button`
3. Two-way binding(It allows to have the data flow both ways. Both the DOM and component property are in sync)  
   `<input type="name" [(ngModel)]="user.name">`
