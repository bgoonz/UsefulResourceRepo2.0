import React from 'react';
import _ from 'lodash';

import { classNames, Link, withPrefix, htmlToReact } from '../utils';
import Action from './Action';
import ActionIcon from './ActionIcon';
import ActionLink from './ActionLink';

export default class Footer extends React.Component {
    renderNav(navLinks, navTitle) {
        return (
            <div className="site-footer__menu cell-12 cell-md my-3 my-md-4">
                {navTitle && <h2 className="h4 mb-3 mb-md-4">{navTitle}</h2>}
                <ul className="menu">
                    {_.map(navLinks, (action, index) => (
                        <li key={index} className="menu__item mb-1">
                            <Action action={action} />
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    render() {
        const config = _.get(this.props, 'config');
        const footer = _.get(config, 'footer');
        const logo = _.get(footer, 'logo');
        const logoAlt = _.get(footer, 'logo_alt', '');
        const hasPrimaryNav = _.get(footer, 'has_primary_nav');
        const primaryNavTitle = _.get(footer, 'primary_nav_title');
        const primaryNavLinks = _.get(footer, 'primary_nav_links');
        const hasSecondaryNav = _.get(footer, 'has_secondary_nav');
        const secondaryNavTitle = _.get(footer, 'secondary_nav_title');
        const secondaryNavLinks = _.get(footer, 'secondary_nav_links');
        const hasTertiaryNav = _.get(footer, 'has_tertiary_nav');
        const tertiaryNavTitle = _.get(footer, 'tertiary_nav_title');
        const tertiaryNavLinks = _.get(footer, 'tertiary_nav_links');
        const hasSocial = _.get(footer, 'has_social');
        const socialLinks = _.get(footer, 'social_links');
        const copyright = _.get(footer, 'content');
        const links = _.get(footer, 'links');

        return (
            <footer className="site-footer">

            
                {(logo || (hasPrimaryNav && !_.isEmpty(primaryNavLinks)) || (hasSecondaryNav && !_.isEmpty(secondaryNavLinks)) || (hasTertiaryNav && !_.isEmpty(tertiaryNavLinks))) && (
                    <div className="site-footer__nav py-5 py-md-6">
                        <div className="container">
                            <div
                                className={classNames('grid', {
                                    'justify-md-center': logo
                                })}
                            >
                                {logo && <Link className="site-footer__logo cell-12 cell-md-5 my-4" href={withPrefix('/')}><img src={withPrefix(logo)} alt={logoAlt} /></Link>}
                                {hasPrimaryNav && !_.isEmpty(primaryNavLinks) && this.renderNav(primaryNavLinks, primaryNavTitle)}
                                {hasSecondaryNav && !_.isEmpty(secondaryNavLinks) && this.renderNav(secondaryNavLinks, secondaryNavTitle)}
                                {hasTertiaryNav && !_.isEmpty(tertiaryNavLinks) && this.renderNav(tertiaryNavLinks, tertiaryNavTitle)}
                            </div>
                        </div>
                    </div>
                )}
                
                {(copyright || !_.isEmpty(links) || (hasSocial && !_.isEmpty(socialLinks))) && (
                    <div className="site-footer__info py-3 py-sm-4">
                        <div className="container">
                            <div className="grid items-center">
                                {(copyright || !_.isEmpty(links)) && (
                                    <div
                                        className={classNames('site-footer__copyright', 'cell-12', {
                                            'cell-sm': hasSocial && !_.isEmpty(socialLinks)
                                        })}
                                    >
                                        {copyright && <span>{htmlToReact(copyright)}</span>}
                                        {_.map(links, (action, index) => (
                                            <ActionLink key={index} action={action} />
                                        ))}
                                    </div>
                                )}
                                {hasSocial && !_.isEmpty(socialLinks) && (
                                    <div
                                        className={classNames('site-footer__social', 'cell-12', {
                                            'cell-sm-auto': copyright || !_.isEmpty(links)
                                        })}
                                    >
                                        {_.map(socialLinks, (action, index) => (
                                            <ActionIcon key={index} action={action} />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
                  {/* start of freefind search box html */}
      <table cellPadding={0} cellSpacing={0} border={0}>
        <tbody><tr>
            <td style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '7.5pt'}}>
              <center><table width="90%" cellPadding={0} cellSpacing={0} border={0} style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '7.5pt'}}>
                  <tbody><tr>
                      <td style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '7.5pt'}} align="left"><a href="https://search.freefind.com/siteindex.html?si=10862521">index</a></td>
                      <td style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '7.5pt'}} align="center"><a href="https://search.freefind.com/find.html?si=10862521&m=0&p=0">sitemap</a></td>
                      <td style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '7.5pt'}} align="right"><a href="https://search.freefind.com/find.html?si=10862521&pid=a">advanced</a></td>
                    </tr>
                  </tbody></table></center>
              <form style={{margin: '0px', marginTop: '4px'}} action="https://search.freefind.com/find.html" method="get" acceptCharset="utf-8" target="_self">
                <input type="hidden" name="si" defaultValue={10862521} />
                <input type="hidden" name="pid" defaultValue="r" />
                <input type="hidden" name="n" defaultValue={0} />
                <input type="hidden" name="_charset_" defaultValue />
                <input type="hidden" name="bcd" defaultValue="÷" />
                <input type="text" name="query" size={15} /> 
                <input type="submit" defaultValue="search" />
              </form>
            </td>
          </tr>
          <tr>
            <td style={{textAlign: 'center', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '7.5pt', paddingTop: '4px'}}>
              <a style={{textDecoration: 'none', color: 'gray'}} href="https://www.freefind.com" rel="nofollow"></a><a style={{textDecoration: 'none', color: 'gray'}} href="https://www.freefind.com" rel="nofollow"> 
                <span style={{color: '#606060'}}></span></a>
            </td>
          </tr>
        </tbody></table>
      {/* end of freefind search box html */}
            </footer>
        );
    }
}
