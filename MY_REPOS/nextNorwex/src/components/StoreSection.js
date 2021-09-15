import React from 'react';
import _ from 'lodash';

import NavCategories from './NavCategories';
import {getPages} from '../utils';
import ProductGrid from './ProductGrid';

export default class StoreSection extends React.Component {
    render() {
        let page = _.get(this.props, 'page', null);
        let section = _.get(this.props, 'section', null);
        let category_url = _.get(this.props, 'category_url', null);
        let product_pages = _.orderBy(getPages(this.props.pages, '/products'), 'frontmatter.order');
        return (
            <section className="content__row" data-id={_.get(section, 'section_id', null)}>
                <div className="content__row content__row--direction-row store__head">
                    <h1 className="store__title">All Products</h1>
                </div>
                <div className="content__row store__container">
                    <nav className="store__nav">
                        <NavCategories {...this.props} page={page} site={this.props} />
                    </nav>
                    <section className="store__products">
                        <ProductGrid {...this.props} product_pages={product_pages} category_url={category_url} cssClass={'store__product-grid'} site={this.props} />
                    </section>
                </div>
            </section>
        );
    }
}
