import React from 'react';
import _ from 'lodash';

import {withPrefix, getPageByFilePath} from '../utils';

export default class BuyButton extends React.Component {
    render() {
        let product_page = _.get(this.props, 'product_page', null);
        return (
            <button className="button button--std snipcart-add-item"
                data-item-name={_.get(product_page, 'frontmatter.title', null)}
                data-item-url={_.get(product_page, '__metadata.urlPath', null)}
                data-item-price={_.get(product_page, 'frontmatter.price', null)}
                {...(_.get(product_page, 'frontmatter.default_thumbnail_image', null) ? ({"data-item-image": withPrefix(_.get(product_page, 'frontmatter.default_thumbnail_image', null))}) : null)}
                data-item-description={_.get(product_page, 'frontmatter.description', null)}
                {...(_.get(product_page, 'frontmatter.category', null) ? ((() => {
                    let category_page = getPageByFilePath(this.props.pages, _.get(product_page, 'frontmatter.category', null));
                    return ({"data-item-categories": _.get(category_page, 'frontmatter.title', null)});
                })()) : null)}
                data-item-id={_.get(product_page, 'frontmatter.id', null)}>
                <span className="button__icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M23.29 4.943c-0.505-0.127-1.036 0.178-1.162 0.688l-2.097 8.331h-12.174l-2.88-11.796c-0.101-0.433-0.48-0.738-0.934-0.738h-3.082c-0.531 0-0.96 0.433-0.96 0.968s0.429 0.968 0.96 0.968h2.349l3.89 15.999c0.101 0.433 0.48 0.738 0.934 0.738h11.089c0.531 0 0.96-0.433 0.96-0.968s-0.429-0.968-0.96-0.968h-10.357l-0.556-2.267h12.428c0.429 0 0.808-0.306 0.934-0.714l2.299-9.070c0.126-0.509-0.177-1.043-0.682-1.17l0 0z" />
                        <path d="M11.468 22.446c0 0.858-0.69 1.554-1.54 1.554s-1.541-0.697-1.541-1.554c0-0.858 0.69-1.554 1.541-1.554s1.54 0.697 1.54 1.554z" />
                        <path d="M19.424 22.446c0 0.858-0.69 1.554-1.54 1.554-0.852 0-1.541-0.697-1.541-1.554s0.69-1.554 1.541-1.554c0.851 0 1.54 0.697 1.54 1.554z" />
                        <path d="M16.697 6.114l-1.718 1.733v-6.879c0-0.535-0.429-0.968-0.96-0.968s-0.96 0.433-0.96 0.968v6.879l-1.718-1.733c-0.177-0.178-0.429-0.281-0.682-0.281s-0.48 0.102-0.682 0.281c-0.379 0.382-0.379 0.993 0 1.35l3.36 3.389c0.353 0.356 0.985 0.356 1.339 0l3.36-3.389c0.379-0.382 0.379-0.993 0-1.35-0.354-0.382-0.96-0.382-1.339 0h-0z" />
                    </svg>
                </span>
                <span className="button__text">
                    Add to cart
                </span>
            </button>
        );
    }
}
