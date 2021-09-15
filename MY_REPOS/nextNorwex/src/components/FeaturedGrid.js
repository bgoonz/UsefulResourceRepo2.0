import React from 'react';
import _ from 'lodash';

import {getPageByFilePath} from '../utils';
import ProductGridItem from './ProductGridItem';

export default class FeaturedGrid extends React.Component {
    render() {
        let site = _.get(this.props, 'site', null);
        let products = _.get(this.props, 'products', null);
        let listCssClass = _.get(this.props, 'cssClass', null);
        return (
            <ul className={'product-grid ' + (listCssClass ? (listCssClass) : '')}>
                {_.map(products, (product, product_idx) => {
                    let product_page = getPageByFilePath(this.props.pages, product);
                    return (
                            <ProductGridItem key={product_idx} {...this.props} product_page={product_page} site={site} />
                    )
                })}
            </ul>
        );
    }
}
