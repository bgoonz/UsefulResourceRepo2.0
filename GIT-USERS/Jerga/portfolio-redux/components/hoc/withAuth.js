import React from "react";
import { Router } from "../../routes";
import BaseLayout from "../BaseLayout.js";

const namespace = "https://portfel.com/";

// super Auth for main admin
export default (Component) =>
  class withAuth extends React.Component {
    static async getInitialProps(args) {
      const user = args.user;
      let authDenied = false;

      // Necessary to call getInitialProps of child component
      const props = Component.getInitialProps
        ? await Component.getInitialProps(args)
        : {};

      if (!user) {
        authDenied = true;
      } else if (user[namespace + "role"] !== "admin") {
        authDenied = true;
      }

      return { ...props, authDenied };
    }

    render() {
      const { authDenied } = this.props;

      if (authDenied) {
        return (
          <BaseLayout>
            <section className="blogCreate-page">
              <div className="container">
                <h1 className="portfolio-page-title">Access Denied</h1>
                <p>
                  {" "}
                  You need to be logged in or have access rights to access this
                  page{" "}
                </p>
              </div>
            </section>
          </BaseLayout>
        );
      } else {
        return <Component {...this.props} />;
      }
    }
  };
