import React from "react";
import _ from "lodash";

import { Link, classNames, withPrefix } from "../utils";

export default class Action extends React.Component {
  render() {
    let action = _.get(this.props, "action", null);
    return (
      <Link
        className={classNames({
          btn: _.get(action, "style", null) !== "link",
          "btn--secondary": _.get(action, "style", null) === "secondary",
        })}
        href={withPrefix(_.get(action, "url", null))}
        {...(_.get(action, "new_window", null)
          ? { target: "_blank", rel: "noopener" }
          : null)}
      >
        {_.get(action, "label", null)}
      </Link>
    );
  }
}
