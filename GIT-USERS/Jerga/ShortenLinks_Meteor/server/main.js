import { Meteor } from "meteor/meteor";
import { Links } from "../import/collections/links";
import { WebApp } from "meteor/webapp";
import ConnectRoute from "connect-route";

Meteor.startup(() => {
  Meteor.publish("links", function () {
    return Links.find({});
  });
});

function onRoute(req, res, next) {
  var validLink = Links.findOne({ token: req.params.token });

  if (validLink) {
    Links.update(validLink, { $inc: { click: 1 } });
    res.writeHead(307, { location: validLink.url });
    res.end();
  } else {
    next();
  }
}

const middleware = ConnectRoute(function (router) {
  router.get("/:token", onRoute);
});

WebApp.connectHandlers.use(middleware);
