import Router from "next/router";

export default (cxt, target) => {
  if (cxt.res) {
    // For SSR
    cxt.res.writeHead(303, { Location: target });
    cxt.res.end();
  } else {
    // on browser
    Router.replace(target);
  }
};
