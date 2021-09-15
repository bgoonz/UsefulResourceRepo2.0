import React from 'react';
import _ from 'lodash';
import moment from 'moment-strftime';
import { graphql, useStaticQuery } from 'gatsby';

import { Link, markdownify, postUrl } from '../utils';

export const query = graphql`
    fragment SectionPostsFragment on ContentfulSectionPosts {
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
    }
`;

export default function SectionPost(props) {
    const { allContentfulPost } = useStaticQuery(graphql`
        query {
            allContentfulPost(limit: 3, sort: { fields: [date], order: DESC }) {
                edges {
                    node {
                        thumb_img_path {
                            file {
                                url
                            }
                        }
                        slug
                        title {
                            title
                        }
                        excerpt {
                            excerpt
                        }
                        date
                    }
                }
            }
        }
    `);
    const section = _.get(props, 'section');
    const posts = _.map(_.get(allContentfulPost, 'edges'), ({ node }) => node);
    return (
        <section
            id={_.get(section, 'section_id.section_id')}
            className={'block posts-block bg-' + _.get(section, 'bg') + ' outer'}
        >
            <div className="block-header inner-small">
                {_.get(section, 'title.title') && <h2 className="block-title">{_.get(section, 'title.title')}</h2>}
                {_.get(section, 'subtitle.subtitle') && (
                    <p className="block-subtitle">{_.get(section, 'subtitle.subtitle')}</p>
                )}
            </div>
            <div className="inner">
                <div className="post-feed">
                    {_.map(posts, (post, postIdx) => (
                        <article key={postIdx} className="post post-card">
                            <div className="post-card-inside">
                                {_.get(post, 'thumb_img_path') && (
                                    <Link className="post-card-thumbnail" to={postUrl(post)}>
                                        <img
                                            className="thumbnail"
                                            src={_.get(post, 'thumb_img_path.file.url')}
                                            alt={_.get(post, 'title.title')}
                                        />
                                    </Link>
                                )}
                                <div className="post-card-content">
                                    <header className="post-header">
                                        <h3 className="post-title">
                                            <Link to={postUrl(post)} rel="bookmark">
                                                {_.get(post, 'title.title')}
                                            </Link>
                                        </h3>
                                    </header>
                                    <div className="post-excerpt">{markdownify(_.get(post, 'excerpt.excerpt'))}</div>
                                    <footer className="post-meta">
                                        <time
                                            className="published"
                                            dateTime={moment(_.get(post, 'date')).strftime('%Y-%m-%d %H:%M')}
                                        >
                                            {moment(_.get(post, 'date')).strftime('%B %d, %Y')}
                                        </time>
                                    </footer>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
