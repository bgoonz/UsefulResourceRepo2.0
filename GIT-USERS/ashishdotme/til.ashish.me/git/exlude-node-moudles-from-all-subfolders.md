# Exclude node_modules from all sub folders

```javascript
**/node_modules
```

Two consecutive asterisks \*\* in patterns matched against full pathname may have special meaning:

A leading ** followed by a slash means match in all directories. For example, **/foo matches file or directory foo anywhere, the same as pattern foo. \*\*/foo/bar matches file or directory bar anywhere that is directly under directory foo.

A trailing /** matches everything inside. For example, abc/** matches all files inside directory abc, relative to the location of the .gitignore file, with infinite depth.

A slash followed by two consecutive asterisks then a slash matches zero or more directories. For example, a/\*\*/b matches a/b, a/x/b, a/x/y/b and so on.

Other consecutive asterisks are considered invalid.
