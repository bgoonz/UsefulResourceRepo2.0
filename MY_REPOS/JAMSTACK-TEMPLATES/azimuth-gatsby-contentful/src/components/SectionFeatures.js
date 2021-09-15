import React from 'react';
import _ from 'lodash';
import { graphql } from 'gatsby';

import { markdownify } from '../utils';
import CtaButtons from './CtaButtons';

export const query = graphql`
    fragment SectionFeaturesFragment on ContentfulSectionFeatures {
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
        bg
        featureslist {
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
    }
`;

export default class SectionFeatures extends React.Component {
    render() {
        const section = _.get(this.props, 'section');
        return (
            <section
                id={_.get(section, 'section_id.section_id')}
                className={'block features-block bg-' + _.get(section, 'bg') + ' outer'}
            >
                <div className="block-header inner-small">
                    {_.get(section, 'title.title') && <h2 className="block-title">{_.get(section, 'title.title')}</h2>}
                    {_.get(section, 'subtitle.subtitle') && (
                        <p className="block-subtitle">{_.get(section, 'subtitle.subtitle')}</p>
                    )}
                </div>
                {_.get(section, 'featureslist') && (
                    <div className="inner">
                        {_.map(_.get(section, 'featureslist'), (feature, featureIndex) => (
                            <div key={featureIndex} className="block-item">
                                <div className="grid">
                                    {_.get(feature, 'image') && (
                                        <div className="cell block-preview">
                                            <img
                                                src={_.get(feature, 'image.file.url')}
                                                alt={_.get(feature, 'title.title')}
                                            />
                                        </div>
                                    )}
                                    <div className="cell block-content">
                                        <h3 className="block-title underline">{_.get(feature, 'title.title')}</h3>
                                        <div className="block-copy">
                                            {markdownify(_.get(feature, 'content.content'))}
                                        </div>
                                        <CtaButtons actions={_.get(feature, 'actions')} />
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
