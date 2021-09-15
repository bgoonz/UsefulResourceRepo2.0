const express = require("express");
const mongoose = require("mongoose");

const app = express();

const config = require("./config/index");
const Rental = require("./models/rental");

const FakeDb = require("./models/fake-db");

const rentalRoutes = require("../server/routes/rentals"),
  userRoutes = require("../server/routes/users");
bookingRoute = require("../server/routes/bookings");
imageUploadRoute = require("../server/routes/image-upload");
paymentRoute = require("../server/routes/payment");
reviewRoute = require("./routes/reviews");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(cors());
mongoose
  .connect(config.DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => {
    if (process.env.NODE_ENV === "production") {
      const fakeDb = new FakeDb();
      // fakeDb.seedDb();
      console.log("connected to the prod db");
    }
    console.log("connected to dev db");
  })
  .catch((err) => console.log(err));

app.use(bodyParser.json());

app.use("/api/rentals", rentalRoutes);
app.use("/api/users", userRoutes);
app.use("/api/bookings", bookingRoute);
app.use("/api", imageUploadRoute);
app.use("/api/payment", paymentRoute);
app.use("/api/reviews", reviewRoute);

if (process.env.NODE_ENV === "production") {
  const appPath = path.join(__dirname, "../client/dist/", "rental");

  // we want to use all the express static
  app.use(express.static(appPath));

  // this will catch every request
  app.get("*", (req, res) => {
    res.sendfile(path.resolve(appPath, "index.html"));
  });
  //
}

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log("I am running");
});
