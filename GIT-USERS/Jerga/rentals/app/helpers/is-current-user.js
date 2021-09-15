import { helper } from "@ember/component/helper";

export function isCurrentUser(params /*, hash*/) {
  let [rentalUser, loggedUser] = params;
  if (rentalUser === loggedUser) {
    return "<i class='user-icon fa fa-user-secret'></i>";
  }
}

export default helper(isCurrentUser);
