class Car {
  String brand;
  String model;
  int year;

  Car(this.brand, this.model, this.year);

  Car.named({
    brand, model, year
  }) {
    this.brand = brand;
    this.model = model;
    this.year = year;
  }

  void honk() {
    print('$brand is honking!');
  }

  int transformYearToMinutes() {
    return year * 365 * 24 * 60 * 60;
  }
}
