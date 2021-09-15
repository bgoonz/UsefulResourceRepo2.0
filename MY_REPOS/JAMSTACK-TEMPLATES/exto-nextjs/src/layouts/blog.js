import React from 'react';
import _ from 'lodash';
import moment from 'moment-strftime';

import { Layout } from '../components/index';
import { classNames, getPageUrl, Link, withPrefix } from '../utils';

export default class Blog extends React.Component {
    renderPost(post, index) {
        const title = _.get(post, 'title');
        const thumbImage = _.get(post, 'thumb_image');
        const thumbImageAlt = _.get(post, 'thumb_image_alt', '');
        const excerpt = _.get(post, 'excerpt');
        const date = _.get(post, 'date');
        const dateTimeAttr = moment(date).strftime('%Y-%m-%d %H:%M');
        const formattedDate = moment(date).strftime('%B %d, %Y');
        const postUrl = getPageUrl(post, { withPrefix: true });

        return (
            <article key={index} className="post grid-item">
                <div className="post-inside">
                    {thumbImage && (
                        <Link className="post-thumbnail" href={postUrl}>
                            <img src={withPrefix(thumbImage)} alt={thumbImageAlt} />
                        </Link>
                    )}
                    <header className="post-header">
                        <h2 className="post-title">
                            <Link href={postUrl}>{title}</Link>
                        </h2>
                        <div className="post-meta">
                            <time className="published" dateTime={dateTimeAttr}>
                                {formattedDate}
                            </time>
                        </div>
                    </header>
                    {excerpt && <p className="post-content">{excerpt}</p>}
                </div>
            </article>
        );
    }

    render() {
        const data = _.get(this.props, 'data');
        const config = _.get(data, 'config');
        const page = _.get(this.props, 'page');
        const title = _.get(page, 'title');
        const hideTitle = _.get(page, 'hide_title');
        const subtitle = _.get(page, 'subtitle');
        const colNumber = _.get(page, 'col_number', 'three');
        const posts = _.orderBy(_.get(this.props, 'posts', []), 'date', 'desc');

        return (
            <Layout page={page} config={config}>
                <div className="inner outer">
                    <header
                        className={classNames('page-header', 'inner-sm', {
                            'screen-reader-text': hideTitle
                        })}
                    >
                        <h1 className="page-title line-top">{title}</h1>
                        {subtitle && <div className="page-subtitle">{subtitle}</div>}
                    </header>
                    <div
                        className={classNames('post-feed', 'grid', {
                            'grid-col-2': colNumber === 'two',
                            'grid-col-3': colNumber === 'three'
                        })}
                    >
                        {_.map(posts, (post, index) => this.renderPost(post, index))}
                    </div>
                </div>
            </Layout>
        );
    }
}
