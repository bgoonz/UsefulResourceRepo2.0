import React from 'react';
import _ from 'lodash';

import {toStyleObj, withPrefix, markdownify} from '../utils';

export default class HeaderSection extends React.Component {
    render() {
        let section = _.get(this.props, 'section', null);
        return (
            <section className="content__row header-section__header" {...(_.get(section, 'background_image', null) ? ({style: toStyleObj('background-image: url(\'' + withPrefix(_.get(section, 'background_image', null)) + '\')')}) : null)} data-id={_.get(section, 'section_id', null)}>
              <h1 className="header-section__title content__row">{_.get(section, 'headline', null)}</h1>
              <div className="content__row header-section__content">
                {markdownify(_.get(section, 'subtitle', null))}
              </div>
            </section>
        );
    }
}
