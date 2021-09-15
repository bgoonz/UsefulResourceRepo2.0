import React from 'react';
import _ from 'lodash';

export default class BlogPostTags extends React.Component {
    render() {
        const tags = _.get(this.props, 'tags');
        const tagsLength = _.size(tags);
        if (!tagsLength) {
            return null;
        }

        return (
            <footer className="post__footer">
                {_.map(tags, (tag, index) => (
                    <span key={index}>{tag}</span>
                ))}
            </footer>
        );
    }
}
