import React from "react";
import _ from "lodash";

import { Link, safePrefix } from "../utils";

export default class Action extends React.Component {
  render() {
    const { action, ...other } = this.props;
    const targetProps = _.get(action, "new_window")
      ? { target: "_blank", rel: "noopener" }
      : null;
    return (
      <Link href={safePrefix(_.get(action, "url"))} {...targetProps} {...other}>
        {_.get(action, "label")}
      </Link>
    );
  }
}
