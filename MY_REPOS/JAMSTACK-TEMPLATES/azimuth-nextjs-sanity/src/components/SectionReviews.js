import React from "react";
import _ from "lodash";

import { htmlToReact } from "../utils";

export default class SectionReviews extends React.Component {
  render() {
    const section = _.get(this.props, "section");
    return (
      <section
        id={_.get(section, "section_id")}
        className={
          "block reviews-block bg-" + _.get(section, "background") + " outer"
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
        {_.get(section, "reviews") && (
          <div className="inner">
            <div className="grid">
              {_.map(_.get(section, "reviews"), (review, reviewIdx) => (
                <blockquote key={reviewIdx} className="cell review">
                  <div className="review-inside">
                    <p className="review-text">
                      {htmlToReact(_.get(review, "content"))}
                    </p>
                    <footer className="review-footer">
                      {_.get(review, "avatar") && (
                        <img
                          className="review-avatar"
                          src={_.get(review, "avatar")}
                          alt="Author avatar"
                        />
                      )}
                      <cite className="review-author">
                        {_.get(review, "author")}
                      </cite>
                    </footer>
                  </div>
                </blockquote>
              ))}
            </div>
          </div>
        )}
      </section>
    );
  }
}
