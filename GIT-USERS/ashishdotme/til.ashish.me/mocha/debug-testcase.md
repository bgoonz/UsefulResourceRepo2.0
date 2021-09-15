# Debugging testcase

```javascript
expect(_wrapper.find(Modal).length).to.equal(
  1,
  `_wrapper.find(Modal) in wrapper=${_wrapper.debug()}`
);
```
