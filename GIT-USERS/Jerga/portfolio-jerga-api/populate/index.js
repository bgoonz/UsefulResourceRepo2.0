const config = require("../config");
const mongoose = require("mongoose");
const fakeDB = require("./FakeDB");

mongoose.connect(
  config.DB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  async (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("> Starting populating DB...");
      await fakeDB.populate();
      await mongoose.connection.close();
      console.log("> DB has been populated...");
    }
  }
);
