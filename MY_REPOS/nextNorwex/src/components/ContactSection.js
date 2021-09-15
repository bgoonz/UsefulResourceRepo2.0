import React from 'react';
import _ from 'lodash';

import {withPrefix, Link} from '../utils';

export default class ContactSection extends React.Component {
    render() {
        let section = _.get(this.props, 'section', null);
        return (
            <section className="content__row content__row--full-width contact__section" data-id={_.get(section, 'section_id', null)}>
              {_.get(section, 'image', null) && (<img src={withPrefix(_.get(section, 'image', null))} alt="" className="contact__image"/>)}
              <div className="contact__text-container">
                <h3 className="contact__title">Have any questions? <br/> Contact us.</h3>
                <div className="contact__info-container">
                  <p className="contact__address">{_.get(section, 'address', null)}</p>
                  <p className="contact__telephone">{_.get(section, 'phone', null)}</p>
                  <p className="contact__email">{_.get(section, 'email', null)}</p>
                  <div className="contact__separator" />
                  {_.get(section, 'mapUrl', null) && (
                  <Link className="contact__map-link link link--filled link--reversed" href={_.get(section, 'mapUrl', null)}>
                    On the map
                    <svg width="17" height="24" viewBox="0 0 17 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.25 0c-4.574 0-8.25 3.674-8.25 8.25 0 4.574 8.25 15.75 8.25 15.75s8.25-11.175 8.25-15.75c0-4.576-3.676-8.25-8.25-8.25zM8.25 11.999c-2.099 0-3.75-1.65-3.75-3.75 0-2.099 1.649-3.75 3.75-3.75 2.099 0 3.75 1.649 3.75 3.75s-1.651 3.75-3.75 3.75z" />
                    </svg>
                  </Link>
                  )}
                </div>
              </div>
            </section>
        );
    }
}
