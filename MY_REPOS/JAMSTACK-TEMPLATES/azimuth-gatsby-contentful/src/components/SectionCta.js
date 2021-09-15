import React from 'react';
import _ from 'lodash';
import { graphql } from 'gatsby';

import Action from './Action';

export const query = graphql`
    fragment SectionCtaFragment on ContentfulSectionCta {
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
        title {
            title
        }
        subtitle {
            subtitle
        }
        actions {
            ...ActionFragment
        }
    }
`;

export default class SectionCta extends React.Component {
    render() {
        const section = _.get(this.props, 'section');
        return (
            <section id={_.get(section, 'section_id.section_id')} className="block cta-block bg-accent outer">
                <div className="inner-large">
                    <div className="grid">
                        <div className="cell block-content">
                            {_.get(section, 'title.title') && (
                                <h2 className="block-title">{_.get(section, 'title.title')}</h2>
                            )}
                            {_.get(section, 'subtitle.subtitle') && (
                                <p className="block-subtitle">{_.get(section, 'subtitle.subtitle')}</p>
                            )}
                        </div>
                        {_.get(section, 'actions') && (
                            <div className="cell block-buttons">
                                {_.map(_.get(section, 'actions'), (action, actionIdx) => (
                                    <Action key={actionIdx} action={action} className="button white large" />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>
        );
    }
}
