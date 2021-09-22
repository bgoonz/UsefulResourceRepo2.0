---
id: observables
title: Observables
---

Observables are like promises which provide us with abstractions that help us deal with the
asynchronous nature of applications.

Observable is like a stream which allows to pass zero or more events where the callback is called
for each event.

## Difference between Promise and Observable

- Promise are representation of 1 future value
- Observables are representation for infinite amount of values
- Promise fetches the value immediately after creation whereas observables will only start producing values when you subscribe to them.

## Scan()

Scan will show all values emitted on source observable

## Reduce()

Reduce will show only the final value emitted on source observable
