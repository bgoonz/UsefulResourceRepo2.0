import React from 'react';
import _ from 'lodash';

import FeaturedGrid from './FeaturedGrid';

export default class FeaturedProductsSection extends React.Component {
    render() {
        let section = _.get(this.props, 'section', null);
        let featured_products = _.get(section, 'featured_products', null);
        return (
            <section className="content__row"  data-id={_.get(section, 'section_id', null)}>
                    <h2 className={'content__row-title' + (_.get(section, 'light_title', null) ? (' content__row-title--light') : '')}>
                        {_.get(section, 'icon', null) && (
                        <svg width="29" height="25" viewBox="0 0 29 25" xmlns="http://www.w3.org/2000/svg">
                            <path d="M28.152 3.419c-0.939-1.661-6.827-7.221-13.652 0.829-7.168-8.051-12.715-2.49-13.652-0.829-1.707 3.071-0.683 7.719 1.707 9.96l11.947 11.621 11.947-11.621c2.387-2.241 3.411-6.888 1.704-9.96h-0z" />
                        </svg>
                        )}
                        {_.get(section, 'title', null)}
                    </h2>
                    <FeaturedGrid {...this.props} products={featured_products} site={this.props} />
                </section>
        );
    }
}
