import { mount, route } from "navi";
import * as React from "react";
import Profile from "./scenes/Profile";
import Space from "./scenes/Space";

const routes = mount({
  "/": route({ view: <div>HOME</div> }),
  "/profile": route({ view: <Profile /> }),
  "/:shortId": route(req => ({
    view: <Space shortId={req.params.shortId} />
  }))
});

export default routes;
