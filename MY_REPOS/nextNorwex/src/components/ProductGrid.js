import React from 'react';
import _ from 'lodash';

import ProductGridItem from './ProductGridItem';
import {getPageByFilePath} from '../utils';

export default class ProductGrid extends React.Component {
    render() {
        let site = _.get(this.props, 'site', null);
        let product_pages = _.get(this.props, 'product_pages', null);
        let listCssClass = _.get(this.props, 'cssClass', null);
        let category_url = _.get(this.props, 'category_url', null);
        return (
            <ul className={'product-grid ' + (listCssClass ? (listCssClass) : '')}>
                {_.map(product_pages, (product_page, product_page_idx) => (
                    (!category_url) ? (
                        <ProductGridItem key={product_page_idx} {...this.props} product_page={product_page} site={site} />
                    ) : 
                        _.get(product_page, 'frontmatter.category', null) && ((() => {
                            let category_page = getPageByFilePath(this.props.pages, _.get(product_page, 'frontmatter.category', null));
                            return (
                                (category_url === _.get(category_page, '__metadata.urlPath', null)) && (
                                    <ProductGridItem key={product_page_idx + '.1'} {...this.props} product_page={product_page} site={site} />
                                )
                            );
                        })())
                ))}
            </ul>
        );
    }
}
