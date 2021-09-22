---
id: lifecycle
title: Lifecycle
---

![lifecycle](https://github.com/sudheerj/angular-interview-questions/raw/master/images/lifecycle.png)

1. **ngOnChanges**: When the value of a data bound property changes, then this method is called.
2. **ngOnInit**: This is called whenever the initialization of the directive/component after Angular first displays the data-bound properties happens.
3. **ngDoCheck**: This is for the detection and to act on changes that Angular can't or won't detect on its own.
4. **ngAfterContentInit**: This is called in response after Angular projects external content into the component's view.
5. **ngAfterContentChecked**: This is called in response after Angular checks the content projected into the component.
6. **ngAfterViewInit**: This is called in response after Angular initializes the component's views and child views.
7. **ngAfterViewChecked**: This is called in response after Angular checks the component's views and child views.
8. **ngOnDestroy**: This is the cleanup phase just before Angular destroys the directive/component.
