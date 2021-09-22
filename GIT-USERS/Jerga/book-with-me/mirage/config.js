import Response from "ember-cli-mirage/response";
import bcrypt from "npm:bcryptjs";
import jwt from "npm:jwt-simple";
import moment from "moment";
import { underscore } from "@ember/string";
const SECRET = "askdasdnasdn";

export default function () {
  this.namespace = "/api/v1";

  this.getMRoute = (path, middleware, callback) => {
    this.get(path, function (schema, request) {
      const err = middleware(request);
      if (err) return err;

      return callback(schema, request);
    });
  };

  this.postMRoute = (path, middleware, callback) => {
    this.post(path, function (schema, request) {
      const err = middleware(request);
      if (err) return err;

      return callback.call(this, schema, request);
    });
  };

  this.getMRoute("/secret", authMiddleware, () => {});

  this.getMRoute("/bookings", authMiddleware, function (schema, request) {
    const user = parseJwt(request.requestHeaders["Authorization"]);
    return schema.bookings.where({ userId: user.userId });
  });

  this.postMRoute("/rentals", authMiddleware, function (schema) {
    const attrs = underscorize(this.normalizedRequestAttrs());
    const rental = schema.rentals.new(attrs);

    if (
      !rental.attrs.city ||
      !rental.attrs.title ||
      !rental.attrs.daily_rate ||
      !rental.attrs.image
    ) {
      return invalidResponse(
        422,
        "Data missing",
        "Title, City, Daily rate, Image are required fields"
      );
    }

    rental.save();
    return this.serialize(rental);
  });

  this.postMRoute("/bookings", authMiddleware, function (schema) {
    const attrs = underscorize(this.normalizedRequestAttrs());
    const booking = schema.bookings.new(attrs);

    if (
      !booking.attrs.start_at ||
      !booking.attrs.end_at ||
      !booking.attrs.userId ||
      !booking.attrs.rentalId
    ) {
      return invalidResponse(
        422,
        "Data missing",
        "Start at or End at dates are missing "
      );
    }

    const currentRental = schema.rentals.find(booking.rentalId);

    if (currentRental.userId == booking.userId) {
      return invalidResponse(
        422,
        "Invalid user",
        "You cannot place booking on your own rental."
      );
    }

    if (isValidBooking(booking, currentRental)) {
      booking.save();
      return this.serialize(booking);
    } else {
      return invalidResponse(
        422,
        "Invalid booking",
        "Choosen dates are already taken."
      );
    }
  });

  function isValidBooking(proposedBooking, rental) {
    let isValid = true;

    if (rental.bookings && rental.bookings.length) {
      isValid = rental.bookings.models.every((booking) => {
        const proposedStart = moment(proposedBooking.attrs.start_at);
        const proposedEnd = moment(proposedBooking.attrs.end_at);
        const actualStart = moment(booking.attrs.start_at);
        const actualEnd = moment(booking.attrs.end_at);

        return (
          (actualStart < proposedStart && actualEnd < proposedStart) ||
          (proposedEnd < actualEnd && proposedEnd < actualStart)
        );
      });
    }

    return isValid;
  }

  this.get("/rentals", (schema, request) => {
    let rentals = [];
    const city = request.queryParams["filter[city]"];
    const customLookup = request.queryParams["customLookup"];

    if (customLookup && request.requestHeaders["Authorization"]) {
      const user = parseJwt(request.requestHeaders["Authorization"]);

      rentals = schema.rentals.where({ userId: user.userId });
    } else if (city) {
      rentals = schema.rentals.where({ city });
    } else {
      rentals = schema.rentals.all();
    }

    return rentals.length > 0
      ? rentals
      : invalidResponse(
          422,
          "No rentals found",
          "There are no rentals for city " + city
        );
  });

  this.get("/rentals/:id", (schema, request) => {
    return schema.rentals.find(request.params.id);
  });

  this.post("/auth", function (schema, request) {
    const { email, password } = JSON.parse(request.requestBody).user;
    const foundUser = schema.db.users.where({ email })[0];
    if (foundUser) {
      const isUserPassword = bcrypt.compareSync(password, foundUser.password);

      if (isUserPassword) {
        return {
          token: jwt.encode(
            {
              userId: foundUser.id,
              email: foundUser.email,
              username: foundUser.username,
            },
            SECRET
          ),
          email: foundUser.email,
        };
      }
    }

    return invalidResponse(422, "Email not found", "Wrong email or password");
  });

  this.post("/users", function (schema, request) {
    return new Promise((resolve) => {
      const { username, password, password_confirmation, email } = JSON.parse(
        request.requestBody
      ).user;

      if (password !== password_confirmation) {
        return resolve(
          invalidResponse(
            422,
            "password is not same",
            "Password must be same as confirmation"
          )
        );
      }
      const existingUser = schema.db.users.where({ email })[0];

      if (existingUser) {
        return resolve(
          invalidResponse(
            422,
            "User already exists",
            "User with this email already exists"
          )
        );
      }

      const salt = bcrypt.genSaltSync(10);
      const hashedPsw = bcrypt.hashSync(password, salt);

      const user = schema.users.create({
        username,
        email,
        password: hashedPsw,
      });

      return resolve(this.serialize(user));
    });
  });
}

function invalidResponse(status, title, detail) {
  return new Response(
    status,
    { some: "header", "Content-Type": "application/json" },
    {
      errors: [
        {
          title,
          detail,
        },
      ],
    }
  );
}

function authMiddleware(request) {
  const token = request.requestHeaders.Authorization || "";
  if (token) {
    const user = parseJwt(token.split(" ")[1]);
    if (user.email) return;
  }
  return invalidResponse(422, "Not authorized", "You are not authorized!");
}

function parseJwt(token) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64));
}

function underscorize(attrs) {
  const payload = {};

  Object.keys(attrs).forEach((key) => {
    if (key !== "id" && key.toLowerCase().indexOf("id") <= 0) {
      payload[underscore(key)] = attrs[key];
      delete attrs[key];
    } else {
      payload[key] = attrs[key];
    }
  });

  return payload;
}
