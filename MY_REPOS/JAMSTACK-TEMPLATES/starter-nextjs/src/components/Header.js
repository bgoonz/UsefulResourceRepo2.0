import React from 'react';
import Router from 'next/router';
import _ from 'lodash';

import { Link, withPrefix, classNames, getPageUrl } from '../utils';
import Action from './Action';
import Icon from './Icon';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.handleWindowResize = this.handleWindowResize.bind(this);
        this.handleRouteChange = this.handleRouteChange.bind(this);
        this.menuOpenRef = React.createRef();
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleWindowResize, true);
        Router.events.on('routeChangeStart', this.handleRouteChange);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowResize, true);
        Router.events.off('routeChangeStart', this.handleRouteChange);
    }

    handleWindowResize() {
        const menuOpenElm = _.get(this.menuOpenRef, 'current.offsetParent');
        if (menuOpenElm === null) {
            document.body.classList.remove('js-nav-open');
        }
    }

    handleRouteChange() {
        document.body.classList.remove('js-nav-open');
    }

    handleMenuToggle(event) {
        event.preventDefault();
        document.body.classList.toggle('js-nav-open');
    }

    renderNavLinks(navLinks, pageUrl) {
        return (
            <React.Fragment>
                <button
                    aria-label="Menu"
                    className="btn btn--icon btn--clear navbar__menu-btn js-nav-toggle"
                    ref={this.menuOpenRef}
                    onClick={this.handleMenuToggle.bind(this)}
                >
                    <Icon icon="hamburger" />
                </button>
                <div className="navbar__menu">
                    <div className="navbar__scroller">
                        <div className="navbar__inner">
                            <button
                                aria-label="Close"
                                className="btn btn--icon btn--clear navbar__close-btn js-nav-toggle"
                                onClick={this.handleMenuToggle.bind(this)}
                            >
                                <Icon icon="close" />
                            </button>
                            <ul className="navbar__list menu">
                                {_.map(navLinks, (action, index) => {
                                    const url = _.trim(_.get(action, 'url'), '/');
                                    const style = _.get(action, 'style', 'link');
                                    const classes = classNames('navbar__item', {
                                        'navbar__item--btn': style !== 'link',
                                        'is-active': pageUrl === url
                                    });
                                    return (
                                        <li key={index} className={classes}>
                                            <Action action={action} />
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    render() {
        const page = _.get(this.props, 'page');
        const pageUrl = _.trim(getPageUrl(page), '/');
        const config = _.get(this.props, 'config');
        const header = _.get(config, 'header');
        const logo = _.get(header, 'logo');
        const logoAlt = _.get(header, 'logo_alt', '');
        const title = _.get(header, 'title');
        const hasNav = _.get(header, 'has_nav');
        const navLinks = _.get(header, 'nav_links');

        return (
            <header className="site-header">
                <div className="container container--lg">
                    <nav className="navbar" aria-label="Main Navigation">
                        <Link className="sr-only" href="#content">
                            Skip to main content
                        </Link>
                        {logo ? (
                            <Link className="navbar__logo" href={withPrefix('/')}>
                                <img src={withPrefix(logo)} alt={logoAlt} />
                            </Link>
                        ) : (
                            <Link className="h4 navbar__title" href={withPrefix('/')}>
                                {title}
                            </Link>
                        )}
                        {hasNav && !_.isEmpty(navLinks) && this.renderNavLinks(navLinks, pageUrl)}
                    </nav>
                </div>
            </header>
        );
    }
}
