class Phone {
  constructor(
    model = "Generic",
    processor = "Generic",
    ram = "2 gb",
    serialNumber
  ) {
    this.serialNumber = serialNumber;
    this.configuration = {
      model,
      processor,
      ram,
    };
  }

  dial(num) {
    console.log(`Now dialing ${num}...`);
  }

  displayConfig() {
    console.log(this.configuration);
  }
}

module.exports = Phone;
