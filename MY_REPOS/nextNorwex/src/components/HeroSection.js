import React from 'react';
import _ from 'lodash';

import {toStyleObj, withPrefix, markdownify, Link, classNames} from '../utils';

export default class HeroSection extends React.Component {
    render() {
        let section = _.get(this.props, 'section', null);
        let bg_img_opacity_pct = _.get(section, 'background_image_opacity', null) || 100;
        let bg_img_opacity = bg_img_opacity_pct * 0.01;
        return (
            <section className="hero bg-color" data-id={_.get(section, 'section_id', null)}>
                {_.get(section, 'background_image', null) && (
                <div className="hero__bg-img" style={toStyleObj('background-image: url(\'' + withPrefix(_.get(section, 'background_image', null)) + '\'); opacity: ' + bg_img_opacity + ';')}/>
                )}
                <div className="hero__title">{markdownify(_.get(section, 'content', null))}</div>
                <div className="hero__links link-group">
                  {_.map(_.get(section, 'actions', null), (action, action_idx) => {
                      let action_style = _.get(action, 'style', null) || 'primary';
                      return (
                        <Link key={action_idx} href={withPrefix(_.get(action, 'url', null))} className={classNames('link', {'link--filled': action_style === 'primary', 'link--borderless': action_style === 'link'})}>
                          {_.get(action, 'title', null)}
                          {_.get(action, 'arrow', null) && (
                          <svg width="26" height="14" viewBox="0 0 26 14" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.682 6.079h-22.682v1.712h22.814l-4.574 4.528 1.194 1.182 6.566-6.5-6.566-6.5-1.194 1.182 4.442 4.397z" />
                          </svg>
                          )}
                        </Link>
                      )
                  })}
                </div>
            </section>
        );
    }
}
