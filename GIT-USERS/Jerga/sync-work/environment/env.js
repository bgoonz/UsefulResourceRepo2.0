import { keys as devKeys } from "./env.dev";
import { keys as prodKeys } from "./env.prod";

export default (() => {
  if (process.env.NODE_ENV === "development") {
    return devKeys;
  } else if (process.env.NODE_ENV === "production") {
    return prodKeys;
  }
})();
