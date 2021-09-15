import React from "react";
import _ from "lodash";

import { classNames } from "../utils";
import Action from "./Action";

export default class CtaButtons extends React.Component {
  render() {
    const actions = _.get(this.props, "actions");
    if (_.isEmpty(actions)) {
      return null;
    }
    return (
      <p className="block-buttons">
        {_.map(actions, (action, actionIdx) => (
          <Action
            key={actionIdx}
            action={action}
            className={classNames("button", {
              secondary: !_.get(action, "primary"),
            })}
          />
        ))}
      </p>
    );
  }
}
