import keys from "../../config/keys";
import jwt from "jsonwebtoken";

class JwtTokenService {
  constructor() {}

  generateToken(user) {
    //1. Dont use password and other sensitive fields
    //2. Use fields that are useful in other parts of the
    //app/collections/models
    const u = {
      name: user.name,
      email: user.email,
      facebookId: user.facebookId,
    };

    const token = jwt.sign(u, keys.JWT_SECRET, {
      expiresIn: "1h", // expires in 24 hours
    });

    return token;
  }
}

module.exports = JwtTokenService;
