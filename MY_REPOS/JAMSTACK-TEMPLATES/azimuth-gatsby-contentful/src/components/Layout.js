import React from 'react';
import { Helmet } from 'react-helmet';
import _ from 'lodash';
import { graphql } from 'gatsby';

import '../sass/main.scss';
import Header from './Header';
import Footer from './Footer';

export const query = graphql`
    fragment LayoutFragment on ContentfulConfig {
        title {
            title
        }
        palette
        ...HeaderFragment
        ...FooterFragment
    }
`;

export default class Body extends React.Component {
    constructor(props) {
        super(props);
        this.handleRouteChange = this.handleRouteChange.bind(this);
    }

    componentDidMount() {
        // Sticky header
        let offsetY = 0;
        let ticking = false;

        window.addEventListener('scroll', function (e) {
            offsetY = window.scrollY;
            if (!ticking) {
                window.requestAnimationFrame(function () {
                    handleHeader(offsetY);
                    ticking = false;
                });
                ticking = true;
            }
        });

        function handleHeader(scrollPos) {
            if (scrollPos > 0) {
                document.body.classList.add('has--scrolled');
            } else {
                document.body.classList.remove('has--scrolled');
            }
        }

        window.addEventListener('popstate', this.handleRouteChange);
    }

    componentWillUnmount() {
        window.removeEventListener('popstate', this.handleRouteChange);
    }

    handleRouteChange() {
        if (window.reframe) {
            // Responsive video embeds
            const videoEmbeds = ['iframe[src*="youtube.com"]', 'iframe[src*="vimeo.com"]'];
            window.reframe(videoEmbeds.join(','));
        }
    }

    render() {
        const page = _.get(this.props, 'page');
        const title =
            (_.has(page, 'title') ? _.get(page, 'title.title') + ' - ' : '') + _.get(this.props, 'config.title.title');
        return (
            <React.Fragment>
                <Helmet>
                    <title>{title}</title>
                    <meta charSet="utf-8" />
                    <meta name="viewport" content="width=device-width, initialScale=1.0" />
                    <meta name="google" content="notranslate" />
                    <link
                        href="https://fonts.googleapis.com/css?family=Nunito+Sans:400,400i,700,700i"
                        rel="stylesheet"
                    />
                </Helmet>
                <div id="page" className={'site palette-' + _.get(this.props, 'config.palette')}>
                    <Header {...this.props} />
                    <main id="content" className="site-content">
                        {this.props.children}
                    </main>
                    <Footer {...this.props} />
                </div>
            </React.Fragment>
        );
    }
}
