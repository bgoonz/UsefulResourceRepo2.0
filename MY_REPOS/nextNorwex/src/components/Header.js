import React from 'react';
import _ from 'lodash';

import {classNames, withPrefix, Link, toStyleObj} from '../utils';
import Picture from './Picture';

export default class Header extends React.Component {
    render() {
        let page = _.get(this.props, 'page', null);
        let site = _.get(this.props, 'site', null);
        let is_white_header = _.get(page, 'frontmatter.white_header', null) || false;
        let is_logo_light = false;
        if ((is_white_header || (_.get(page, 'frontmatter.layout', null) === 'product'))) {
             is_logo_light = true;
        }
        return (
            <React.Fragment>
                <header className="header">
                    <nav className={classNames('nav', {'nav--light': is_white_header, 'nav--dark': is_white_header !== true})}>
                        <div className="nav__logo"{...((is_logo_light && _.get(site, 'data.config.logo_light', null)) ? ({"data-original": withPrefix(_.get(site, 'data.config.logo_light', null))}) : null)}{...(_.get(site, 'data.config.logo_dark', null) ? ({"data-dark": withPrefix(_.get(site, 'data.config.logo_dark', null))}) : null)}>
                            <Link href={withPrefix('/')}>
                                {is_logo_light ? (
                                    <Picture {...this.props} image={_.get(site, 'data.config.logo_light', null)} cssClass={'nav__logo-image'} alt={'Site logo'} />
                                ) : 
                                    <Picture {...this.props} image={_.get(site, 'data.config.logo_dark', null)} cssClass={'nav__logo-image'} alt={'Site logo'} />
                                }
                            </Link>
                        </div>
                        <ul className="nav__menu">
                            {_.map(_.get(site, 'data.config.main_menu', null), (item, item_idx) => {
                                let section = _.get(page, 'frontmatter.section', null) || _.get(page, 'frontmatter.title', null);
                                let isActive = (_.get(item, 'title', null) === section) ? (true) : false;
                                return (<React.Fragment key={item_idx + '.1'}>
                                    <li key={item_idx} className="nav__menu-item">
                                        <Link href={withPrefix(_.get(item, 'url', null))} className={classNames('nav__menu-item-link', {'nav__menu-item-link--active': isActive})}>
                                            {_.get(item, 'title', null)}
                                        </Link>
                                    </li>
                                </React.Fragment>)
                            })}
                        </ul>
                        <div className="nav__right">
                            <button className="snipcart-checkout nav__button button button--transparent">
                                <span className="button__icon nav__button-icon">
                                    <svg width="24" height="25" viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M22.907 4.22c0.125-0.021 0.254-0.016 0.383 0.018l-0-0c0.505 0.135 0.808 0.704 0.682 1.244l-2.299 9.644c-0.126 0.434-0.505 0.759-0.934 0.759h-12.428l0.556 2.41h10.357c0.531 0 0.96 0.46 0.96 1.030s-0.429 1.029-0.96 1.029h-11.089c-0.455 0-0.834-0.325-0.934-0.785l-3.89-17.010h-2.349c-0.531 0-0.96-0.46-0.96-1.030s0.429-1.030 0.96-1.030h3.082c0.455 0 0.834 0.325 0.934 0.785l2.88 12.542h12.174l1.746-7.377h-7.877c-0.617 0-1.118-0.5-1.118-1.117s0.5-1.117 1.118-1.117l8.901 0c0.036 0 0.071 0.002 0.106 0.005zM9.928 24.5c0.851 0 1.54-0.741 1.54-1.653s-0.69-1.653-1.54-1.653c-0.852 0-1.541 0.741-1.541 1.653s0.69 1.653 1.541 1.653zM19.424 22.847c0 0.912-0.69 1.653-1.54 1.653-0.852 0-1.541-0.741-1.541-1.653s0.69-1.653 1.541-1.653c0.85 0 1.54 0.741 1.54 1.653z" />
                                    </svg>
                                </span>
                                <span className="snipcart-items-count nav__total-items button__text">0</span>
                            </button>
                            <button className="hamburger button button--transparent">
                                <svg width="24" height="16" viewBox="0 0 24 16" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 1c0-0.552 0.448-1 1-1h22c0.552 0 1 0.448 1 1s-0.448 1-1 1h-22c-0.552 0-1-0.448-1-1zM0 8c0-0.552 0.448-1 1-1h12c0.552 0 1 0.448 1 1s-0.448 1-1 1h-12c-0.552 0-1-0.448-1-1zM1 14.001c-0.552 0-1 0.448-1 1s0.448 1 1 1h15c0.552 0 1-0.448 1-1s-0.448-1-1-1h-15z" />
                                </svg>
                            </button>
                            <div className="hamburger__content"{...(_.get(site, 'data.config.hamburger_background_image', null) ? ({style: toStyleObj('background-image: url(\'' + withPrefix(_.get(site, 'data.config.hamburger_background_image', null)) + '\')')}) : null)}>
                                <div className="hamburger__options">
                                    <button className="snipcart-checkout button button--transparent">
                                        <span className="button__icon nav__button-icon">
                                            <svg width="24" height="25" viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M22.907 4.22c0.125-0.021 0.254-0.016 0.383 0.018l-0-0c0.505 0.135 0.808 0.704 0.682 1.244l-2.299 9.644c-0.126 0.434-0.505 0.759-0.934 0.759h-12.428l0.556 2.41h10.357c0.531 0 0.96 0.46 0.96 1.030s-0.429 1.029-0.96 1.029h-11.089c-0.455 0-0.834-0.325-0.934-0.785l-3.89-17.010h-2.349c-0.531 0-0.96-0.46-0.96-1.030s0.429-1.030 0.96-1.030h3.082c0.455 0 0.834 0.325 0.934 0.785l2.88 12.542h12.174l1.746-7.377h-7.877c-0.617 0-1.118-0.5-1.118-1.117s0.5-1.117 1.118-1.117l8.901 0c0.036 0 0.071 0.002 0.106 0.005zM9.928 24.5c0.851 0 1.54-0.741 1.54-1.653s-0.69-1.653-1.54-1.653c-0.852 0-1.541 0.741-1.541 1.653s0.69 1.653 1.541 1.653zM19.424 22.847c0 0.912-0.69 1.653-1.54 1.653-0.852 0-1.541-0.741-1.541-1.653s0.69-1.653 1.541-1.653c0.85 0 1.54 0.741 1.54 1.653z" />
                                            </svg>
                                        </span>
                                    </button>
                                    <div className="">
                                        <span className="snipcart-items-count" /> products | <span className="snipcart-total-price" />
                                    </div>
                                </div>
                                <button className="link snipcart-checkout hamburger__checkout">
                                    Checkout
                                    <svg width="26" height="14" viewBox="0 0 26 14" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M22.682 6.079h-22.682v1.712h22.814l-4.574 4.528 1.194 1.182 6.566-6.5-6.566-6.5-1.194 1.182 4.442 4.397z" />
                                    </svg>
                                </button>
                                <ul className="hamburger__nav">
                                    {_.map(_.get(site, 'data.config.main_menu', null), (item, item_idx) => {
                                        let section = _.get(page, 'frontmatter.section', null) || _.get(page, 'frontmatter.title', null);
                                        let isActive = (_.get(item, 'title', null) === section) ? (true) : false;
                                        return (<React.Fragment key={item_idx + '.1'}>
                                            <li key={item_idx} className="hamburger__nav-item">
                                                <Link href={withPrefix(_.get(item, 'url', null))} className={classNames('hamburger__nav-link', {'hamburger__nav-link--active': isActive})}>
                                                    {_.get(item, 'title', null)}
                                                </Link>
                                            </li>
                                        </React.Fragment>)
                                    })}
                                </ul>
                            </div>
                        </div>
                    </nav>
                </header>
            </React.Fragment>
        );
    }
}
