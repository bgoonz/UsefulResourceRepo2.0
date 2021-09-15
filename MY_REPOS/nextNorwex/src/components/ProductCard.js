import React from 'react';
import _ from 'lodash';

import Picture from './Picture';

export default class ProductCard extends React.Component {
    render() {
        let product_page = _.get(this.props, 'product_page', null);
        return (
            <li className="product__card">
                <figure className="product__card__image">
                    <Picture {...this.props} image={_.get(product_page, 'frontmatter.default_thumbnail_image', null)} alt={_.get(product_page, 'frontmatter.title', null)} />
                </figure>
                <h2 className="product__card__title">
                    {_.get(product_page, 'frontmatter.title', null)}
                </h2>
            </li>
        );
    }
}
