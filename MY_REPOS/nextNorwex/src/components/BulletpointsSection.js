import React from 'react';
import _ from 'lodash';

import Picture from './Picture';
import {markdownify} from '../utils';

export default class BulletpointsSection extends React.Component {
    render() {
        let section = _.get(this.props, 'section', null);
        return (
            <section className="content__row bulletpoints__section" data-id={_.get(section, 'section_id', null)}>
            {_.map(_.get(section, 'bulletpoints', null), (bulletpoint, bulletpoint_idx) => (
              <section key={bulletpoint_idx} className="content__row bulletpoint__section">
                <Picture {...this.props} image={_.get(bulletpoint, 'image', null)} alt={_.get(bulletpoint, 'title', null)} cssClass={'bulletpoint__section-image'} />
                <div className="bulletpoint__section-content-container">
                  <h2 className="bulletpoint__section-title">{_.get(bulletpoint, 'title', null)}</h2>
                  <div className="bulletpoint__section-content">
                    {markdownify(_.get(bulletpoint, 'description', null))}
                  </div>
                </div>
              </section>
            ))}
            </section>
        );
    }
}
