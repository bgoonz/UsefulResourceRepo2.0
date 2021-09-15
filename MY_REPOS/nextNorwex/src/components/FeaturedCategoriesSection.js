import React from 'react';
import _ from 'lodash';

import {getPageByFilePath, getPages} from '../utils';
import ProductGrid from './ProductGrid';

export default class FeaturedCategoriesSection extends React.Component {
    render() {
        let section = _.get(this.props, 'section', null);
        let categories = _.get(section, 'featured_categories', null);
        return (
            <section className="content__row" data-id={_.get(section, 'section_id', null)}>
                {_.map(categories, (category, category_idx) => {
                    let category_page = getPageByFilePath(this.props.pages, category);
                    let product_pages = _.orderBy(getPages(this.props.pages, '/products'), 'frontmatter.order');
                    return (<React.Fragment key={category_idx + '.2'}>
                        <h2 key={category_idx} className="content__row-title">{_.get(category_page, 'frontmatter.title', null)}</h2>
                        <ProductGrid key={category_idx + '.1'} {...this.props} product_pages={product_pages} category_url={_.get(category_page, '__metadata.urlPath', null)} site={this.props} />
                    </React.Fragment>)
                })}
            </section>
        );
    }
}
