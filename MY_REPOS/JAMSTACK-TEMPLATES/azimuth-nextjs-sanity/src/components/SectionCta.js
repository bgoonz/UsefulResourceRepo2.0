import React from "react";
import _ from "lodash";

import Action from "./Action";

export default class SectionCta extends React.Component {
  render() {
    const section = _.get(this.props, "section");
    return (
      <section
        id={_.get(section, "section_id")}
        className="block cta-block bg-accent outer"
      >
        <div className="inner-large">
          <div className="grid">
            <div className="cell block-content">
              {_.get(section, "title") && (
                <h2 className="block-title">{_.get(section, "title")}</h2>
              )}
              {_.get(section, "subtitle") && (
                <p className="block-subtitle">{_.get(section, "subtitle")}</p>
              )}
            </div>
            {_.get(section, "actions") && (
              <div className="cell block-buttons">
                {_.map(_.get(section, "actions"), (action, actionIdx) => (
                  <Action
                    key={actionIdx}
                    action={action}
                    className="button white large"
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }
}
