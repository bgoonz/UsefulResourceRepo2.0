import BaseLayout from "../layout/BaseLayout";
import BasePage from "../layout/BasePage";

import { Component } from "react";

export default function (Component) {
  return class withAuth extends Component {
    static async getInitialProps(args) {
      const pageProps =
        (await Component.getInitialProps) &&
        (await Component.getInitialProps(args));

      return { ...pageProps };
    }

    renderProtectedPage() {
      const { isAuthenticated } = this.props.auth;

      if (isAuthenticated) return <Component {...this.props} />;

      return (
        <BaseLayout {...this.props.auth}>
          <BasePage>
            <h1>Please Login</h1>
          </BasePage>
        </BaseLayout>
      );
    }

    render() {
      return this.renderProtectedPage();
    }
  };
}
