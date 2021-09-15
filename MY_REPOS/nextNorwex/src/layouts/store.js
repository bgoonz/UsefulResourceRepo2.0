import React from 'react';
import _ from 'lodash';

import components, {Layout} from '../components/index';

export default class Store extends React.Component {
    render() {
        return (
            <Layout {...this.props}>
            <main className={'content' + (_.get(this.props, 'page.frontmatter.page_css_class', null) ? (' ' + _.get(this.props, 'page.frontmatter.page_css_class', null)) : '')}>
                {_.map(_.get(this.props, 'page.frontmatter.sections', null), (section, section_idx) => {
                    let component = _.upperFirst(_.camelCase(_.get(section, 'type', null)));
                    let Component = components[component];
                    return (
                    <Component key={section_idx} {...this.props} section={section} page={this.props.page} site={this.props} />
                    )
                })}
            </main>
            </Layout>
        );
    }
}
