import { helper } from "@ember/component/helper";

export function rentalType([arg]) {
  return arg ? "shared" : "whole";
}

export default helper(rentalType);
