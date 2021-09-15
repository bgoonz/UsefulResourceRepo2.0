f(a, async function (x, y) {
  return await [x, y];
}, b);
f(a, async function (promise) {
  return await promise;
});

class A {
  a() {
    var _this = this;

    this.button.on("click", async function () {
      let data = await _this.getDataAsync();
      _this.showData(data);
    });
  }
}