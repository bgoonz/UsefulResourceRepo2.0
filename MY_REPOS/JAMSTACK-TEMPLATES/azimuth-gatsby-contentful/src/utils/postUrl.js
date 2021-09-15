const { withPrefix } = require('gatsby');

const _ = require('lodash');

export default function postUrl(post) {
    const slug = _.trim(_.get(post, 'slug'), '/');
    return withPrefix(`blog/${slug}`);
}
