import React from 'react';
import _ from 'lodash';

import { Link, withPrefix, getData, getPageUrl } from '../utils';
import BlogPostCategories from './BlogPostCategories';
import BlogPostMeta from '../components/BlogPostMeta';

export default class BlogFeedSection extends React.Component {
    renderBlogFeedItemFilter(post, data, section) {
        const sectionTitle = _.get(section, 'title');
        const sectionAuthorRef = _.get(section, 'author');
        const sectionCategoryRef = _.get(section, 'category');
        if (sectionAuthorRef) {
            const sectionAuthor = getData(data, sectionAuthorRef);
            if (_.isEmpty(sectionAuthor)) {
                return null;
            }
            const postAuthorRef = _.get(post, 'author');
            if (!postAuthorRef) {
                return null;
            }
            const postAuthor = getData(data, postAuthorRef);
            if (_.isEmpty(postAuthor)) {
                return null;
            }
            if (postAuthor.id === sectionAuthor.id) {
                return this.renderBlogFeedItem(post, data, sectionTitle);
            }
        } else if (sectionCategoryRef) {
            const sectionCategory = getData(data, sectionCategoryRef);
            if (_.isEmpty(sectionCategory)) {
                return null;
            }
            const postCategoryRefs = _.get(post, 'categories');
            const postCategories = _.map(postCategoryRefs, (postCategoryRef) => {
                return getData(data, postCategoryRef);
            });
            const category = _.find(postCategories, { id: sectionCategory.id });
            if (category) {
                return this.renderBlogFeedItem(post, data, sectionTitle);
            }
        } else {
            return this.renderBlogFeedItem(post, data, sectionTitle);
        }
        return null;
    }

    renderBlogFeedItem(post, data, sectionTitle) {
        const postUrl = getPageUrl(post, { withPrefix: true });
        const title = _.get(post, 'title');
        const image = _.get(post, 'image');
        const imageAlt = _.get(post, 'image_alt', '');
        const categories = _.get(post, 'categories', []);
        const excerpt = _.get(post, 'excerpt');

        return (
            <article className="cell">
                <div className="card">
                    {image && (
                        <Link className="card__media card__media--top" href={postUrl}>
                            <img src={withPrefix(image)} alt={imageAlt} />
                        </Link>
                    )}
                    <div className="card__body">
                        <header className="card__header">
                            <BlogPostCategories categories={categories} data={data} containerClass={'card__meta'} />
                            {sectionTitle ? (
                                <h3 className="h4 card__title">
                                    <Link href={postUrl}>{title}</Link>
                                </h3>
                            ) : (
                                <h2 className="h4 card__title">
                                    <Link href={postUrl}>{title}</Link>
                                </h2>
                            )}
                        </header>
                        {excerpt && (
                            <div className="card__copy">
                                <p>{excerpt}</p>
                            </div>
                        )}
                        <BlogPostMeta post={post} data={data} containerClass={'card__footer'} />
                    </div>
                </div>
            </article>
        );
    }

    render() {
        const data = _.get(this.props, 'data');
        const section = _.get(this.props, 'section');
        const title = _.get(section, 'title');
        const showRecent = _.get(section, 'show_recent');
        const recentCount = _.get(section, 'recent_count', 3);
        let posts = _.orderBy(_.get(this.props, 'posts', []), 'date', 'desc');
        if (showRecent) {
            posts = posts.slice(0, recentCount);
        }

        return (
            <section className="section section--posts">
                {title && (
                    <div className="container container--md align-center">
                        <h2 className="section__title">{title}</h2>
                    </div>
                )}
                <div className="container container--lg">
                    <div className="flex flex--col-3">
                        {_.map(posts, (post, index) => {
                            return <React.Fragment key={index}>{this.renderBlogFeedItemFilter(post, data, section)}</React.Fragment>;
                        })}
                    </div>
                </div>
            </section>
        );
    }
}
