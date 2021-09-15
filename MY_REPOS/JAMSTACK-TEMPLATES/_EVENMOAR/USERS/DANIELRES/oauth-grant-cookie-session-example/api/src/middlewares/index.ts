import config from "./../config";
import cookieSession from "./cookieSession";
import ensureAuthenticated from "./ensureAuthenticated";
import grant from "./grant";
import handleOAuthResponse from "./handleOAuthResponse";
import unlessRouteIn from "./utils/unlessRouteIn";

const { PUBLIC_ROUTES } = config;

export default [
  cookieSession,
  grant,
  handleOAuthResponse,
  unlessRouteIn(PUBLIC_ROUTES)(ensureAuthenticated),
];
