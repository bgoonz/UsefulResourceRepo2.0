import React from 'react';
import _ from 'lodash';

import { Layout } from '../components/index';
import { withPrefix, markdownify } from '../utils';
import BlogPostCategories from '../components/BlogPostCategories';
import BlogPostMeta from '../components/BlogPostMeta';
import BlogPostTags from '../components/BlogPostTags';

export default class Post extends React.Component {
    render() {
        const data = _.get(this.props, 'data');
        const config = _.get(data, 'config');
        const page = _.get(this.props, 'page');
        const title = _.get(page, 'title');
        const image = _.get(page, 'image');
        const imageAlt = _.get(page, 'image_alt', '');
        const categories = _.get(page, 'categories', []);
        const tags = _.get(page, 'tags', []);
        const markdownContent = _.get(page, 'markdown_content');

        return (
            <Layout page={page} config={config}>
                <article className="post">
                    <div className="container container--md">
                        {image && (
                            <div className="post__image">
                                <img src={withPrefix(image)} alt={imageAlt} />
                            </div>
                        )}
                        <header className="post__header">
                            <BlogPostCategories categories={categories} data={data} containerClass={'post__meta'} />
                            <h1 className="post__title">{title}</h1>
                            <BlogPostMeta post={page} data={data} containerClass={'post__meta'} />
                        </header>
                        {markdownContent && <div className="post__copy">{markdownify(markdownContent)}</div>}
                        <BlogPostTags tags={tags} data={data} />
                    </div>
                </article>
            </Layout>
        );
    }
}
