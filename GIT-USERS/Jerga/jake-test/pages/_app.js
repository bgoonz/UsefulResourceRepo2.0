import App from "next/app";
import Head from "next/head";
import Nav from "../components/nav";

class ActivityApp extends App {
  static async getInitialProps(appContext) {
    const appProps = await App.getInitialProps(appContext);
    return { ...appProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <div>
        <Head>
          <title>Home</title>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Roboto+Slab:400,700|Material+Icons"
          />
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
          />
        </Head>
        <Nav />
        <div className="base-page">
          <Component {...pageProps} />
          <div id="modal" />
        </div>
        <style jsx>{``}</style>

        <style jsx global>{`
          html,
          body {
            height: 100%;
            width: 100%;
          }
          *,
          *:after,
          *:before {
            box-sizing: border-box;
          }

          body {
            font-family: "Roboto", "Helvetica", "Arial", sans-serif;
            font-size: 1rem;

            background-color: #00bcd4;
            min-height: 100vh;
            position: relative;
            margin: 0;
          }

          footer {
            position: absolute;
            bottom: 0;
            width: 100%;
          }

          button {
            background-color: #ffffff;
            color: #00bcd4;
            font-size: 1.1rem;
            font-weight: 500;
            cursor: pointer;
            border-radius: 4px;
            border: 2px solid #00bcd4;
            transition: 0.3s;
            text-transform: uppercase;
            margin-left: 20px;
          }

          button :hover {
            background-color: #00bcd4;
            border: 2px solid white;
            color: white;
          }

          button.active {
            background-color: #00bcd4;
            border: 2px solid white;
            color: white;
          }

          .top-space {
            margin-top: 80px;
          }

          .bottom-space {
            margin-bottom: 80px;
          }

          .dark-primary-color {
            background: #0097a7;
          }
          .default-primary-color {
            background: #00bcd4;
          }
          .light-primary-color {
            background: #b2ebf2;
          }
          .text-primary-color {
            color: #ffffff;
          }
          .accent-color {
            background: #ff5722;
          }
          .primary-text-color {
            color: #212121;
          }
          .secondary-text-color {
            color: #727272;
          }
          .divider-color {
            border-color: #b6b6b6;
          }

          h1 {
            font-size: 2rem;
            font-family: "Roboto", "Helvetica", "Arial", sans-serif;
            font-weight: 300;
            line-height: 1;
            letter-spacing: 0em;
            color: rgb(0, 0, 0, 0.8);
          }

          h2 {
            font-size: 1.5rem;
            font-family: "Roboto", "Helvetica", "Arial", sans-serif;
            font-weight: 400;
            line-height: 1;
            letter-spacing: 0em;
            color: rgb(0, 0, 0, 0.8);
          }

          .contain {
            width: 100%;
            margin-right: auto;
            margin-left: auto;
          }

          .react-select-container {
            margin: 20px 0 20px 20px;
          }

          .react-select-container:focus {
            outline: none;
          }

          .react-select__control {
            width: 465px;
            border: 0 solid #fff !important;
            border-radius: 0 !important;
            border-bottom: 2px solid #fff !important;
            background-color: #00bcd4 !important;
            color: #fff !important;
            font-size: 1.9em !important;
            font-family: "Roboto", "Helvetica", "Arial", sans-serif !important;
            font-weight: 300 !important;
            cursor: pointer !important;
          }

          .react-select__control--is-focused {
            box-shadow: none !important;
          }

          .react-select__placeholder,
          .react-select__single-value,
          .react-select__indicator {
            color: #fff !important;
          }

          .react-select__indicator-separator {
            background-color: #00bcd4 !important;
          }

          .react-select__menu {
            margin-top: 0 !important;
            border-radius: 0 !important;
          }

          .react-select__menu-list {
            max-height: 500px;
          }

          .react-select__option {
            font-size: 1.3rem !important;
            font-family: "Roboto", "Helvetica", "Arial", sans-serif;
            font-weight: 400;
            line-height: 1;
            -webkit-letter-spacing: 0em;
            -moz-letter-spacing: 0em;
            -ms-letter-spacing: 0em;
            letter-spacing: 0em;
            color: rgb(0, 0, 0, 0.8);
            padding: 8px;
            cursor: pointer !important;
          }

          .react-select__option--is-selected {
            background-color: #f8f8f8 !important;
            color: rgb(0, 0, 0, 0.8) !important;
          }

          @media (min-width: 576px) {
            .contain {
              max-width: 540px;
            }
          }

          @media (min-width: 768px) {
            .contain {
              max-width: 720px;
            }

            .grid-item {
              -ms-flex: 0 0 50%;
              flex: 0 0 50%;
              max-width: 50%;
            }
          }

          @media (min-width: 992px) {
            .contain {
              max-width: 960px;
            }

            .grid-item {
              -ms-flex: 0 0 33.333333%;
              flex: 0 0 33.333333%;
              max-width: 33.333333%;
              padding: 20px;
            }
          }

          @media (min-width: 1200px) {
            .contain {
              max-width: 1140px;
            }
          }

          .rowz {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-wrap: wrap;
            flex-wrap: wrap;
            margin-right: -15px;
            margin-left: -15px;
          }

          [hidden] {
            display: none !important;
          }
        `}</style>
      </div>
    );
  }
}

export default ActivityApp;
