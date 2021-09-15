---
id: linq
title: Linq
---

# Linq

LINQ (Language Integrated Query) is uniform query syntax in C# and VB.NET used to save and retrieve data from different sources.

## Types

It can be used in two ways i.e Query Syntax and Method Syntax.

### Query Syntax

```c#
var result = from s in stringList
            where s.Contains("Ashish")
            select s;
```

### Method Syntax

```c#
var result = stringList.Where(s => s.Contains("Ashish"));
```

## Query Operators

Standard Query Operators in LINQ are actually extension methods for the IEnumerable<T> and IQueryable<T> types.

### Query Syntax

```c#
var result = from s in stringList
            where s.Contains("Ashish")
            select s;
```
