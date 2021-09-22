import keys from "../../config/keys";
import mongoose from "mongoose";
import JwtTokenService from "../services/jwt";

const User = mongoose.model("users");
const jwtService = new JwtTokenService();

module.exports = function (app) {
  app.get("/api/auth", function (req, res) {
    debugger;
    console.log("success");
    res.send({ hello: "World" });
  });

  app.post("/api/auth", async function (req, res) {
    const body = req.body;
    try {
      let user = await User.findOne({ facebookId: body.id });
      if (!user) {
        user = await new User({
          facebookId: body.id,
          name: body.name,
          email: body.email,
        }).save();
      }

      const jwtToken = jwtService.generateToken(user);
      res.send({ jwtToken: jwtToken, user: user });
    } catch (err) {
      res.status(404).send(err);
    }
  });
};
