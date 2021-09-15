import React from 'react';
import _ from 'lodash';

import components, {Layout} from '../components/index';
import {getPage} from '../utils';

export default class Category extends React.Component {
    render() {
        let store_page = getPage(this.props.pages, '/store');
        return (
            <Layout {...this.props}>
            <main className={'content' + (_.get(store_page, 'frontmatter.page_css_class', null) ? (' ' + _.get(store_page, 'frontmatter.page_css_class', null)) : '')}>
                {_.map(_.get(store_page, 'frontmatter.sections', null), (section, section_idx) => (
                    (_.get(section, 'type', null) === 'store_section') ? ((() => {
                        let component = _.upperFirst(_.camelCase(_.get(section, 'type', null)));
                        let Component = components[component];
                        return (
                            <Component key={section_idx} {...this.props} section={section} page={this.props.page} category_url={_.get(this.props, 'page.__metadata.urlPath', null)} site={this.props} />
                        );
                    })()) : (() => {
                        let component = _.upperFirst(_.camelCase(_.get(section, 'type', null)));
                        let Component = components[component];
                        return ((() => {
                            let component = _.upperFirst(_.camelCase(_.get(section, 'type', null)));
                            let Component = components[component];
                            return (
                                <Component key={section_idx} {...this.props} section={section} page={this.props.page} category_url={_.get(this.props, 'page.__metadata.urlPath', null)} site={this.props} />
                            );
                        })());
                    })()
                ))}
            </main>
            </Layout>
        );
    }
}
