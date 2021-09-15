import React from 'react';
import _ from 'lodash';

import {Link, withPrefix} from '../utils';
import Picture from './Picture';

export default class Footer extends React.Component {
    render() {
        let page = _.get(this.props, 'page', null);
        let site = _.get(this.props, 'site', null);
        let menu = _.get(site, 'data.config.main_menu', null);
        return (
            <footer className="footer">
                <div className="footer__container">
                    <Link className="footer__logo" href={withPrefix('/')}>
                        <Picture {...this.props} image={_.get(site, 'data.config.logo_light', null)} cssClass={'footer__logo-image'} alt={'Site logo'} />
                    </Link>
                    <ul className="footer__nav">
                        {_.map(menu, (item, item_idx) => (
                        <li key={item_idx} className="footer__nav-item">
                            <Link href={withPrefix(_.get(item, 'url', null))} {...((_.get(item, 'title', null) === _.get(page, 'frontmatter.title', null)) ? ({className: 'footer__nav-link footer__nav-link--active'}) : {className: 'footer__nav-link'})}>
                            {_.get(item, 'title', null)}
                            </Link>
                        </li>
                        ))}
                    </ul>
                    <div className="footer__legal-notice">{_.get(site, 'data.config.footer_text', null)}</div>
                </div>
            </footer>
        );
    }
}
