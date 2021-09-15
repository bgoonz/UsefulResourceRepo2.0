import React from 'react';
import _ from 'lodash';
import { graphql } from 'gatsby';

import { markdownify } from '../utils';
import CtaButtons from './CtaButtons';

export const query = graphql`
    fragment SectionContentFragment on ContentfulSectionContent {
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

export default class SectionContent extends React.Component {
    render() {
        const section = _.get(this.props, 'section');
        return (
            <section
                id={_.get(section, 'section_id.section_id')}
                className={'block text-block bg-' + _.get(section, 'bg') + ' outer'}
            >
                <div className="inner">
                    <div className="grid">
                        {_.get(section, 'image') && (
                            <div className="cell block-preview">
                                <img src={_.get(section, 'image.file.url')} alt={_.get(section, 'title.title')} />
                            </div>
                        )}
                        <div className="cell block-content">
                            {_.get(section, 'title') && (
                                <h2 className="block-title underline">{_.get(section, 'title.title')}</h2>
                            )}
                            <div className="block-copy">{markdownify(_.get(section, 'content.content'))}</div>
                            <CtaButtons actions={_.get(section, 'actions')} />
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
