import React from "react";
import _ from "lodash";

import { markdownify } from "../utils";

export default class SectionFaq extends React.Component {
  componentDidMount() {
    // Accordion
    const accordions = document.querySelectorAll(".faq-accordion");
    Array.from(accordions).forEach((accordion) => {
      new BadgerAccordion(accordion, {
        headerClass: ".accordion-trigger",
        panelClass: ".accordion-panel",
        panelInnerClass: ".accordion-content",
        openMultiplePanels: true,
      });
    });
  }

  render() {
    const section = _.get(this.props, "section");
    return (
      <section
        id={_.get(section, "section_id")}
        className={
          "block faq-block bg-" + _.get(section, "background") + " outer"
        }
      >
        <div className="inner-small">
          <div className="block-header">
            {_.get(section, "title") && (
              <h2 className="block-title">{_.get(section, "title")}</h2>
            )}
            {_.get(section, "subtitle") && (
              <p className="block-subtitle">{_.get(section, "subtitle")}</p>
            )}
          </div>
          {_.get(section, "faq_items") && (
            <dl className="faq-accordion">
              {_.map(_.get(section, "faq_items"), (faqItem, faqItemIndex) => (
                <React.Fragment key={faqItemIndex}>
                  <dt className="accordion-header">
                    <button className="accordion-trigger">
                      <div className="accordion-title">
                        {_.get(faqItem, "question")}
                      </div>
                      <div className="accordion-icon icon-plus" />
                    </button>
                  </dt>
                  <dd className="accordion-panel">
                    <div className="accordion-content">
                      {markdownify(_.get(faqItem, "answer"))}
                    </div>
                  </dd>
                </React.Fragment>
              ))}
            </dl>
          )}
        </div>
      </section>
    );
  }
}
