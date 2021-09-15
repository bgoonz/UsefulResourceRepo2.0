import React from "react";
import _ from "lodash";

import { markdownify } from "../utils";
import CtaButtons from "./CtaButtons";

export default class SectionPricing extends React.Component {
  render() {
    const section = _.get(this.props, "section");
    return (
      <section
        id={_.get(section, "section_id")}
        className={
          "block pricing-block bg-" + _.get(section, "background") + " outer"
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
        {_.get(section, "pricing_plans") && (
          <div className="inner">
            <div className="grid">
              {_.map(
                _.get(section, "pricing_plans"),
                (pricingPlan, pricingPlanIdx) => (
                  <div
                    key={pricingPlanIdx}
                    className={
                      "cell plan" +
                      (_.get(pricingPlan, "highlight") ? " highlight" : "")
                    }
                  >
                    <div className="plan-inside">
                      <h3 className="plan-name">
                        {_.get(pricingPlan, "title")}
                      </h3>
                      {_.get(pricingPlan, "price") && (
                        <div className="plan-price">
                          {_.get(pricingPlan, "price")}
                        </div>
                      )}
                      <div className="plan-details">
                        {markdownify(_.get(pricingPlan, "details"))}
                      </div>
                      <CtaButtons actions={_.get(pricingPlan, "actions")} />
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </section>
    );
  }
}
