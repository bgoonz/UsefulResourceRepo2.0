import React from 'react';
import _ from 'lodash';
import moment from 'moment-strftime';

import { getData, Link, withPrefix } from '../utils';

export default class BlogPostMeta extends React.Component {
    renderAuthor(authorRef, data) {
        const author = getData(data, authorRef);
        if (!author) {
            return null;
        }
        const authorName = _.trim(`${author.first_name} ${author.last_name}`);
        if (author.link) {
            return (
                <span>
                    {' '}
                    by <Link href={withPrefix(author.link)}>{authorName}</Link>
                </span>
            );
        } else {
            return <span> by {authorName}</span>;
        }
    }

    render() {
        const data = _.get(this.props, 'data');
        const post = _.get(this.props, 'post');
        const date = _.get(post, 'date');
        const dateTimeAttr = moment(date).strftime('%Y-%m-%d %H:%M');
        const formattedDate = moment(date).strftime('%B %d, %Y');
        const authorRef = _.get(post, 'author');
        const containerClass = _.get(this.props, 'containerClass', '');

        return (
            <div className={containerClass}>
                <span>
                    On <time dateTime={dateTimeAttr}>{formattedDate}</time>
                </span>
                {authorRef && this.renderAuthor(authorRef, data)}
            </div>
        );
    }
}
