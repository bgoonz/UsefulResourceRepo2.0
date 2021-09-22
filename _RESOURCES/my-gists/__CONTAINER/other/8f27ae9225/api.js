const geoip = require("geoip-lite");
// Run 'npm run-script updatedb' to update the data file
const request = require("request");

exports.getMeta = function (req, res) {
  if (process.env.NODE_ENV === "production") {
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    const geo = geoip.lookup(ip);
    return res.json(geo);
  } else {
    request("https://api.ipify.org?format=json", function (error, response) {
      if (!error && response.statusCode == 200) {
        const ip = JSON.parse(response.body).ip;
        const options = {
          url: `https://apility-io-ip-geolocation-v1.p.rapidapi.com/${ip}`,
          headers: {
            "x-rapidapi-host": "apility-io-ip-geolocation-v1.p.rapidapi.com",
            "x-rapidapi-key":
              "qTLAiQ511BmshrQ2LgMSNXdRzpW9p154DqHjsnDHnGr90V6nPW",
            "content-type": "application/json; charset=utf-8",
          },
        };
        request(options, function (_, geoRes) {
          const geo = JSON.parse(geoRes.body);
          return res.json(geo.ip);
        });
      } else {
        return res.send(422).send({ errors: "Cannot get location from IP" });
      }
    });
  }
};
