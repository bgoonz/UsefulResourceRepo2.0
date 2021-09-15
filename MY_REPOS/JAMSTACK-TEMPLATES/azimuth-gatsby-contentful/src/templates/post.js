import React from 'react';
import _ from 'lodash';
import moment from 'moment-strftime';
import { graphql } from 'gatsby';

import { Layout } from '../components/index';
import { markdownify } from '../utils';

export const query = graphql`
    query PostQuery($contentfulId: String!) {
        contentfulConfig {
            ...LayoutFragment
        }
        contentfulPost(contentful_id: { eq: $contentfulId }) {
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
            date
            thumb_img_path {
                file {
                    url
                }
            }
            img_path {
                file {
                    url
                }
            }
            excerpt {
                excerpt
            }
            content {
                content
            }
        }
    }
`;

export default class Post extends React.Component {
    render() {
        const config = _.get(this.props, 'data.contentfulConfig');
        const page = _.get(this.props, 'data.contentfulPost');
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
                            <footer className="post-meta">
                                <time
                                    className="published"
                                    dateTime={moment(_.get(page, 'date')).strftime('%Y-%m-%d %H:%M')}
                                >
                                    {moment(_.get(page, 'date')).strftime('%A, %B %e, %Y')}
                                </time>
                            </footer>
                        </article>
                    </div>
                </div>
            </Layout>
        );
    }
}
