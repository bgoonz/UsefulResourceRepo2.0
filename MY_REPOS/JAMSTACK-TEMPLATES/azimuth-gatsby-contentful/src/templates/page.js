import React from 'react';
import _ from 'lodash';
import { graphql } from 'gatsby';

import { Layout } from '../components/index';
import { markdownify } from '../utils';

export const query = graphql`
    query PageQuery($contentfulId: String!) {
        contentfulConfig {
            ...LayoutFragment
        }
        contentfulPage(contentful_id: { eq: $contentfulId }) {
            sys {
                contentType {
                    sys {
                        id
                    }
                }
            }
            title {
                title
            }
            subtitle {
                subtitle
            }
            slug
            img_path {
                file {
                    url
                }
            }
            content {
                content
            }
        }
    }
`;

export default class Page extends React.Component {
    render() {
        const config = _.get(this.props, 'data.contentfulConfig');
        const page = _.get(this.props, 'data.contentfulPage');
        return (
            <Layout page={page} config={config} path={this.props.path}>
                <div className="outer">
                    <div className="inner-medium">
                        <article className="post post-full">
                            <header className="post-header">
                                <h1 className="post-title">{_.get(page, 'title.title')}</h1>
                            </header>
                            {_.get(page, 'img_path') && (
                                <div className="post-thumbnail">
                                    <img src={_.get(page, 'img_path.file.url')} alt={_.get(page, 'title.title')} />
                                </div>
                            )}
                            {_.get(page, 'subtitle.subtitle') && (
                                <div className="post-subtitle">{_.get(page, 'subtitle.subtitle')}</div>
                            )}
                            <div className="post-content">{markdownify(_.get(page, 'content.content'))}</div>
                        </article>
                    </div>
                </div>
            </Layout>
        );
    }
}
