import React from 'react';
import _ from 'lodash';
import { graphql } from 'gatsby';

import { markdownify } from '../utils';
import Action from './Action';

export const query = graphql`
    fragment SectionHeroFragment on ContentfulSectionHero {
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
        content {
            content
        }
        image {
            file {
                url
            }
        }
        actions {
            ...ActionFragment
        }
    }
`;

export default class SectionHero extends React.Component {
    render() {
        const section = _.get(this.props, 'section');
        return (
            <section id={_.get(section, 'section_id.section_id')} className="block hero-block bg-accent outer">
                <div className="inner">
                    <div className="grid">
                        {_.get(section, 'image') && (
                            <div className="cell block-preview">
                                <img src={_.get(section, 'image.file.url')} alt={_.get(section, 'title.title')} />
                            </div>
                        )}
                        <div className="cell block-content">
                            {_.get(section, 'title.title') && (
                                <h2 className="block-title underline">{_.get(section, 'title.title')}</h2>
                            )}
                            <div className="block-copy">{markdownify(_.get(section, 'content.content'))}</div>
                            {_.get(section, 'actions') && (
                                <p className="block-buttons">
                                    {_.map(_.get(section, 'actions'), (action, actionIdx) => (
                                        <Action key={actionIdx} action={action} className="button white large" />
                                    ))}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
