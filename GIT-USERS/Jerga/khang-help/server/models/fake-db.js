const Rental = require("./rental");
const mongoose = require("mongoose");
const User = require("./user");
const Booking = require("../models/booking");

const fakeDbData = require("../../server/models/data.json");
class Fakedb {
  constructor() {
    this.rentals = fakeDbData.rentals;
    this.users = fakeDbData.users;
  }

  async cleanDb() {
    await User.remove({});
    //  we will wait to remove first as synchronously before we can push it back
    await Rental.remove({});
    await Booking.remove({});
  }

  pushDataToDb() {
    const user = new User(this.users[0]);
    const user2 = new User(this.users[1]);

    this.rentals.forEach((rental) => {
      const newRental = new Rental(rental);
      newRental.user = user;

      user.rentals.push(newRental);
      newRental.save();
    });
    user.save();
    user2.save();
  }

  async seedDb() {
    await this.cleanDb();
    this.pushDataToDb();
  }
}

module.exports = Fakedb;
