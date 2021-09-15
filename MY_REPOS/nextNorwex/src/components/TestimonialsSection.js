import React from 'react';
import _ from 'lodash';

export default class TestimonialsSection extends React.Component {
    render() {
        let section = _.get(this.props, 'section', null);
        let testimonials = _.get(section, 'testimonials', null);
        return (
            <section className="content__row" data-id={_.get(section, 'section_id', null)}>
                <h2 className="content__row-title">{_.get(section, 'title', null)}</h2>
                <div className="quotes">
                    {_.map(testimonials, (testimonial, testimonial_idx) => (<React.Fragment key={testimonial_idx + '.2'}>
                    <div key={testimonial_idx} className="quotes__item">
                        <svg className="quotes__icon" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 14.182l4.571-14.182h4.952l-3.81 13.289h3.81v10.711h-9.524v-9.818zM14.476 14.182l4.571-14.182h4.952l-3.81 13.289h3.81v10.711h-9.524v-9.818z" />
                        </svg>
                        <div className="quotes__text">{_.get(testimonial, 'text', null)}</div>
                        <div className="quotes__author">{_.get(testimonial, 'author.name', null)}<span className="quotes__location">, {_.get(testimonial, 'author.location', null)}</span></div>
                    </div>
                    <div key={testimonial_idx + '.1'} className="quotes__separator" />
                    </React.Fragment>))}
                </div>
            </section>
        );
    }
}
