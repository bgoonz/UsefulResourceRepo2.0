import Document, { Html, Head, Main, NextScript } from "next/document";
import ScriptTag from "react-script-tag";
import { withPrefix } from "../utils";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
          <ScriptTag src={withPrefix("assets/js/init.js")} />
          <ScriptTag src={withPrefix("assets/js/page-load.js")} />
          <ScriptTag src={withPrefix("assets/js/page-unload.js")} />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
