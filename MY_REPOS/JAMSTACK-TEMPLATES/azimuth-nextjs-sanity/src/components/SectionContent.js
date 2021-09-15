import React from "react";
import _ from "lodash";

import { markdownify } from "../utils";
import CtaButtons from "./CtaButtons";

export default class SectionContent extends React.Component {
  render() {
    const section = _.get(this.props, "section");
    return (
      <section
        id={_.get(section, "section_id")}
        className={
          "block text-block bg-" + _.get(section, "background") + " outer"
        }
      >
        <div className="inner">
          <div className="grid">
            {_.get(section, "image") && (
              <div className="cell block-preview">
                <img
                  src={_.get(section, "image")}
                  alt={_.get(section, "title")}
                />
              </div>
            )}
            <div className="cell block-content">
              {_.get(section, "title") && (
                <h2 className="block-title underline">
                  {_.get(section, "title")}
                </h2>
              )}
              <div className="block-copy">
                {markdownify(_.get(section, "content"))}
              </div>
              <CtaButtons actions={_.get(section, "actions")} />
            </div>
          </div>
        </div>
      </section>
    );
  }
}
