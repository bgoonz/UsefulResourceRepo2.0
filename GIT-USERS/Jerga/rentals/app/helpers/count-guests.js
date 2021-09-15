import { helper } from "@ember/component/helper";

export function countGuests(params /*, hash*/) {
  return params[0] * params[1] + 2;
}

export default helper(countGuests);
