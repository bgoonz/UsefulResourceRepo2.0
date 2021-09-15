import React from 'react';
import _ from 'lodash';

import { htmlToReact, classNames, withPrefix } from '../utils';

export default class SectionTestimonials extends React.Component {
    renderTestimonial(testimonial, index) {
        const content = _.get(testimonial, 'content');
        const avatar = _.get(testimonial, 'avatar');
        const avatarAlt = _.get(testimonial, 'avatar_alt', '');
        const author = _.get(testimonial, 'author');

        return (
            <div key={index} className="grid-item">
                <blockquote className="testimonial">
                    <p className="testimonial-content">{htmlToReact(content)}</p>
                    <footer className="testimonial-footer">
                        {avatar && <img className="testimonial-avatar" src={withPrefix(avatar)} alt={avatarAlt} />}
                        {author && <cite className="testimonial-author">{author}</cite>}
                    </footer>
                </blockquote>
            </div>
        );
    }

    render() {
        const section = _.get(this.props, 'section');
        const sectionId = _.get(section, 'section_id');
        const title = _.get(section, 'title');
        const subtitle = _.get(section, 'subtitle');
        const testimonials = _.get(section, 'testimonials');
        const colNumber = _.get(section, 'col_number', 'three');

        return (
            <section id={sectionId} className="block block-testimonials outer">
                <div className="inner">
                    {(title || subtitle) && (
                        <div className="block-header inner-sm">
                            {title && <h2 className="block-title line-top">{title}</h2>}
                            {subtitle && <p className="block-subtitle">{htmlToReact(subtitle)}</p>}
                        </div>
                    )}
                    {!_.isEmpty(testimonials) && (
                        <div className="block-content">
                            <div
                                className={classNames('grid', {
                                    'grid-col-2': colNumber === 'two',
                                    'grid-col-3': colNumber === 'three'
                                })}
                            >
                                {_.map(testimonials, (testimonial, index) => this.renderTestimonial(testimonial, index))}
                            </div>
                        </div>
                    )}
                </div>
            </section>
        );
    }
}
