import React from 'react';
import _ from 'lodash';
import { graphql } from 'gatsby';

import { markdownify } from '../utils';

export const query = graphql`
    fragment SectionContactFragment on ContentfulSectionContact {
        sys {
            contentType {
                sys {
                    id
                }
            }
        }
        section_id {
            section_id
        }
        bg
        title {
            title
        }
        subtitle {
            subtitle
        }
        content {
            content
        }
    }
`;

export default class SectionContact extends React.Component {
    render() {
        let section = _.get(this.props, 'section');
        return (
            <section
                id={_.get(section, 'section_id.section_id')}
                className={'block contact-block bg-' + _.get(section, 'bg') + ' outer'}
            >
                <div className="block-header inner-small">
                    {_.get(section, 'title') && <h2 className="block-title">{_.get(section, 'title.title')}</h2>}
                    {_.get(section, 'subtitle') && (
                        <p className="block-subtitle">{_.get(section, 'subtitle.subtitle')}</p>
                    )}
                </div>
                <div className="block-content inner-medium">
                    {markdownify(_.get(section, 'content.content'))}
                    <form name="contactForm" method="POST" id="contact-form" className="contact-form">
                        <p className="screen-reader-text">
                            <label>
                                Don't fill this out if you're human: <input name="bot-field" />
                            </label>
                        </p>
                        <p className="form-row">
                            <label htmlFor="name" className="form-label">
                                Name
                            </label>
                            <input type="text" name="name" className="form-input" />
                        </p>
                        <p className="form-row">
                            <label htmlFor="email" className="form-label">
                                Email address
                            </label>
                            <input type="email" name="email" className="form-input" />
                        </p>
                        <p className="form-row">
                            <label htmlFor="message" className="form-label">
                                Message
                            </label>
                            <textarea name="message" className="form-textarea" rows="7" />
                        </p>
                        <input type="hidden" name="form-name" value="contactForm" />
                        <p className="form-row form-submit">
                            <button type="submit" className="button">
                                Send Message
                            </button>
                        </p>
                    </form>
                </div>
            </section>
        );
    }
}
