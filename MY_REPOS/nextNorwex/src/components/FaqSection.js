import React from 'react';
import _ from 'lodash';

import {markdownify} from '../utils';

export default class FaqSection extends React.Component {
    render() {
        let section = _.get(this.props, 'section', null);
        return (
            <section className="content__row faq__section" data-id={_.get(section, 'section_id', null)}>
            {_.map(_.get(section, 'questions', null), (question, question_idx) => (
              <section key={question_idx} className="content__row faq__section-content">
                <div className="faq__section-content-container">
                  <h2 className="faq__question">{_.get(question, 'question', null)}</h2>
                  <div className="faq__answer">
                    {markdownify(_.get(question, 'answer', null))}
                  </div>
                </div>
              </section>
            ))}
            </section>
        );
    }
}
