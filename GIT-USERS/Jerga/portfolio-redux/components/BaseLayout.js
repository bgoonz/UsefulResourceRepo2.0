import Head from "next/head";
import Header from "./common/Header";
import MyApp from "../pages/_app";

import "bootstrap/dist/css/bootstrap.css";
import "../styles/main.scss";

const BaseLayout = (props) => {
  const { className, children, canonical } = props;
  const headerType = props.headerType || "normal";
  const title = props.title || "Filip Jerga Personal Website and Portfolio";

  return (
    <div>
      <Head>
        <title>{title}</title>

        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta charSet="utf-8" />
        <meta
          name="keywords"
          content="Programming, Freelancing, Portfolio, Filip jerga"
        />
        <meta
          name="description"
          content="My name is Filip Jerga and I am an experienced software engineer and freelance developer. I have a Master's degree in Artificial Intelligence and several years of experience working on a wide range of technologies and projects from C++ development for ultrasound devices to modern mobile and web applications in React and Angular. Throughout my career, I have acquired advanced technical knowledge and the ability to explain programming topics clearly and in detail to a broad audience. I invite you to take my course, where I have put a lot of effort to explain web and software engineering concepts in a detailed, hands-on and understandable way."
        />
        <meta
          property="og:title"
          content="Filip Jerga - programmer, contractor, blogger"
        />
        <meta property="og:locale" content="en_EU" />
        <meta property="og:url" content="https://port-fel.herokuapp.com" />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content="Programmer portfolio, personal site by Filip Jerga, good blog and more. Java, web developer and mobile application developer. Blog about programming."
        />

        <link
          rel="icon"
          href="/static/images/favicon.ico"
          sizes="16x16 32x32"
          type="image/ico"
        />
        {canonical && (
          <link href="https://port-fel.herokuapp.com" rel="canonical" />
        )}
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.4.1/css/all.css"
          integrity="sha384-5sAR7xN1Nv6T6+dT2mhtzEpVJvfS3NScPQTrOxhwjIuvcA67KV2R5Jz6kr4abQsz"
          crossOrigin="anonymous"
        />
      </Head>

      <div className="layout-container">
        {headerType === "normal" && (
          <Header className="navbar mainNav navbar-expand-lg bg-secondary fixed-top text-uppercase" />
        )}
        {headerType === "landing" && (
          <Header className="port-navbar absolute" color="transparent" />
        )}
        {headerType === "none" && null}
        <main className={`cover ${className}`}>
          <div className="wrapper">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default BaseLayout;

// image <meta property="og:image" content="http://mateuszzbylut.com/img/Mateusz-Zbylut.png">
