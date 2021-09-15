import Document, { Html, Head, Main, NextScript } from 'next/document';
import { Helmet } from 'react-helmet';
import ScriptTag from 'react-script-tag';
import { withPrefix } from '../utils';


class MyDocument extends Document {

    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        // see https://github.com/nfl/react-helmet#server-usage for more information
        // 'head' was occupied by 'renderPage().head', we cannot use it
        return { ...initialProps, helmet: Helmet.renderStatic() }
    }

    // should render on <html>
    get helmetHtmlAttrComponents() {
        return this.props.helmet.htmlAttributes.toComponent()
    }

    // should render on <body>
    get helmetBodyAttrComponents() {
        return this.props.helmet.bodyAttributes.toComponent()
    }

    // should render on <head>
    get helmetHeadComponents() {
        return Object.keys(this.props.helmet)
            .filter((el) => el !== 'htmlAttributes' && el !== 'bodyAttributes')
            .map((el) => this.props.helmet[el].toComponent())
    }

    render() {
        return (
            <Html {...this.helmetHtmlAttrComponents}>
                <Head>{this.helmetHeadComponents}</Head>
                <body {...this.helmetBodyAttrComponents}>
                    <Main />
                    <ScriptTag src={withPrefix('js/lib/modernizr.js')}/>
                    <ScriptTag src={withPrefix('js/main.js')}/>
                    <ScriptTag src={withPrefix('js/page_load.js')}/>
                    <ScriptTag src={withPrefix('js/page_unload.js')}/>
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
