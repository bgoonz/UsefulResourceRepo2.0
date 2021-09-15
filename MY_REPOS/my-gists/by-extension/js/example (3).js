f(a, async(x, y) => await [x, y], b);
f(a, async promise => await promise)

class A {
  a() {
    this.button.on("click", async () => {
        let data = await this.getDataAsync();
        this.showData(data);
    });
  }
}
