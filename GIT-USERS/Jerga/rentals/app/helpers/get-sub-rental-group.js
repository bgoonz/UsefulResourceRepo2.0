import { helper } from "@ember/component/helper";

export function getSubRentalGroup([rentalGroup, index]) {
  return rentalGroup[index];
}

export default helper(getSubRentalGroup);
