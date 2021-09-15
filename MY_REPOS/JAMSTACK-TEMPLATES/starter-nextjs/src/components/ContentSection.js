import React from 'react';
import _ from 'lodash';

import { markdownify } from '../utils';

export default class ContentSection extends React.Component {
    render() {
        const section = _.get(this.props, 'section');
        const title = _.get(section, 'title');
        const content = _.get(section, 'content');

        return (
            <section className="section">
                <div className="container container--md">
                    {title && <h2 className="section__title align-center">{title}</h2>}
                    {content && <div className="section__copy">{markdownify(content)}</div>}
                </div>
            </section>
        );
    }
}
