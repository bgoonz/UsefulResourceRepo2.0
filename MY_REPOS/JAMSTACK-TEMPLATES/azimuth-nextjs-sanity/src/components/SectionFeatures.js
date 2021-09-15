import React from "react";
import _ from "lodash";

import { markdownify } from "../utils";
import CtaButtons from "./CtaButtons";

export default class SectionFeatures extends React.Component {
  render() {
    const section = _.get(this.props, "section");
    return (
      <section
        id={_.get(section, "section_id")}
        className={
          "block features-block bg-" + _.get(section, "background") + " outer"
        }
      >
        <div className="block-header inner-small">
          {_.get(section, "title") && (
            <h2 className="block-title">{_.get(section, "title")}</h2>
          )}
          {_.get(section, "subtitle") && (
            <p className="block-subtitle">{_.get(section, "subtitle")}</p>
          )}
        </div>
        {_.get(section, "features") && (
          <div className="inner">
            {_.map(_.get(section, "features"), (feature, featureIndex) => (
              <div key={featureIndex} className="block-item">
                <div className="grid">
                  {_.get(feature, "image") && (
                    <div className="cell block-preview">
                      <img
                        src={_.get(feature, "image")}
                        alt={_.get(feature, "title")}
                      />
                    </div>
                  )}
                  <div className="cell block-content">
                    <h3 className="block-title underline">
                      {_.get(feature, "title")}
                    </h3>
                    <div className="block-copy">
                      {markdownify(_.get(feature, "content"))}
                    </div>
                    <CtaButtons actions={_.get(feature, "actions")} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    );
  }
}
