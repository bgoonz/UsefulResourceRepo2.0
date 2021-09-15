import { helper } from "@ember/component/helper";

export function addition([arg1, arg2]) {
  return parseInt(arg1, 10) + parseInt(arg2, 10);
}

export default helper(addition);
