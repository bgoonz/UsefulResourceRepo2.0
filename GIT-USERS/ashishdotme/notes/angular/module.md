---
id: module
title: Module
---

NgModule helps us to organize our components, directives and services into logical unit. For example if we want to impoort a component in our component then we need to import everything that it is dependent on like services,
pipes etc. NgModules rescus us by importing everything and making it available throughout the components under one module.

When module provides a service and imported by a lazy loaded module, new instance of the service will be created by angular. Thats why we don't define services in shared modules. To make singleton service we make a core module and provide all the singleton service through that module. We only import that module only in app.module.

In RouterModule, there are two methods `forRoot` and `forChild` to stop creation of new instances of services. `forRoot` method is only called by app module and `forChild` is called by other feature modules.

## forRoot

It is used to create initial configuration for the angular app and register the base routes

## forChild

It is used to create "relative" routes
